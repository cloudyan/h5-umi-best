import { useState, useEffect, useRef, memo } from 'react';
import { debounce } from 'lodash';
import ReRender from '@/components/re-render';
import InfiniteScroll from '@/components/infinite-scroll';
import { sleep } from '@/utils';
import { getList } from './common';
import './index.less';

let pageNum = 1;
async function fetchData() {
  try {
    const res = await getList({
      pageNum,
      pageSize: 5,
      totalPage: 5,
    });
    pageNum++;
    return res;
  } catch (err) {}
}

export default (props) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    const res = await fetchData();
    const { page, list } = res;
    console.log(res);
    setData((val) => [...val, ...list]);
    // setHasMore(list.length > 0)
    setHasMore(page.totalPage > page.pageNum);
  }

  const itemsMap = data.map((item, index) => (
    <div className="item pr" key={index}>
      <ReRender />
      {item.name}
    </div>
  ));

  return (
    <>
      <div className="page-list">{itemsMap}</div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  );
};
