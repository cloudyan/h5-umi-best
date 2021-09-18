import { useState, useEffect, useMemo, memo } from 'react';
import ReRender from '@/components/re-render';
import StateBox from '@/pages/re-render/components/state-box';
import Child from './child';
import './index.less';

// 存在问题
const MemoChild = memo((props) => {
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
const UseMemoDemo1 = (props) => {
  const [user, setUser] = useState({ name: 'Alex', role: 'Admin' });

  const changeName = (e) => {
    setUser((val) => {
      return Object.assign({}, val, {
        name: val.name === 'Alex' ? 'Tom' : 'Alex',
      });
    });
  };
  const changeRole = (e) => {
    setUser((val) => {
      return Object.assign({}, val, {
        role: val.role === 'Admin' ? 'Default' : 'Admin',
      });
    });
  };

  const options = {
    showSidebar: user.role === 'Admin',
  };
  const preContent = `const options = {showSidebar: user.role === 'Admin'}`;

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

      <MemoChild options={options} />
    </div>
  );
};

export default (props) => {
  return (
    <div className="page-demo">
      <UseMemoDemo1 />
    </div>
  );
};
