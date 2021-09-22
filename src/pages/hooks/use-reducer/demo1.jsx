import React, { useState, useEffect, useReducer } from 'react';

const Demo1 = (props) => {
  const [count, setCount] = useState(1);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => c + step);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [step]); // 改变 step，timer 需要被清除，实现不优雅

  const changeStep = (c) => (e) => {
    setStep((v) => v + c);
  };

  return (
    <div className="demo-box">
      <p>{count}</p>
      <h4>
        step: <b>{step}</b>
      </h4>
      <button className="btn" onClick={changeStep(-1)}>
        step -1
      </button>
      <button className="btn" onClick={changeStep(1)}>
        step +1
      </button>
    </div>
  );
};

// 可以使用 useReducer
const Demo2 = (props) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      return {
        ...state,
        count: state.count + state.step,
      };
    },
    {
      count: 1,
      step: 1,
    },
  );

  useEffect(() => {
    setInterval(() => {
      dispatch();
    }, 3000);
  }, []);

  return (
    <div className="demo-box">
      <p>{state.count}</p>
      <h4>
        step: <b>{state.step}</b>
      </h4>
    </div>
  );
};

export default (props) => {
  return (
    <div className="page-demo">
      <Demo1 />
      <br />
      <Demo2 />
      <br />
    </div>
  );
};
