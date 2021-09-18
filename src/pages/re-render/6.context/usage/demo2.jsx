import React, { useState } from 'react';
import { themes, ThemeContext } from './theme-context';

import './index.less';
// https://zh-hans.reactjs.org/docs/context.html#when-to-use-context

// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，
  // 它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background, color: theme.foreground }}
        >
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

class App1 extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <div>
        <h2>App1</h2>
        <ThemeContext.Provider value={this.state}>
          <Content />
        </ThemeContext.Provider>
      </div>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

export default (props) => {
  // const [theme, setTheme] = useState('light');

  // const onChange = (e) => {
  //   setTheme(theme => theme === 'dark' ? 'light' : 'dark');
  // }

  return (
    <div className="page-demo">
      <App1 />
      <br />
    </div>
  );
};
