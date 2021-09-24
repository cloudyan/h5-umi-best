import { useState, useEffect, useRef, memo } from 'react';
import { debounce } from 'lodash';
import ReRender from '@/components/re-render';
import scroll from '@/utils/scroll';
import './index.less';

import { getList } from './common';

const pageInfoDefault = {
  pageNum: 1,
  loading: false,
  dataOver: false,
};
export default () => {
  const elRef = useRef(null);
  const pageInfoRef = useRef({ ...pageInfoDefault, pageSize: 5 });
  const [listData, setListData] = useState([]);
  const pageInfo = pageInfoRef.current;

  let isLoading = false;

  useEffect(() => {
    fetchData(true);
  }, []);

  function fetchData(init) {
    if (init) Object.assign(pageInfoRef.current, pageInfoDefault);
    let currentNum = pageInfo.pageNum;
    pageInfo.loading = true;
    getList({
      pageNum: currentNum,
      pageSize: pageInfo.pageSize,
      totalPage: 5, // 更改此项及 pageSize 可以模拟不足一屏的效果
    })
      .then((res) => {
        const { page, list } = res;
        if (page.totalPage <= currentNum) {
          pageInfo.dataOver = true;
        } else {
          pageInfo.pageNum += 1;
        }
        setListData((data) => [...data, ...list]);
        pageInfo.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const offset = 200;
    let scroller;
    const onScroll = () => {
      // console.log('onScroll', pageInfo.pageNum);
      if (pageInfo.loading || pageInfo.dataOver) return;
      if (!scroller) {
        scroller = scroll.getScrollEventTarget(elRef.current);
      }
      const visibleHeight = scroll.getVisibleHeight(scroller);
      if (!visibleHeight) return;
      const scrollTop = scroll.getScrollTop(scroller);
      // console.log(scrollTop);
      const targetBottom = scrollTop + visibleHeight;

      let reachBottom = false;
      if (elRef.current === scroller) {
        reachBottom =
          scroller.scrollHeight < scrollTop + visibleHeight + offset;
      } else {
        const elBottom =
          scroll.getElementTop(elRef.current) -
          scroll.getElementTop(scroller) +
          scroll.getVisibleHeight(elRef.current);
        reachBottom = elBottom - visibleHeight < offset;
      }

      console.log('reachBottom:', reachBottom);
      if (reachBottom) {
        fetchData();
      }
    };
    // TODO: bind?
    const bind = debounce(onScroll, 100);
    window.addEventListener('scroll', bind, true);
    return () => {
      window.removeEventListener('scroll', bind);
    };
  }, []);

  const listMap = listData.map((item, index) => {
    return (
      <div className="item pr" key={index}>
        <ReRender />
        {item.name}
      </div>
    );
  });

  return (
    <div className="page-list" ref={elRef}>
      {listMap}
      {pageInfo.dataOver ? (
        <p>没有更多数据了</p>
      ) : pageInfo.loading ? (
        <p>正在加载中...</p>
      ) : null}
    </div>
  );
};
