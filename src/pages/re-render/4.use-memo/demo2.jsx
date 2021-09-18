import { useState, useEffect, useMemo, memo } from 'react';
import ReRender from '@/components/re-render';
import StateBox from '@/pages/re-render/components/state-box';
import Child from './child';
import './index.less';

// 解决方案
//  1. Flattening props
//  2. useMemo
const MemoChild1 = memo((props) => {
  return (
    <Child title="memo(Child)" value={`showSidebar={showSidebar}`}>
      <br />
      <StateBox
        type="props"
        name="showSidebar"
        value={JSON.stringify(props.showSidebar)}
      />
    </Child>
  );
});
const UseMemoDemo1 = (props) => {
  const [user, setUser] = useState({ name: 'Alex', role: 'Admin' });

  const changeName = (e) => {
    setUser((val) => {
      const name = val.name === 'Alex' ? 'Tom' : 'Alex';
      return Object.assign({}, val, { name });
    });
  };
  const changeRole = (e) => {
    setUser((val) => {
      const role = val.role === 'Admin' ? 'Default' : 'Admin';
      return Object.assign({}, val, { role });
    });
  };

  // 1. Flattening props
  const showSidebar = user.role === 'Admin';
  const preContent = `const showSidebar = user.role === 'Admin'`;

  return (
    <div className="props-box pr">
      <ReRender />
      <StateBox name="user" value={JSON.stringify(user)} />

      <br />
      <p>{preContent}</p>
      <p>
        <button className="btn" onClick={changeName}>
          Update name
        </button>
        <button className="btn" onClick={changeRole}>
          Update role
        </button>
      </p>

      <MemoChild1 showSidebar={showSidebar} />
    </div>
  );
};

const MemoChild2 = memo((props) => {
  return (
    <Child title="memo(Child)" value={`options={options}`}>
      <br />
      <StateBox
        type="props"
        name="options"
        value={JSON.stringify(props.options)}
      />
    </Child>
  );
});
const UseMemoDemo2 = (props) => {
  const [user, setUser] = useState({ name: 'Alex', role: 'Admin' });

  const changeName = (e) => {
    setUser((val) => {
      const name = val.name === 'Alex' ? 'Tom' : 'Alex';
      return Object.assign({}, val, { name });
    });
  };
  const changeRole = (e) => {
    setUser((val) => {
      const role = val.role === 'Admin' ? 'Default' : 'Admin';
      return Object.assign({}, val, { role });
    });
  };

  // 2. useMemo
  // useMemo 只会在依赖项之一发生变化时重新计算记忆值。
  // 在每次渲染时，useMemo浅层比较列表 ( prevDependency === dependency)中的每个依赖项。
  // https://reactjs.org/docs/hooks-reference.html#usememo
  const options = useMemo(
    () => ({
      showSidebar: user.role === 'Admin',
    }),
    [user.role],
  ); // 注意这里
  const preContent = `const options = useMemo(() => ({showSidebar: user.role === 'Admin'}), [user.role])`;

  return (
    <div className="props-box pr">
      <ReRender />
      <StateBox name="user" value={JSON.stringify(user)} />

      <br />
      <p>{preContent}</p>
      <p>
        <button className="btn" onClick={changeName}>
          Update name
        </button>
        <button className="btn" onClick={changeRole}>
          Update role
        </button>
      </p>

      <MemoChild2 options={options} />
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
