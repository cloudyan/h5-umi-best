import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './index.less';

export default (props) => {
  const renderEl = useRef(null);

  useEffect(() => {
    renderEl.current?.classList.add('show');
    const timer = setTimeout(() => {
      renderEl.current?.classList?.remove('show');
      clearTimeout(timer);
    }, 400);
  });

  return (
    <span
      ref={renderEl}
      className={classNames('re-render', { right: props.right })}
    >
      ReRender
    </span>
  );
};
