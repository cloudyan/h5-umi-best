import { useState, useEffect } from 'react';
import { sleep } from '@/utils';

const promiseWait = new Promise(() => {});

// flow 1
function flow1(code = 0) {
  Promise.reject({
    code,
    data: {},
  })
    .then((res) => {
      console.log('res', res);
    })
    .catch((err) => {
      console.log('err', err);
      // 此处有三个流程 走 then/catch or 什么流程都不走
      if (err.code === 0) {
        return err;
      }
      throw err; // 可控制是否走下一个 catch
      // return new Promise(function (resolve, reject) {})
    })
    .then((res) => {
      console.log('res', res);
    })
    .catch((err) => {
      console.log('err', err);
    });
}

// flow 2
function flow2(code = 0) {
  // Promise.resolve({data: 1})
  // promise.commonResolve.commonReject
  // promise.commonResolve.customResolve.customReject.commonReject
  Promise.resolve({
    code,
    message: '',
    data: {},
  })
    .then((res) => {
      res.message += 'commonResolve,';
      console.log('commonResolve', res);
      return res;
    })
    .then((res) => {
      res.message += 'customResolve,';
      console.log('customResolve', res);
      if (res.code === 0) {
        return res;
      }
      throw res;
    })
    .catch((res) => {
      res.message += 'customReject,';
      console.log('customReject', res);
      if (res.code === 1) {
        // code = 1 使用自定义错误，拦截掉公共错误处理，否则使用公共错误处理
        console.error('使用自定义错误,不使用公共错误处理', res);
        return promiseWait;
      } else if (res.code === 2) {
        console.error('使用自定义错误,且使用', res);
      }
      console.error('公共错误处理', res);
      throw res;
    })
    .then((res) => {
      res.message += 'customResolveAfter,';
      console.log('customResolveAfter', res);
    })
    .catch((res) => {
      res.message += 'commonReject,';
      console.log('commonReject', res);
    });
}

// flow 3
function flow3(code = 0) {}

const fnObj = {
  flow1,
  flow2,
  flow3,
};
export default (props) => {
  const [count, setCount] = useState(0);
  const changeFlow = (n) => (e) => {
    setCount((v) => {
      v = v + 1;
      fnObj[`flow${n}`](v % 3);
      return v;
    });
  };

  return (
    <div className="page-demo">
      <div className="content">
        <button className="btn" onClick={changeFlow(1)}>
          flow1
        </button>
        <button className="btn" onClick={changeFlow(2)}>
          flow2
        </button>
        <button className="btn" onClick={changeFlow(3)}>
          flow3
        </button>
      </div>
    </div>
  );
};
