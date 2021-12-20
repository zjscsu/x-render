import { forwardRef, useImperativeHandle, ForwardedRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  const [selected, setSelected] = useState();

  const getValue = () => {};
  const setValue = () => {};
  const getErrorFields = () => {};

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    getErrorFields,
  }));

  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <div className="fr-generator">
        <Sidebar getId={getId} settings={settings} />
        <div className="fr-generator-divider" />
        <CanvasCtx.Provider
          value={{
            selected,
            setSelected,
          }}
        >
          <Canvas schema={schema} />
        </CanvasCtx.Provider>
        <div className="fr-generator-divider" />
        <Settings />
      </div>
    </DndProvider>
  )
});

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './settings/index';

export default SchemaGenerator;
