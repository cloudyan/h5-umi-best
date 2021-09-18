import { useState, memo } from 'react';
import wrapper from './wrapper';
import './index.less';

const ComponentC = wrapper({ title: 'ComponentC' }, null);
const ComponentB = wrapper({ title: 'ComponentB' }, ComponentC);
const ComponentA = wrapper({ title: 'ComponentA' }, ComponentB);
const App = wrapper({ title: 'App1' }, ComponentA);

const ComponentC2 = wrapper({ title: 'ComponentC2' }, null);
const ComponentB2 = wrapper({ title: 'ComponentB2' }, ComponentC2);
const ComponentA2 = memo(wrapper({ title: 'memo(ComponentA2)' }, ComponentB2));
const App2 = wrapper({ title: 'App2' }, ComponentA2);

const ComponentC32 = wrapper({ title: 'ComponentC32' }, null);
const ComponentC31 = wrapper({ title: 'ComponentC31' }, null);
const ComponentB32 = wrapper({ title: 'ComponentB32' }, ComponentC32);
const ComponentB31 = memo(
  wrapper({ title: 'memo(ComponentB31)' }, ComponentC31),
);
const Two = () => (
  <div className="column-2">
    <ComponentB31 />
    <ComponentB32 />
  </div>
);
const ComponentA3 = wrapper({ title: 'ComponentA3' }, Two);
const App3 = wrapper({ title: 'App3' }, ComponentA3);

// https://alexsidorenko.com/blog/react-render-always-rerenders/
export default () => {
  return (
    <div className="page-demo">
      <App />

      <br />

      {/* memo */}
      <App2 />

      <br />

      {/* 相邻组件 */}
      <App3 />
    </div>
  );
};
