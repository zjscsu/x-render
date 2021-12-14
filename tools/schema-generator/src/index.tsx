import { forwardRef, useImperativeHandle, ForwardedRef } from 'react';

export interface GeneratorProps {
  getId?: (name: string) => string;
}

export interface GeneratorRef {
  getValue: () => any;
}

const SchemaGenerator = forwardRef((
  props: GeneratorProps,
  ref: ForwardedRef<GeneratorRef>
) => {
  const getValue = () => {};
  const setValue = () => {};
  const getErrorFields = () => {};

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    getErrorFields,
  }));

  return (
    <div></div>
  )
});

export {
  defaultSettings,
  defaultCommonSettings,
  defaultGlobalSettings,
} from './settings/index';

export default SchemaGenerator;
