import { useState } from 'react';
import ReRender from '@/components/re-render';
import './index.less';

export default (props) => {
  const [count, setCount] = useState(0);

  const onClick = (e) => {
    setCount((count) => count + 1);
  };

  return (
    <div className="memo-box pr">
      <ReRender />
      <h2>{props.title}</h2>
      <h3 className="">State: {count}</h3>
      <button onClick={onClick}>Update state</button>
      {props.children}
      {props.el}
    </div>
  );
};
