import { useState, useEffect } from 'react';
import { getDemoApi } from './service';

function getUrlParam(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const arr = location.search.substr(1).match(reg) || [];
  return typeof arr[2] === 'undefined' ? void 0 : decodeURIComponent(arr[2]);
}

// https://ahooks.js.org/zh-CN/hooks/async
export default (props) => {
  const [code, setCode] = useState(200);
  const [data, setData] = useState({});

  // const code =
  let error = false;
  let loading = false;

  const fetchData = () => {
    getDemoApi({
      code,
      // timeout: 5000, 模拟超时
    })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
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
