import { memo } from 'react';
import ReRender from '@/components/re-render';

const Child = (props) => {
  return (
    <div className="props-box pr">
      <ReRender />
      <div className="props-title">
        <div className="props-title-center">
          <div className="props-key">props:</div>
          <div className="props-value">{props.value}</div>
        </div>
      </div>
      <div className="content">{props.title}</div>
      {props.children}
    </div>
  );
};

export default Child;
