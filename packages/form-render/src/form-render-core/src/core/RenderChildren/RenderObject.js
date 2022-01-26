import React from 'react';
import Core from '../index';
import { useStore2 } from '../../hooks';

const RenderObject = ({
  children = [],
  dataIndex = [],
  displayType,
  hideTitle,
}) => {
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
  return objectRender(originNode);
};

export default RenderObject;
