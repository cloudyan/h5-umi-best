import { useState, useEffect } from 'react';
import { getHeroDetails } from '../service';

// https://ahooks.js.org/zh-CN/hooks/async
export default () => {
  const [userId, setUserId] = useState(105);
  const [data, setData] = useState({});

  let error = false;
  let loading = false;

  const fetchData = () => {
    getHeroDetails({
      ename: userId,
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
  }, [userId]);

  const changeUserId = (e) => {
    setUserId(Number(e.target.value.trim()));
  };

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div className="page-demo">
      <h2>demo by hooks data</h2>
      <select
        onChange={changeUserId}
        value={userId}
        style={{ marginBottom: 16, width: 120 }}
      >
        <option value="105">user 105</option>
        <option value="106">user 106</option>
        <option value="107">user 107</option>
      </select>
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        <h2>Name:</h2>
        {loading ? 'loading' : JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
};
