import { useState } from 'react';
import classNames from 'classnames';
import ReRender from '@/components/re-render';
import './index.less';

export default (props) => {
  const { type } = props;
  return (
    <div className={classNames('state-box pr', { [`state-${type}`]: type })}>
      <div className="state-mark">{`${type}:`}</div>
      <div className="state-content">
        {props.children || (
          <>
            <i>{props.name}: </i>
            <b>{props.value}</b>
          </>
        )}
      </div>
    </div>
  );
};
