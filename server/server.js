const http = require('http');
const qs = require('querystring');

// 协议名必填, 如果同时存在 http 和 https 就写两条
const allowOrigin = ['http://localhost:8000', 'http://127.0.0.1:8000'];

// 'Content-Type': 'application/x-www-form-urlencoded',
// 'Content-Type': 'application/json',

const PORT = 8888;
http
  .createServer((req, res) => {
    const {
      method,
      headers: { origin },
    } = req;
    if (allowOrigin.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      const methods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
      res.setHeader('Access-Control-Allow-Methods', methods);
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      );
      res.setHeader('Access-Control-Allow-Credentials', true);
    }
    // res.setHeader('Access-Control-Allow-Origin', '*');

    if (method === 'OPTIONS') {
      res.setHeader('Content-Length', '0');
      // 可以配置缓存 OPTIONS 请求
      // res.setHeader('Access-Control-Max-Age', '100');
      res.statusCode = 204;
      res.end('');
    } else {
      const search = req.url.split('?')[1] || '';
      const params = qs.parse(search) || {};
      let status = 200;
      let code = 0;
      let message = '成功';
      if (params.timeout) {
        console.log('模拟请求超时');
        return;
      }
      status = Number(params.code);
      console.log(status);
      if (Number.isInteger(status)) {
        if (status.toString().length === 3) {
          res.statusCode = status;
          if (!((status >= 200 && status <= 299) || status == 304)) {
            code = 1;
            message = '网络请求错误';
          }
        } else {
          code = status || 0;
        }
        if (code != 0) {
          message = '业务逻辑发生错误';
        }
      } else {
        code = 2;
        message = '请求参数 code 错误，请输入正整数';
      }
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      const data = JSON.stringify({
        data: {
          message: '数据',
        },
        code,
        message,
      });
      console.log(JSON.stringify(data));
      res.end(data);
    }
  })
  .listen(PORT, () => {
    console.log('服务启动成功, 正在监听: ', PORT);

    // node 日志，数字为黄色，字符串为正常色
    console.log(200, '200');
  });
