import React, { useState, useEffect, useRef } from 'react';
import { sleep } from '@/utils'
import './index.less'

const componentData = {backgroundUrl: 'https://lmg.jj20.com/up/allimg/tp09/21042G4331941H-0-lp.jpg'}

// 跟踪 cmscommonweb 中刷新后渲染无效的问题
function useLayout() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})

  const fetchData = () => {
    console.log('fetchData')
    setIsLoading(true);
    sleep(2000, {componentDataUrl: 'xxx1'})
      .then(res => {
        setIsLoading(false);
        setData(res);
      })
      .catch(err => {
        setIsLoading(false);
        setData({});
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const loadData = () => {
    fetchData();
  }

  return {
    data: {
      bgData: data,
    },
    loadData,
    isLoading,
  }
}
function useComponent(data) {
  const { componentDataUrl } = data;
  const [dataSource, setDataSource] = useState(null)

  console.log('useComponent', componentDataUrl)
  useEffect(() => {
    console.log(dataSource)
    if (!componentDataUrl) return;
    console.log('getComponent', componentDataUrl)
    sleep(1000, {...componentData})
      .then(res => {
        setDataSource(res);
      })
      .catch(err => {
        setDataSource({});
      })
  }, [componentDataUrl])

  return {
    dataSource,
  }
}
function useBackground(data, dom) {
  const { dataSource } = useComponent(data)

  useEffect(() => {
    if (!dataSource) return;

    if (dom && dataSource?.backgroundUrl) {
      dom.style.backgroundImage = `url('${dataSource.backgroundUrl}')`
    }
  }, [dataSource, dom])
}

export default (props) => {
  const [data, setData] = useState({});
  const elRef = useRef(null)

  const {
    data: dataSource,
    isLoading,
    loadData,
  } = useLayout()

  const { bgData } = dataSource;

  useBackground(bgData, elRef.current)

  // useEffect(() => {
  //   loadPageData()
  // }, []);

  const loadPageData = () => {
    loadData()
  }

  if (isLoading) {
    return <h1>Loading</h1>
  }

  return (
    <div className="page-demo">
      <button onClick={loadData}>刷新</button>
      <br />
      <div className="bg-box" ref={elRef}></div>
    </div>
  );
};
