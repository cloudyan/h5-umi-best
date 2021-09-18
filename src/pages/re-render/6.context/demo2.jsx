import React, { useState, useEffect, useMemo, memo, useContext } from 'react';
import ReRender from '@/components/re-render';
import StateBox from '@/pages/re-render/components/state-box';
import wrapper from './wrapper';
import Child from './child';
import './index.less';

const AppContext = React.createContext({
  name: 'Default',
  age: 0,
});
AppContext.displayName = 'AppContext';

const ComponentC = (props) => {
  const { name, age } = useContext(AppContext);
  return (
    <div className="props-box pr">
      <ReRender />
      <h2>ComponentC</h2>
      <StateBox type="context">
        <i>name:</i>
        <b>"{name}"</b>
        <i>age:</i>
        <b>{age}</b>
      </StateBox>
    </div>
  );
};
const ComponentB = wrapper({ title: 'ComponentB' }, ComponentC);
const ComponentA = memo(wrapper({ title: 'memo(ComponentA)' }, ComponentB));

const ContextDemo3 = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Cloud');
  const [age, setAge] = useState(18);

  const changeCount = (e) => {
    setCount((v) => v + 1);
  };
  const changeName = (e) => {
    setName((v) => (v === 'Alex' ? 'Cloud' : 'Alex'));
  };
  const changeAge = (e) => {
    setAge((v) => (v === 18 ? 20 : 18));
  };

  const text = { name, age };
  const preContent = `const text={name, age}`;
  return (
    <div className="props-box pr">
      <ReRender />
      <h2>App1</h2>
      <StateBox type="state">
        <i>count:</i>
        <b>{count}</b>
        <i>name:</i>
        <b>"{name}"</b>
        <i>age:</i>
        <b>{age}</b>
      </StateBox>
      <br />
      {preContent}
      <br />
      <br />
      <button className="btn" onClick={changeCount}>
        Update count
      </button>
      <button className="btn" onClick={changeName}>
        Update name
      </button>
      <button className="btn" onClick={changeAge}>
        Update age
      </button>
      <br />
      <AppContext.Provider value={text}>
        <br />
        <p>{`AppContext.Provider props: value = {text}`}</p>
        <ComponentA />
        <br />
      </AppContext.Provider>
    </div>
  );
};

const ContextDemo4 = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Cloud');
  const [age, setAge] = useState(18);

  const changeCount = (e) => {
    setCount((v) => v + 1);
  };
  const changeName = (e) => {
    setName((v) => (v === 'Alex' ? 'Cloud' : 'Alex'));
  };
  const changeAge = (e) => {
    setAge((v) => (v === 18 ? 20 : 18));
  };

  const text = useMemo(() => ({ name, age }), [name, age]);
  const preContent = `const text = useMemo(() => ({name, age}), [name, age])`;
  return (
    <div className="props-box pr">
      <ReRender />
      <h2>App4</h2>
      <StateBox type="state">
        <i>count:</i>
        <b>{count}</b>
        <i>name:</i>
        <b>"{name}"</b>
        <i>age:</i>
        <b>{age}</b>
      </StateBox>
      <br />
      {preContent}
      <br />
      <br />
      <button className="btn" onClick={changeCount}>
        Update count
      </button>
      <button className="btn" onClick={changeName}>
        Update name
      </button>
      <button className="btn" onClick={changeAge}>
        Update age
      </button>
      <br />
      <AppContext.Provider value={text}>
        <br />
        <p>{`AppContext.Provider props: value = {text}`}</p>
        <ComponentA />
        <br />
      </AppContext.Provider>
    </div>
  );
};

export default (props) => {
  return (
    <div className="page-demo">
      <ContextDemo3 />
      <br />
      <ContextDemo4 />
    </div>
  );
};
