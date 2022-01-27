import { useState, useMemo } from 'react';
import FormRender, { useForm } from 'form-render';
import { Button, Space, Modal, Input, message } from 'antd';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import copyTOClipboard from 'copy-text-to-clipboard';
import { ReactSortable } from 'react-sortablejs';
import cx from 'classnames';
import { sortable2standard, standard2sortable } from '../../utils/index';
import { useCanvas } from '../../utils/context';
import './index.less';

const fieldRender = (props, originNode) => {
  const { selected, setSelected } = useCanvas();

  const isSelected = useMemo(() => {
    return props.$id === selected;
  }, [props.$id, selected])

  const handleDelete = () => {
    console.log('delete', props.$id)
  }

  const handleCopy = () => {
    console.log('copy', props.$id)
  }

  return (
    <div
      className={cx(['fr-generator-canvas-field', props._schema.type], { selected: isSelected })}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(props.$id);
      }}
    >
      <div className="fr-generator-canvas-field-id">{props.$id.replace(/.*\./, '')}</div>

      {originNode}

      {props.$id !== '#' && isSelected && (<>
        <div className="fr-generator-canvas-pointer-move">
          <DragOutlined />
        </div>
        <div className="fr-generator-canvas-pointer-operate">
          <div className="fr-generator-canvas-pointer-operate-item" onClick={handleDelete}>
            <DeleteOutlined />
          </div>
          <div className="fr-generator-canvas-pointer-operate-item" onClick={handleCopy}>
            <CopyOutlined />
          </div>
        </div>
      </>)}
    </div>
  )
}

const objectRender = (props, originNode) => {
  const { $id } = props.fieldProps;
  const { getId, schema, setSchema, selected, setSelected } = useCanvas();

  const sortableSchema = useMemo(() => {
    const _schema = $id === '#' ? schema : schema.properties[$id];
    if (!_schema) {
      return {
        type: 'object',
        properties: []
      }
    }
    return standard2sortable(_schema);
  }, [schema]);

  const setSortableSchema = (properties) => {
    const newProperties = properties.map(item => {
      if (!item.schema) return item;
      return {
        ...item.schema,
        $id: getId(item.name),
      }
    })
    const ids = selected ? selected.split('.') : [];
    const fieldId = ids[ids.length - 1];
    if ($id === '#') {
      setSchema(sortable2standard({
        ...schema,
        properties: newProperties,
      }));
      if (sortableSchema.properties.length < newProperties.length) {
        setSelected(fieldId);
      }
    } else {
      setSchema({
        ...schema,
        properties: {
          ...schema.properties,
          [$id]: sortable2standard({
            ...schema.properties[$id],
            properties: newProperties,
          })
        },
      });
      if (schema.properties[$id] && Object.keys(schema.properties[$id].properties).length < newProperties.length) {
        setSelected(`${$id}.${fieldId}`);
      }
    }
  };

  return (
    <ReactSortable
      style={{ width: '100%' }}
      list={sortableSchema.properties}
      setList={setSortableSchema}
      group="fr-generator"
      handle=".fr-generator-canvas-pointer-move"
      animation={200}
    >
      {originNode}
    </ReactSortable>
  )
}

const CanvasContent = ({ preview }) => {
  const form = useForm();
  const { schema, setSchema, getId } = useCanvas();
  const isEmpty = !Object.keys(schema.properties).length;

  if (isEmpty) {
    const setSortableSchema = (properties) => {
      const newProperties = properties.map(item => {
        if (!item.schema) return item;
        return {
          ...item.schema,
          $id: getId(item.name),
        }
      })
      setSchema(sortable2standard({
        ...schema,
        properties: newProperties,
      }));
    }

    return (
      <div key="empty" className="fr-generator-canvas-content">
        <ReactSortable
          list={[]}
          setList={setSortableSchema}
          group={{
            name: 'fr-generator',
            pull: isEmpty,
            put: isEmpty
          }}
          className="fr-generator-canvas-placeholder"
        />
        <div className="fr-generator-canvas-empty">拖拽左侧栏的组件进行添加</div>
      </div>
    )
  }

  return (
    <div className="fr-generator-canvas-content">
      <FormRender
        schema={schema}
        form={form}
        fieldRender={preview ? false : fieldRender}
        objectRender={preview ? false : objectRender}
      />
    </div>
  )
}

const Canvas = () => {
  const [preview, setPreview] = useState(false);
  const { schema, setSchema } = useCanvas();

  const handleImport = () => {
    let importSchema
    Modal.confirm({
      content: (
        <Input.TextArea
          style={{ fontSize: 12 }}
          placeholder="贴入需要导入的schema，模样可点击导出schema参考"
          onChange={e => { importSchema = e.target.value }}
          autoSize={{ minRows: 10, maxRows: 30 }}
        />
      ),
      width: 520,
      okText: '导入',
      cancelText: '取消',
      icon: null,
      onOk() {
        try {
          setSchema(JSON.parse(importSchema));
          message.info('导入成功');
        } catch {
          message.warn('格式不对哦，请重新尝试');
        }
      },
    });
  }

  const handleExport = () => {
    const schemaString = JSON.stringify(schema, null, 2);
    Modal.confirm({
      content: (
        <Input.TextArea
          style={{ fontSize: 12 }}
          autoSize={{ minRows: 10, maxRows: 30 }}
          value={schemaString}
        />
      ),
      width: 520,
      okText: '复制',
      cancelText: '取消',
      icon: null,
      onOk() {
        copyTOClipboard(schemaString);
        message.info('复制成功');
      },
    });
  }

  return (
    <div className="fr-generator-canvas">
      <Space className="fr-generator-operation">
        <Button onClick={() => setPreview(!preview)}>
          {preview ? '开始编辑' : '最终展示'}
        </Button>
        <Button onClick={() => setSchema({})}>清空</Button>
        <Button onClick={handleImport}>导入</Button>
        <Button onClick={handleExport}>导出</Button>
      </Space>

      <CanvasContent preview={preview} />
    </div>
  );
};

export default Canvas;
