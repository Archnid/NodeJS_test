#!/bin/bash
# ============================================
# NexaTech 一键部署/更新脚本
# 用法: sudo bash deploy.sh
# ============================================

set -e

PROJECT_DIR="/var/www/nexatech"
SOURCE_DIR="${1:-.}"  # 默认当前目录，可传入源码路径

echo "=========================================="
echo "  NexaTech 项目部署"
echo "=========================================="

# 创建项目目录
mkdir -p "$PROJECT_DIR"

# 复制项目文件
echo "[1/3] 复制项目文件..."
cp -r "$SOURCE_DIR"/app.js "$PROJECT_DIR/"
cp -r "$SOURCE_DIR"/package.json "$PROJECT_DIR/"
cp -r "$SOURCE_DIR"/routes "$PROJECT_DIR/"
cp -r "$SOURCE_DIR"/views "$PROJECT_DIR/"
cp -r "$SOURCE_DIR"/public "$PROJECT_DIR/"

# 安装依赖
echo "[2/3] 安装生产依赖..."
cd "$PROJECT_DIR"
npm install --production

# 启动/重启应用
echo "[3/3] 启动应用..."
if pm2 describe nexatech > /dev/null 2>&1; then
    pm2 restart nexatech
    echo "  应用已重启"
else
    pm2 start app.js --name nexatech
    echo "  应用已启动"
fi

# 设置开机自启
pm2 save
pm2 startup 2>/dev/null || true

echo ""
echo "=========================================="
echo "  部署完成！"
echo "=========================================="
echo ""
echo "  访问地址: http://你的服务器IP"
echo "  PM2 状态: pm2 status"
echo "  查看日志: pm2 logs nexatech"
echo ""
