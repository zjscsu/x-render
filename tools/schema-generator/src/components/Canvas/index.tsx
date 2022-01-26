import { useEffect, useRef, useState, useMemo } from 'react';
import FormRender, { useForm } from 'form-render';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { ReactSortable } from "react-sortablejs";
import cx from 'classnames';
import { useCanvas } from '../../utils/context';
import './index.less';

interface CanvasProps {
  schema?: any;
  data?: any;
}

const fieldRender = (props, originNode) => {
  const { selected, setSelected } = useCanvas();

  const isObject = useMemo(() => {
    return props._schema.type === 'object';
  }, [props._schema.type])

  const isSelected = useMemo(() => {
    return props.$id === selected;
  }, [selected])

  return (
      <div
        className={cx(['fr-generator-canvas-field', props._schema.type], { selected: isSelected })}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(props.$id);
        }}
      >
        <div className="fr-generator-canvas-field-id">{props.$id}</div>

        {originNode}

        {!isObject && isSelected && (<>
          <div className="fr-generator-canvas-pointer-move">
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

const objectRender = (originNode) => {
  const { sortableSchema, setSortableSchema } = useCanvas();

  return (
    <ReactSortable list={sortableSchema.properties} setList={setSortableSchema}>
      {originNode}
    </ReactSortable>
  )
}

const Canvas = ({ schema, data }: CanvasProps) => {
  const form = useForm();
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    form.setValues(data);
  }, []);

  return (
    <div className="fr-generator-canvas">
      <div onClick={() => setPreview(!preview)}>切换预览</div>
      <FormRender
        schema={schema}
        form={form}
        fieldRender={preview ? false : fieldRender}
        objectRender={preview ? false : objectRender}
      />
      <pre>{JSON.stringify(schema, null, 2)}</pre>
      <pre>{JSON.stringify(form.formData, null, 2)}</pre>
    </div>
  );
};

export default Canvas;
