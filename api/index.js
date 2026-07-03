const express = require('express');
const apiRouter = require('../routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 仅挂载 API 路由（页面由 Vercel 静态托管）
app.use('/api', apiRouter);

module.exports = app;
