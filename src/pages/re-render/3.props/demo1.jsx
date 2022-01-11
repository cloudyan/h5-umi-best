import { useState, useEffect, memo } from 'react';
import ReRender from '@/components/re-render';
import Child from './child';

// import Parent from './parent';
import './index.less';

// 子组件使用了 memo，父组件渲染时，子组件也重新渲染
// memo判断 props 是否改变的方式是通过浅层比较prevProp === nextProp。
const PropsDemo1 = (props) => {
  const [style, setStyle] = useState({ color: 'red' });
  const [name, setName] = useState('Cloud');

  let mark = 1;

  const onClick = (e) => {
    console.log(mark);
    if (mark === 1) {
      mark = 0;
    }
    console.log(mark);
    // 因为是引用数据类型
    setStyle({ color: 'red' });
  };

  return (
    <div className="props-box pr">
      <ReRender />
      <h2>Parent1</h2>
      <h3 className="">Current State: {JSON.stringify(style)}</h3>
      <button onClick={onClick}>Update Parent State</button>
      <Child
        style={style}
        value={JSON.stringify(style)}
        title="memo(Child)"
      ></Child>
    </div>
  );
};

const PropsDemo2 = (props) => {
  const [style, setStyle] = useState({ color: 'red' });
  const [name, setName] = useState('Cloud');

  const onClick = (e) => {
    // 因为是引用数据类型, 每次都是新的, 使用 memo 也没用
    setStyle({ color: 'red' });
  };

  return (
    <div className="props-box pr">
      <ReRender />
      <h2>Parent2</h2>
      <h3 className="">Current State: {JSON.stringify(style)}</h3>
      <button onClick={onClick}>Update Parent State</button>
      <Child name={name} value={`name="${name}"`} title="memo(Child)"></Child>
    </div>
  );
};

const styleObj = { color: 'red' };
const PropsDemo3 = (props) => {
  const [style, setStyle] = useState(styleObj);
  const [name, setName] = useState('Cloud');

  const onClick = (e) => {
    // 因为是引用数据类型
    setStyle(styleObj);
  };

  return (
    <div className="props-box pr">
      <ReRender />
      <h2>Parent3</h2>
      <h3 className="">Current State: {JSON.stringify(style)}</h3>
      <button onClick={onClick}>Update Parent State</button>
      <Child
        style={style}
        value={JSON.stringify(style)}
        title="memo(Child)"
      ></Child>
    </div>
  );
};

const PropsDemo4 = (props) => {
  const [style, setStyle] = useState(styleObj);
  const [name, setName] = useState('Cloud');

  return (
    <div className="props-box pr">
      <ReRender />
      <h2>Parent4</h2>
      <h3 className="">Current State: {JSON.stringify(style)}</h3>
      <button
        onClick={(e) => {
          console.log('click');
        }}
      >
        Update Parent State
      </button>
      <Child
        onClick={(e) => {
          console.log('Child click');
        }}
        value={`onClick={e => console.log('Child click')}`}
        title="memo(Child)"
      ></Child>
    </div>
  );
};

export default (props) => {
  return (
    <div className="page-demo">
      <PropsDemo1 />
      <br />
      <PropsDemo2 />
      <br />
      <PropsDemo3 />
      <br />
      <PropsDemo4 />
    </div>
  );
};
