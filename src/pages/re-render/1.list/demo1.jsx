import React, { useState, memo, useCallback } from 'react';
import ReRender from '@/components/re-render';
import './list.less';

// 如何优化列表中的重新渲染
// https://alexsidorenko.com/blog/react-list-rerender/
const Item = memo(({ id, value, onChange }) => {
  // 这个是否匿名函数的区别是？
  const change = (e) => {
    onChange(id, e.target.value.trim());
  };
  return (
    <div className="item pr">
      <ReRender right />
      <h4>Item</h4>
      <input onChange={change} value={value} />
    </div>
  );
});

const Parent1 = () => {
  const [items, setItems] = useState([
    { value: '' },
    { value: '' },
    { value: '' },
  ]);

  const onChange = (id, value) => {
    const temp = items.map((item, index) => {
      return index !== id ? item : { value };
    });
    return setItems(temp);
  };

  const itemsMap = items.map((item, index) => {
    return (
      <Item
        key={index}
        id={index}
        value={item.value}
        // 这里如果使用匿名函数，在每次渲染时总会得到一个新的引用
        onChange={onChange}
      ></Item>
    );
  });

  return (
    <div className="page-re-render-list">
      <div className="box">
        <h2>Parent1</h2>
        <div>
          <p>Holds state and passes it to items:</p>
          <strong>{JSON.stringify(items)}</strong>
        </div>
        <div className="list">{itemsMap}</div>
      </div>
    </div>
  );
};

const Parent2 = () => {
  const [items, setItems] = useState([
    { value: '' },
    { value: '' },
    { value: '' },
  ]);

  // 此处每次items更新时，都会useCallback返回一个新的函数引用
  // const onChange = useCallback((id, value) => {
  //   const temp = items.map((item, index) => {
  //     return index !== id ? item : { value: value }
  //   })
  //   setItems(temp)
  // }, [items])

  const onChange = useCallback((id, value) => {
    setItems((prevItems) =>
      prevItems.map((item, index) => {
        return index !== id ? item : { value: value };
      }),
    );
  }, []); // No dependencies

  const itemsMap = items.map((item, index) => {
    return (
      <Item
        key={index}
        id={index}
        value={item.value}
        onChange={onChange}
      ></Item>
    );
  });

  return (
    <div className="page-re-render-list">
      <h2>Parent</h2>
      <div>
        <p>Holds state and passes it to items:</p>
        <strong>{JSON.stringify(items)}</strong>
      </div>
      <div className="list">{itemsMap}</div>
    </div>
  );
};

export default (props) => {
  return (
    <div className="page-demo page-re-render-list">
      <Parent1 />
      <br />
      <Parent2 />
    </div>
  );
};
