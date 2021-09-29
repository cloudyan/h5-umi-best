import React, { useState, useContext } from 'react';
import './index.less';
// https://zh-hans.reactjs.org/docs/context.html#when-to-use-context

// 何时使用 Context
// 使用 context, 我们可以避免通过中间元素传递 props：
// Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据

/* eslint max-classes-per-file: 0 */
const Button = (props) => <button className={props.theme}>Button</button>;
class ThemedButton1 extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
function Toolbar1(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton1 theme={props.theme} />
    </div>
  );
}
class App1 extends React.Component {
  render() {
    return (
      <div>
        <h2>App1</h2>
        <Toolbar1 theme={this.props.theme} />
      </div>
    );
  }
}

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（'dark'为默认值）。
const ThemeContext = React.createContext('dark');
ThemeContext.displayName = 'MyTheme';

class ThemedButton2 extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。

  // class 上的 static 类属性
  static contextType = ThemeContext;

  render() {
    return <Button theme={this.context} />;
  }
}

const MyContext = React.createContext('dark');
MyContext.displayName = 'MyContext';

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar2() {
  return (
    <div>
      <ThemedButton2 />
    </div>
  );
}
class App2 extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <div>
        <h2>App2</h2>
        <ThemeContext.Provider value={this.props.theme}>
          <Toolbar2 />

          <br />
        </ThemeContext.Provider>
        <br />

        {/* 使用默认值 */}
        <ThemedButton2 />
      </div>
    );
  }
}

function ThemedButton3() {
  const theme = useContext(MyContext);
  return <Button theme={theme} />;
}
function Toolbar3(props) {
  return (
    <div>
      <ThemedButton3 />
    </div>
  );
}
class App3 extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <div>
        <h2>App3</h2>
        <MyContext.Provider value={this.props.theme}>
          <Toolbar3 />

          <br />
        </MyContext.Provider>
        <br />
        {/* 使用默认值 */}
        <ThemedButton3 />
      </div>
    );
  }
}

export default (props) => {
  const [theme, setTheme] = useState('light');

  const onChange = (e) => {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="page-demo">
      <button onClick={onChange}>Theme: {theme}</button>
      <br />
      <br />
      <App1 theme={theme} />
      <br />
      <App2 theme={theme} />
      <br />
      <App3 theme={theme} />
    </div>
  );
};
