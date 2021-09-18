// https://github.com/umijs/umi-request
// import { extend } from 'umi-request';
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
  errorHandler,
  // 自定义端口规范
  errorConfig: {
    adaptor: (res) => {
      return {
        success: res.code == config.successCode,
        data: res.data,
        errorCode: res.code,
        errorMessage: res.msg,
      };
    },
  },
  middlewares: [
    // logger,
  ],
};
