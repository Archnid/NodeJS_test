#!/bin/bash
# ============================================
# NexaTech 服务器初始化脚本
# 适用于 Ubuntu 22.04 / Debian 12
# 用法: sudo bash setup.sh
# ============================================

set -e

echo "=========================================="
echo "  NexaTech 服务器环境初始化"
echo "=========================================="

# ---------- 1. 系统更新 ----------
echo "[1/5] 更新系统软件包..."
apt update && apt upgrade -y

# ---------- 2. 安装 Node.js 20.x LTS ----------
echo "[2/5] 安装 Node.js 20.x LTS..."
if command -v node &> /dev/null; then
    echo "  Node.js 已安装: $(node -v)"
else
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    echo "  Node.js 安装完成: $(node -v)"
fi

# ---------- 3. 安装 PM2 进程管理器 ----------
echo "[3/5] 安装 PM2 进程管理器..."
if command -v pm2 &> /dev/null; then
    echo "  PM2 已安装: $(pm2 -v)"
else
    npm install -g pm2
    echo "  PM2 安装完成: $(pm2 -v)"
fi

# ---------- 4. 安装 Nginx ----------
echo "[4/5] 安装 Nginx..."
if command -v nginx &> /dev/null; then
    echo "  Nginx 已安装: $(nginx -v)"
else
    apt install -y nginx
    echo "  Nginx 安装完成: $(nginx -v)"
fi

# ---------- 5. 配置防火墙 ----------
echo "[5/5] 配置防火墙..."
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    echo "  防火墙规则已添加"
else
    echo "  未检测到 ufw，请手动在腾讯云控制台放行 80/443 端口"
fi

# ---------- 部署项目目录 ----------
PROJECT_DIR="/var/www/nexatech"
echo ""
echo "创建项目目录: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR"

# ---------- 写入 Nginx 配置 ----------
NGINX_CONF="/etc/nginx/sites-available/nexatech"
cat > "$NGINX_CONF" << 'NGINX'
server {
    listen 80;
    server_name _;  # 有域名后把 _ 替换为你的域名，如 nexatech.com

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        proxy_pass http://127.0.0.1:3000;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

# 启用配置
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/nexatech
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
echo "  Nginx 配置完成"

# ---------- 完成 ----------
echo ""
echo "=========================================="
echo "  服务器环境初始化完成！"
echo "=========================================="
echo ""
echo "接下来请："
echo "  1. 将项目文件上传到 $PROJECT_DIR"
echo "  2. cd $PROJECT_DIR && npm install --production"
echo "  3. pm2 start app.js --name nexatech"
echo "  4. pm2 save && pm2 startup"
echo ""
echo "或直接运行 deploy.sh 一键部署"
echo ""
