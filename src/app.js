// 参考:
//  - https://github.com/umijs/umi-request
//  - https://umijs.org/zh-CN/plugins/plugin-request

import config from '@/config';
import errorHandler from '@/utils/error-handler';

const logger = async (ctx, next) => {
  console.log('before');
  await next();
  console.log(ctx);
  console.log('after');
};

// 使用app.ts配置RequestConfig 就不能使用extend来配置
// 不然 errorConfig.adaptor 不会起作用
export const request = {
  prefix: process.env.NODE_ENV === 'production' ? config.baseurl : '/api',
  credentials: 'include',
  // timeout: 3000, // 超时模拟
  // 后端返回格式 { success: boolean, data: any }, 如果不符合规范，则配置为 ''
  dataField: '',
  // 自定义端口规范
  errorConfig: {
    // ErrorShowType 0,1,2,4,9 错误处理类型
    errorPage: '/error/exception', // 9
    adaptor(res, ctx) {
      // 参见 plugin-request
      // 该配置只是用于错误处理，不会影响最终传递给页面的数据格式。
      console.log('adaptor:', res);
      return {
        // 业务异常约定，success 只要为 false，就会走 errorHandler 逻辑
        // 用于处理 响应为 200，但有自定义错误码的情况，比如非 0 code
        // 且经此处转到 errorHandler 的流程，此时 error.name = 'BizError'
        // 若无约定，不要设为 false
        success: true,
        // success: res.code === config.successCode,
        data: res.data,
        errorCode: res.code, // 下面这几个自定义 key 用于默认的 errorHandler 处理
        errorMessage: res.message,
        showType: 4,
      };
    },
  },
  errorHandler,
  middlewares: [
    // logger,
  ],
  requestInterceptors: [],
  responseInterceptors: [],
};
