import React, { useState, useEffect, useMemo, memo, useContext } from 'react';
import ReRender from '@/components/re-render';
import StateBox from '@/pages/re-render/components/state-box';
import wrapper from './wrapper';
import Child from './child';
import './index.less';

// Context
// 每当 Provider 的 value 属性发生变化时，所有作为 Provider 后代的消费者都会重新渲染
// https://reactjs.org/docs/context.html#contextprovider
// 要停止这种递归重新渲染，可以使用 memo

const AppContext = React.createContext(0);
AppContext.displayName = 'AppContext';

const ComponentC = (props) => {
  const count = useContext(AppContext);
  return (
    <div className="props-box pr">
      <ReRender />
      <h2>ComponentC</h2>
      <StateBox type="context" name="count" value={JSON.stringify(count)} />
    </div>
  );
};
const ComponentB = wrapper({ title: 'ComponentB' }, ComponentC);
const ComponentA = wrapper({ title: 'ComponentA' }, ComponentB);
// const App1 = wrapper({title: 'App1'}, ComponentA);

// 存在问题
//

const ContextDemo1 = (props) => {
  const [count, setCount] = useState(0);

  // const preContent = `onClick={(e) => setCount(count + 1)}`;
  const onClick = (e) => {
    setCount((count) => count + 1);
  };
  return (
    <div className="props-box pr">
      <ReRender />
      <h2>App1</h2>
      <StateBox type="state" name="count" value={JSON.stringify(count)} />
      <br />
      <button onClick={onClick}>Update count</button>
      <ComponentA />
    </div>
  );
};

const ComponentC1 = (props) => {
  const count = useContext(AppContext);
  return (
    <div className="props-box pr">
      <ReRender />
      <h2>ComponentC1</h2>
      <StateBox type="context" name="count" value={JSON.stringify(count)} />
    </div>
  );
};
const ComponentB1 = wrapper({ title: 'ComponentB1' }, ComponentC1);
const ComponentA1 = memo(wrapper({ title: 'memo(ComponentA1)' }, ComponentB1));

const ContextDemo2 = (props) => {
  const [count, setCount] = useState(0);

  // const preContent = `onClick={(e) => setCount(count + 1)}`;
  const onClick = (e) => {
    setCount((count) => count + 1);
  };
  return (
    <div className="props-box pr">
      <ReRender />
      <h2>App2</h2>
      <StateBox type="state" name="count" value={JSON.stringify(count)} />
      <br />
      <button onClick={onClick}>Update count</button>
      <br />
      <AppContext.Provider value={count}>
        <br />
        <p>{`AppContext.Provider props: value = {count}`}</p>
        <ComponentA1 />
        <br />
      </AppContext.Provider>
    </div>
  );
};

export default (props) => {
  return (
    <div className="page-demo">
      <ContextDemo1 />
      <br />
      <ContextDemo2 />
    </div>
  );
};
