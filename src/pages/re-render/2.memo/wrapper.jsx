import { useState } from 'react';
import ReRender from '@/components/re-render';

// 高阶
const wrapper = (props, InnerComponent) => {
  return () => {
    const [count, setCount] = useState(0);

    const onClick = (e) => {
      setCount((count) => count + 1);
    };
    return (
      <div className="props-box pr">
        <ReRender />
        <h2>{props.title}</h2>
        <h3 className="">State: {count}</h3>
        <button onClick={onClick}>Update state</button>
        {InnerComponent ? <InnerComponent /> : null}
      </div>
    );
  };
};

export default wrapper;
