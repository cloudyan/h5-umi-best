import { useState, useEffect, useRef, memo } from 'react';
import { useLockFn, usePersistFn } from 'ahooks';
import { debounce } from 'lodash';
import {
  getScrollParent,
  NativeProps,
  withNativeProps,
  withDefaultProps,
} from '@/utils';

// source: https://github.com/ant-design/ant-design-mobile/tree/master/src/components/infinite-scroll
const classPrefix = `adm-infinite-scroll`;

function isWindow(element) {
  return element === window;
}

const InfiniteScrollContent = ({ hasMore }) => {
  return (
    <>
      {hasMore ? (
        <>
          <span>加载中</span>
        </>
      ) : (
        <span>没有更多了</span>
      )}
    </>
  );
};

export const InfiniteScroll = withDefaultProps({
  threshold: 250,
})((props) => {
  // 异步函数增加竞态锁，防止并发执行
  const doLoadMore = useLockFn(async () => {
    console.log('doLoadMore');
    await props.loadMore();
  });

  const elementRef = useRef(null);

  const check = usePersistFn(() => {
    if (!props.hasMore) return;
    const element = elementRef.current;
    if (!element) return;
    const parent = getScrollParent(element);
    if (!parent) return;
    const elementTop = element.getBoundingClientRect().top;
    const current = isWindow(parent)
      ? window.innerHeight
      : parent.getBoundingClientRect().bottom;
    const reachBottom = current >= elementTop - props.threshold;
    console.log('reachBottom', reachBottom);
    if (reachBottom) {
      doLoadMore();
    }
  });

  // 确保在内容不足时会自动触发加载事件
  useEffect(() => {
    check();
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const parent = getScrollParent(element);
    if (!parent) return;
    function onScroll() {
      check();
    }
    parent.addEventListener('scroll', onScroll);
    return () => {
      parent.removeEventListener('scroll', onScroll);
    };
  }, []);

  return withNativeProps(
    props,
    <div className={classPrefix} ref={elementRef}>
      {props.children && props.children}
      {!props.children && <InfiniteScrollContent hasMore={props.hasMore} />}
    </div>,
  );
});
