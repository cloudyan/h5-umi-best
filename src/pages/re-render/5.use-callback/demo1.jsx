import { useState, useEffect, useMemo, memo } from 'react';
import ReRender from '@/components/re-render';
import StateBox from '@/pages/re-render/components/state-box';
import Child from './child';
import './index.less';

// 存在问题
//  1. 匿名函数
//  2. 具名函数 handler
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

  const preContent = `onClick={(e) => setCount(count + 1)}`;
  return (
    <div className="props-box pr">
      <ReRender />
      <StateBox type="state" name="count" value={JSON.stringify(count)} />
      <br />
      <p>{preContent}</p>
      <MemoChild
        value="onClick={(e) => setCount(count + 1)}"
        onClick={(e) => setCount(count + 1)}
      />
    </div>
  );
};
const UseMemoDemo2 = (props) => {
  const [count, setCount] = useState(0);

  // 每次 Parent 渲染时，handler都会使用指向新值的新引用重新声明
  const handler = (e) => {
    setCount(count + 1);
  };
  const preContent = `const handler = (e) => { setCount(count + 1) }`;
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
    </div>
  );
};
