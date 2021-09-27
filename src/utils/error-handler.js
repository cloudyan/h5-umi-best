const codeMap = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errTypes = {
  timeout: '网络超时',
  abort: '网络取消',
  cancel: '网络取消',
};

// 集中处理错误，响应总共分为以下类型
// http 响应成功
//      2xx 为 http 状态码成功     // 1(仅仅这种情况不会走到 errorHandler 里)
//      非2xx 为 http 状态码异常    // 2
// http 响应失败，超时或被取消中断等  // 3 // error,
// 代码执行逻辑错误，被 reject       // 4
const errorHandler = (error) => {
  console.log('errorHandler', JSON.stringify(error));
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMap[error.data.status]);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.type);
    console.log(error.message);
  }

  const { type = '' } = error;
  if (errTypes[type]) {
    // 当发生此类错误时，应该提供刷新/重试功能，考虑全屏或布局的情况
    error.data = {
      type: error.type,
      message: errTypes[type],
    };
  }

  // 如果错误类型为 3, error.data 为 undefined
  // TODO: 错误类型为 4 呢?
  throw error.data || {}; // 如果throw. 错误将继续抛出.

  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return {some: 'data'};
};

export default errorHandler;
