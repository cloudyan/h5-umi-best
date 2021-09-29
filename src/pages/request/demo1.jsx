import { useState, useEffect } from 'react';
import { getDemoApi } from './service';

function getUrlParam(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const arr = window.location.search.substr(1).match(reg) || [];
  if (typeof arr[2] !== 'undefined') {
    return decodeURIComponent(arr[2]);
  }
}

// https://ahooks.js.org/zh-CN/hooks/async
export default (props) => {
  const [code, setCode] = useState(200);
  const [data, setData] = useState({});

  // const code =
  const error = false;
  const loading = false;

  const fetchData = () => {
    getDemoApi({
      code,
      // timeout: 5000, // 模拟超时, 还需要修改 app.js
    })
      .then((res) => {
        console.log(res);
        // let aa = res.data.aa.a; // 模拟 resolve 之后错误
        setData(res);
      })
      .catch((err) => {
        console.log('catch', err);
        setData(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeInput = (e) => {
    setCode(e.target.value.trim());
  };

  if (error) {
    return <div>failed to load</div>;
  }
  return (
    <div className="page-demo">
      <h2>demo by hooks data</h2>
      <p>
        <input value={code} onChange={changeInput} /> <b>code: {code}</b>
      </p>

      <br />

      <button className="btn" onClick={fetchData}>
        fetchData
      </button>
      <br />
      <br />

      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        <h2>Name:</h2>
        {loading ? 'loading' : JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
};
