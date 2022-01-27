import { forwardRef, useImperativeHandle, ForwardedRef, useState, useMemo } from 'react';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import { defaultSettings } from './settings/index';
import { defaultGetId } from './utils/index';
import { CanvasCtx } from './utils/context';
import './index.less';

export interface GeneratorProps {
  getId?: (name: string) => string;
  defaultValue?: any;
  settings?: any;
}

export interface GeneratorRef {
  getValue: () => any;
}

const SchemaGenerator = forwardRef((
  props: GeneratorProps,
  ref: ForwardedRef<GeneratorRef>
) => {
  const {
    getId = defaultGetId,
    settings = defaultSettings,
  } = props;
  const [schema, setSchema] = useState(props.defaultValue || {});
  const [selected, setSelected] = useState<string>();

  const getValue = () => schema;
  const setValue = value => {
    if (!value || !value.properties) {
      setSchema({
        type: 'object',
        properties: {},
      })
      return;
    }
    setSchema(value);
  }
  const getErrorFields = () => {};

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    getErrorFields,
  }));

  const handleSettingsChange = (newSchema) => {
    setSchema({
      ...schema,
      properties: {
        ...schema.properties,
        [selected]: newSchema
      }
    })
  }

  return (
    <div className="fr-generator">
      <Sidebar settings={settings} />
      <div className="fr-generator-divider" />
      <CanvasCtx.Provider
        value={{
          getId,
          selected,
          setSelected,
          schema,
          setSchema: setValue,
        }}
      >
        <Canvas />
      </CanvasCtx.Provider>
      <div className="fr-generator-divider" />
      <Settings selected={selected} schema={schema} onChange={handleSettingsChange} />
    </div>
  )
});

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './settings/index';

export default SchemaGenerator;
