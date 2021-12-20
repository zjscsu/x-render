import React, { useEffect, useRef, useState, useMemo } from 'react';
import FormRender, { useForm } from 'form-render';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import cx from 'classnames';
import { useCanvas } from '../../utils/context';
import './index.less';

interface CanvasProps {
  schema?: any;
  data?: any;
}

const fieldRender = (props, Field) => {
  const inside = false;
  const [position, setPosition] = useState('');
  const boxRef = useRef(null);
  const { selected, setSelected } = useCanvas();

  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    type: 'box',
    item: { $id: 'id' },
    canDrag: true,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'box',
    drop: async (item, monitor) => {
      // 如果 children 已经作为了 drop target，不处理
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      console.log('drop')
    },
    hover: (item, monitor) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: true });
      if (didHover) {
        // Determine rectangle on screen
        const hoverBoundingRect =
          boxRef.current && boxRef.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        const dragOffset = monitor.getSourceClientOffset();
        // Get pixels to the top
        const hoverClientY = dragOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (inside) {
          setPosition('inside');
        } else {
          if (hoverClientY <= hoverMiddleY) {
            setPosition('up');
          }
          // Dragging upwards
          if (hoverClientY > hoverMiddleY) {
            setPosition('down');
          }
        }
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  dragPreview(dropRef(boxRef));

  const isObject = useMemo(() => {
    return props._schema.type === 'object';
  }, [props._schema.type])

  const isSelected = useMemo(() => {
    return props.$id === selected;
  }, [selected])

  return (
    <div
      ref={boxRef}
      className={cx(['fr-generator-canvas-field', props._schema.type], { selected: isSelected })}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(props.$id);
      }}
    >
      <div className="fr-generator-canvas-field-id">{props.$id}</div>

      <Field {...props} />

      {!isObject && isSelected && (<>
        <div className="fr-generator-canvas-pointer-move" ref={dragRef}>
          <DragOutlined />
        </div>
        <div className="fr-generator-canvas-pointer-operate">
          <div className="fr-generator-canvas-pointer-operate-item">
            <DeleteOutlined />
          </div>
          <div className="fr-generator-canvas-pointer-operate-item">
            <CopyOutlined />
          </div>
        </div>
      </>)}
    </div>
  )
}

const Canvas = ({ schema, data }: CanvasProps) => {
  const form = useForm();

  useEffect(() => {
    form.setValues(data);
  }, []);

  return (
    <div className="fr-generator-canvas">
      <FormRender
        schema={schema}
        form={form}
        fieldRender={fieldRender}
      />
    </div>
  );
};

export default Canvas;
