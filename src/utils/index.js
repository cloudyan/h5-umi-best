export const sleep = (...rest) =>
  new Promise((resolve) => setTimeout(resolve, ...rest));

import React, { FC } from 'react';
import classNames from 'classnames';
import { assign, assignWith, isUndefined } from 'lodash';

export function withDefaultProps(defaultProps) {
  return function (C) {
    C.defaultProps = defaultProps;
    return C;
  };
}

export function mergeProps(defaultProps, props) {
  function customizer(objValue, srcValue) {
    return isUndefined(srcValue) ? objValue : srcValue;
  }
  return assignWith(assign({}, defaultProps), props, customizer);
}

const overflowScrollReg = /scroll|auto/i;
const defaultRoot = typeof window !== 'undefined' ? window : undefined;

function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return (
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === ELEMENT_NODE_TYPE
  );
}

// https://github.com/youzan/vant/issues/3823
export function getScrollParent(el, root = defaultRoot) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }

  return root;
}

export function withNativeProps(props, element) {
  const p = {
    ...element.props,
  };
  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }
  for (const key in props) {
    if (!props.hasOwnProperty(key)) continue;
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }
  return React.cloneElement(element, p);
}
