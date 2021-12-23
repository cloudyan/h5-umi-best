import { defineConfig } from 'umi';
import { name as projectName } from './package.json';

const { NODE_ENV, UI_RUNTIME_ENV } = process.env;
const __DEV__ = NODE_ENV === 'development';

const openCdn = false; // ['sit', 'pre', 'prod'].includes(UI_RUNTIME_ENV);
const cdnDomain = openCdn ? `https://static.xxx.com/` : `/`;

export default defineConfig({
  proxy: {
    '/api/': {
      target: 'https://pvp.qq.com/',
      pathRewrite: { '^/api/': '' },
      changeOrigin: true,
    },
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/data-flow/dva', component: '@/pages/data-flow/dva/index' },
    {
      path: '/data-flow/hooks/demo1',
      component: '@/pages/data-flow/hooks/demo1',
    },
    {
      path: '/data-flow/hooks/demo2',
      component: '@/pages/data-flow/hooks/demo2',
    },
    {
      path: '/re-render/list/demo1',
      component: '@/pages/re-render/1.list/demo1',
    },
    {
      path: '/re-render/memo/demo1',
      component: '@/pages/re-render/2.memo/demo1',
    },
    {
      path: '/re-render/memo/demo2',
      component: '@/pages/re-render/2.memo/demo2',
    },
    {
      path: '/re-render/props/demo1',
      component: '@/pages/re-render/3.props/demo1',
    },
    {
      path: '/re-render/use-memo/demo1',
      component: '@/pages/re-render/4.use-memo/demo1',
    },
    {
      path: '/re-render/use-memo/demo2',
      component: '@/pages/re-render/4.use-memo/demo2',
    },
    {
      path: '/re-render/use-callback/demo1',
      component: '@/pages/re-render/5.use-callback/demo1',
    },
    {
      path: '/re-render/use-callback/demo2',
      component: '@/pages/re-render/5.use-callback/demo2',
    },
    {
      path: '/re-render/context/usage1',
      component: '@/pages/re-render/6.context/usage/demo1',
    },
    {
      path: '/re-render/context/usage2',
      component: '@/pages/re-render/6.context/usage/demo2',
    },
    {
      path: '/re-render/context/demo1',
      component: '@/pages/re-render/6.context/demo1',
    },
    {
      path: '/re-render/context/demo2',
      component: '@/pages/re-render/6.context/demo2',
    },
    { path: '/pull/pull-up-demo1', component: '@/pages/pull/pull-up-demo1' },
    { path: '/pull/pull-up-demo2', component: '@/pages/pull/pull-up-demo2' },
    {
      path: '/hooks/use-reducer/demo1',
      component: '@/pages/hooks/use-reducer/demo1',
    },
    {
      path: '/hooks/use-ref/demo1',
      component: '@/pages/hooks/use-ref/demo1',
    },
    {
      path: '/request/demo1',
      component: '@/pages/request/demo1',
    },
    {
      path: '/request/demo2',
      component: '@/pages/request/demo2',
    },
    { path: '/error/exception', component: '@/pages/error/exception' },
    { path: '/*', component: '@/pages/error/404' },
  ],

  base: __DEV__ ? '/' : `/${projectName}/`,
  // base: __DEV__ ? '/' : `/`,
  outputPath: __DEV__ ? 'dist/' : `dist/`,
  publicPath: __DEV__ ? `/` : `${cdnDomain}${projectName}/`,
  hash: true,
  webpack5: {},
  dynamicImport: {},
  // mfsu: {},
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  antd: false, // 这个引入 antd
  dva: {
    immer: true,
    hmr: false,
    skipModelValidate: true,
  },

  plugins: [],
  // oss: {
  //   cdn: 'aliyun',
  //   prefix: projectName,
  // },

  // sentry: {},

  chunks: ['vendors', 'umi', 'styles'],
  chainWebpack(config) {
    // 分包优化
    config.merge({
      optimization: {
        splitChunks: {
          // chunks: 'all',
          automaticNameDelimiter: '.',
          minSize: 20000,
          cacheGroups: {
            styles: {
              // chunks: 'async',
              name: 'styles',
              test: /\.(css|less)$/,
              minChunks: 1,
              minSize: 0,
              priority: 30,
            },
            vendors: {
              chunks: 'all',
              name: `vendors`,
              test: /[\\/]node_modules[\\/](@umijs\/babel-plugin-lock-core-js-3|history-with-query|react-is|react-dom|react-router|react-router-dom|react|react-helmet|whatwg-fetch|redux|react-redux|dva|connected-react-router|umi-request|dva-immer|dva-core|@umijs|scheduler|object-assign|react-side-effect|react-fast-compare|prop-types)[\\/]/,
              priority: 10,
            },
          },
        },
      },
    });

    // otf 字体，可通过umi webpack 查看已有webpack配置
    config.module
      .rule('fonts')
      .test(/\.otf$/)
      .use('file-loader')
      .loader('file-loader')
      .end();
  },
});
