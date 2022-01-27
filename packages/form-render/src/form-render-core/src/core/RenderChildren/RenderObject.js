import React from 'react';
import Core from '../index';
import { useStore2 } from '../../hooks';

const RenderObject = (props) => {
  const {
    children = [],
    dataIndex = [],
    displayType,
    hideTitle,
  } = props;
  const { objectRender } = useStore2();

  const originNode = (
    <>
      {children.map((child, i) => {
        const FRProps = {
          displayType,
          id: child,
          dataIndex,
          hideTitle,
        };
        return <Core key={i.toString()} {...FRProps} />;
      })}
    </>
  );

  if (!objectRender) return originNode;
  return objectRender(props, originNode);
};

export default RenderObject;
