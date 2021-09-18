export default {
  // 支持值为 Object 和 Array
  'GET /apimock/users': { users: [1, 2] },
  // GET 可忽略
  '/apimock/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /apimock/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
};
