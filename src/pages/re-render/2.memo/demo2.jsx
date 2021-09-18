import MemoBox from '@/pages/re-render/components/memo-box';

export default () => {
  return (
    <div className="page-demo">
      <p>结构嵌套，但数据独立，相互不影响</p>
      <DemoMemo title="App1">
        <DemoMemo title="Component A">
          <DemoMemo title="Component B">
            <DemoMemo title="Component C"></DemoMemo>
          </DemoMemo>
        </DemoMemo>
      </DemoMemo>

      <br />

      <DemoMemo
        title="App2"
        el={<DemoMemo title="Component A"></DemoMemo>}
      ></DemoMemo>
    </div>
  );
};
