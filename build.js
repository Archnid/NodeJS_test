/**
 * 构建脚本：将 EJS 模板预渲染为静态 HTML
 * 在 Vercel 部署时自动执行（npm run build）
 * 本地开发时不需要运行此脚本
 */
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'views', 'index.ejs');
const outputPath = path.join(__dirname, 'public', 'index.html');

const template = fs.readFileSync(templatePath, 'utf-8');
const html = ejs.render(template, { title: 'NexaTech - 驱动未来科技' });

fs.writeFileSync(outputPath, html, 'utf-8');
console.log('Build complete: public/index.html');
