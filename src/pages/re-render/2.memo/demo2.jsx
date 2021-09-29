import MemoBox from '@/pages/re-render/components/memo-box';

export default () => {
  return (
    <div className="page-demo">
      <p>结构嵌套，但数据独立，相互不影响</p>
      <MemoBox title="App1">
        <MemoBox title="Component A">
          <MemoBox title="Component B">
            <MemoBox title="Component C"></MemoBox>
          </MemoBox>
        </MemoBox>
      </MemoBox>

      <br />

      <MemoBox
        title="App2"
        el={<MemoBox title="Component A"></MemoBox>}
      ></MemoBox>
    </div>
  );
};
