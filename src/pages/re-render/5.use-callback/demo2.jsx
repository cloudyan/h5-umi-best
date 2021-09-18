import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import ReRender from '@/components/re-render';
import StateBox from '@/pages/re-render/components/state-box';
import Child from './child';
import './index.less';

// 解决方案
//  1. 使用 useCallback
// useCallback(fn, deps) 等价于 useMemo(() => fn, deps)。
// 区别是 useCallback 返回的是函数
// 想保留 handler 的引用
// https://reactjs.org/docs/hooks-reference.html#usecallback
const MemoChild = memo((props) => {
  return (
    <Child title="memo(Child)" value={props.value}>
      <br />
      <button class="btn" onClick={props.onClick}>
        Button
      </button>
    </Child>
  );
});
const UseMemoDemo1 = (props) => {
  const [count, setCount] = useState(0);

  // 每次 Parent 渲染时，handler都会使用指向新值的新引用重新声明
  const handler = useCallback((e) => {
    setCount(count + 1);
  }, []);
  // 注意这里 依赖列表，使用 [] 该handler值仅在第一次渲染时计算。
  // 由于闭包count，记忆化的函数也会引用 count 的旧值
  // 闭包-[MDN -Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

  const preContent = `const handler = useCallback((e) => { setCount(count + 1) }, [])`;
  return (
    <div className="props-box pr">
      <ReRender />
      <StateBox type="state" name="count" value={JSON.stringify(count)} />
      <br />
      <p>{preContent}</p>
      <MemoChild value="onClick={handler}" onClick={handler} />
    </div>
  );
};

const UseMemoDemo2 = (props) => {
  const [count, setCount] = useState(0);

  // 每次 Parent 渲染时，handler都会使用指向新值的新引用重新声明
  const handler = useCallback(
    (e) => {
      setCount(count + 1);
    },
    [count],
  ); // 这样导致失效

  const preContent = `const handler = useCallback((e) => { setCount(count + 1) }, [count])`;
  return (
    <div className="props-box pr">
      <ReRender />
      <StateBox type="state" name="count" value={JSON.stringify(count)} />
      <br />
      <p>{preContent}</p>
      <MemoChild value="onClick={handler}" onClick={handler} />
    </div>
  );
};

const UseMemoDemo3 = (props) => {
  const [count, setCount] = useState(0);

  // 每次 Parent 渲染时，handler都会使用指向新值的新引用重新声明
  const handler = useCallback((e) => {
    setCount((count) => count + 1);
  }, []);

  const preContent = `const handler = useCallback((e) => { setCount(count => count + 1) }, [])`;
  return (
    <div className="props-box pr">
      <ReRender />
      <StateBox type="state" name="count" value={JSON.stringify(count)} />
      <br />
      <p>{preContent}</p>
      <MemoChild value="onClick={handler}" onClick={handler} />
    </div>
  );
};

export default (props) => {
  return (
    <div className="page-demo">
      <UseMemoDemo1 />
      <br />
      <UseMemoDemo2 />
      <br />
      <UseMemoDemo3 />
    </div>
  );
};
