import { forwardRef, useImperativeHandle, ForwardedRef, useState, useMemo } from 'react';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import { defaultSettings } from './settings/index';
import { defaultGetId, sortable2standard, standard2sortable } from './utils/index';
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
  const [selected, setSelected] = useState();

  const getValue = () => {};
  const setValue = () => {};
  const getErrorFields = () => {};

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    getErrorFields,
  }));

  const sortableSchema = useMemo(() => {
    return standard2sortable(schema);
  }, [schema]);

  const setSortableSchema = (newProperties) => {
    setSchema(sortable2standard({
      ...schema,
      properties: newProperties,
    }));
  }

  return (
    <div className="fr-generator">
      <Sidebar getId={getId} settings={settings} />
      <div className="fr-generator-divider" />
      <CanvasCtx.Provider
        value={{
          selected,
          setSelected,
          sortableSchema,
          setSortableSchema,
        }}
      >
        <Canvas schema={schema} />
      </CanvasCtx.Provider>
      <div className="fr-generator-divider" />
      <Settings />
    </div>
  )
});

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './settings/index';

export default SchemaGenerator;
