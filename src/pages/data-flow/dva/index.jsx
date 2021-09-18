import React, { FC, useState, useEffect } from 'react';
import { connect, ConnectProps, Dispatch } from 'umi';
import styles from './index.less';

const HeroPage = (props) => {
  const { dispatch, hero = {} } = props;
  const [userId, setUserId] = useState(105);
  const { data, error, loading = true } = hero;

  useEffect(() => {
    dispatch({
      type: 'hero/fetch',
      payload: { ename: userId },
    });
  }, [userId]);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div className="page-demo">
      <h2>demo by dva data</h2>
      <select
        onChange={(e) => setUserId(Number(e.target.value))}
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
export default connect((props) => props)(HeroPage);
