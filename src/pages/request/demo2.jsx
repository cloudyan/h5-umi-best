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

const resolve = (code) => {
  return Promise.resolve({
    code,
    message: '',
    data: {},
  });
};
const commonResolve = (res) => {
  res.message += 'commonResolve,';
  console.log('commonResolve', res);
  return res;
};
const customResolve = (res) => {
  res.message += 'customResolve,';
  console.log('customResolve', res);
  if (res.code === 0) {
    return res;
  }
  throw res;
};
const customReject = (res) => {
  res.message += 'customReject,';
  console.log('customReject', res);
  if (res.code === 1) {
    // code = 1 使用自定义错误，拦截掉公共错误处理，否则使用公共错误处理
    console.error('使用自定义错误,不使用公共错误处理', res);
    return promiseWait;
  }
  if (res.code === 2) {
    console.error('使用自定义错误,且使用', res);
  }
  console.error('公共错误处理', res);
  return Promise.reject(res);
};
const customResolveAfter = (res) => {
  res.message += 'customResolveAfter,';
  console.log('customResolveAfter', res);
};
const commonReject = (res) => {
  res.message += 'commonReject,';
  console.log('commonReject', res);
};

// flow 2
// Promise.resolve({data: 1})
// Promise.commonResolve.commonReject
// Promise.commonResolve.customResolve.customReject.customResolveAfter.commonReject
function flow2(code = 0) {
  const request = (...rest) => {
    return resolve(code).then(commonResolve);
  };
  request()
    .then(customResolve)
    .catch(customReject)
    .then(customResolveAfter)
    .catch(commonReject);
}

// flow 3
// p1 = Promise.commonResolve
// p2 = p1.customResolve.customReject
// p3 = p2.customResolveAfter.commonReject
function flow3(code = 0) {
  const request = function (...rest) {
    const r = resolve(code).then(commonResolve);

    // for (let fn of rest) {
    //   if (typeof fn === 'function') {
    //     r = r.then(fn)
    //   }
    // }
    return r
      .then(rest[0])
      .catch(rest[1])
      .then(customResolveAfter)
      .catch(commonReject);
  };

  request(customResolve, customReject);
}

// flow 4
// request = xxx
// request.then().catch()
function flow4(code = 0) {
  const request = (params) => {
    return {
      _task: [],
      then(fn) {
        this._task.push({
          key: 'then',
          task: fn,
        });
        return this;
      },
      catch(fn) {
        this._task.push({
          key: 'catch',
          task: fn,
        });
        return this;
      },
      run() {
        let r = resolve(params).then(commonResolve);

        for (const item of this._task) {
          if (typeof item.task === 'function') {
            r = r[item.key](item.task);
          }
        }
        return r.then(customResolveAfter).catch(commonReject);
      },
    };
  };

  // usage:
  request(code).then(customResolve).catch(customReject).run();
}

const fnObj = {
  flow1,
  flow2,
  flow3,
  flow4,
};
export default (props) => {
  // const [count, setCount] = useState(0);
  let count = 0;
  const changeFlow = (n) => (e) => {
    count += 1;
    fnObj[`flow${n}`](count % 3);
    // setCount(() => {
    // });
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
        <button className="btn" onClick={changeFlow(4)}>
          flow4
        </button>
      </div>
    </div>
  );
};
