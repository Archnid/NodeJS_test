const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- View Engine ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---------- Page Routes ----------
app.get('/', (req, res) => {
  res.render('index', { title: 'NexaTech - 驱动未来科技' });
});

// ---------- API Routes ----------
app.use('/api', apiRouter);

// ---------- Start Server (本地运行) ----------
// 当通过 node app.js 直接运行时启动服务器；被 Vercel 导入时不启动
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT);
  });
}

module.exports = app;
