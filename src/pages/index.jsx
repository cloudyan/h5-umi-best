import React from 'react';
import './index.less';

export default function IndexPage() {
  return (
    <>
      <div className="page-index">
        <div className="myfont">这个是数字 123455</div>
        <h1 className="title">Page index</h1>
        <h3>数据流方案</h3>
        <div className="content flex">
          <a className="btn" href="/data-flow/dva">
            <button>dva demo</button>
          </a>
          <a className="btn" href="/data-flow/hooks">
            <button>hooks demo</button>
          </a>
        </div>
        <h3>重新渲染机制</h3>
        <div className="content">
          <h4>1.list</h4>
          <div className="flex">
            <a className="btn" href="/re-render/list/demo1">
              <button>list demo1</button>
            </a>
          </div>
          <h4>2.memo</h4>
          <div className="flex">
            <a className="btn" href="/re-render/memo/demo1">
              <button>memo demo1</button>
            </a>
            <a className="btn" href="/re-render/memo/demo2">
              <button>memo demo2</button>
            </a>
          </div>
          <h4>3.props</h4>
          <div className="flex">
            <a className="btn" href="/re-render/props/demo1">
              <button>props demo1</button>
            </a>
          </div>
          <h4>4.useMemo</h4>
          <div className="flex">
            <a className="btn" href="/re-render/use-memo/demo1">
              <button>useMemo demo1</button>
            </a>
            <a className="btn" href="/re-render/use-memo/demo2">
              <button>useMemo demo2</button>
            </a>
          </div>
          <h4>5.useCallback</h4>
          <div className="flex">
            <a className="btn" href="/re-render/use-callback/demo1">
              <button>useCallback demo1</button>
            </a>
            <a className="btn" href="/re-render/use-callback/demo2">
              <button>useCallback demo2</button>
            </a>
          </div>
          <h4>6.context</h4>
          <div className="flex">
            <a className="btn" href="/re-render/context/usage1">
              <button>context usage1</button>
            </a>
            <a className="btn" href="/re-render/context/usage2">
              <button>context usage2</button>
            </a>
          </div>
          <div className="flex">
            <a className="btn" href="/re-render/context/demo1">
              <button>context demo1</button>
            </a>
            <a className="btn" href="/re-render/context/demo2">
              <button>context demo2</button>
            </a>
          </div>
        </div>
        <h3>滚动加载</h3>
        <div className="content flex">
          <a className="btn" href="/pull/pull-up-demo1">
            <button>pull-up demo1</button>
          </a>
          <a className="btn" href="/pull/pull-up-demo2">
            <button>pull-up demo2</button>
          </a>
        </div>
        <h3>hooks</h3>
        <div className="content flex">
          <a className="btn" href="/hooks/use-reducer/demo1">
            <button>useReducer demo1</button>
          </a>
        </div>
        <h3>request</h3>
        <div className="content flex">
          <a className="btn" href="/request/demo1">
            <button>request demo1</button>
          </a>
        </div>
      </div>
    </>
  );
}
