const express = require('express');
const router = express.Router();

// ---------- 数据模拟 ----------
const features = [
  {
    id: 1,
    icon: '🚀',
    title: '高性能架构',
    desc: '基于云原生微服务架构，支持弹性扩展，轻松应对百万级并发。'
  },
  {
    id: 2,
    icon: '🔒',
    title: '安全可信',
    desc: '端到端数据加密，通过 ISO 27001 认证，全方位保障您的数据安全。'
  },
  {
    id: 3,
    icon: '🤖',
    title: 'AI 驱动',
    desc: '深度集成大语言模型与机器学习能力，让业务决策更智能、更高效。'
  },
  {
    id: 4,
    icon: '📊',
    title: '数据洞察',
    desc: '实时数据分析与可视化平台，帮助您从海量数据中挖掘商业价值。'
  },
  {
    id: 5,
    icon: '🌐',
    title: '全球部署',
    desc: '覆盖全球 30+ 数据中心，智能 CDN 加速，为用户提供极致体验。'
  },
  {
    id: 6,
    icon: '🔗',
    title: '开放生态',
    desc: '提供丰富的 API 与 SDK，无缝对接主流平台，快速构建业务生态。'
  }
];

const stats = [
  { label: '企业客户', value: '2,000+' },
  { label: '日活用户', value: '500 万' },
  { label: '全球节点', value: '30+' },
  { label: '服务可用性', value: '99.99%' }
];

const team = [
  { name: '张明远', role: '创始人 & CEO', avatar: '👨‍💼', bio: '前 Google 高级工程师，15 年技术管理经验。' },
  { name: '李思涵', role: 'CTO', avatar: '👩‍💻', bio: '分布式系统专家，主导多个亿级流量系统设计。' },
  { name: '王晨曦', role: '设计总监', avatar: '🎨', bio: '曾任 Apple 设计团队成员，专注用户体验设计。' },
  { name: '赵宇航', role: '产品副总裁', avatar: '📱', bio: '连续创业者，深谙 SaaS 产品增长策略。' }
];

// ---------- API 路由 ----------

// 获取所有特性
router.get('/features', (req, res) => {
  res.json({ success: true, data: features });
});

// 获取统计数据
router.get('/stats', (req, res) => {
  res.json({ success: true, data: stats });
});

// 获取团队成员
router.get('/team', (req, res) => {
  res.json({ success: true, data: team });
});

// 提交联系表单
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: '请填写所有必填字段' });
  }
  // 模拟保存
  res.json({
    success: true,
    message: '感谢您的留言，我们会尽快与您联系！'
  });
});

module.exports = router;
