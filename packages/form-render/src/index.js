import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import FRCore from './form-render-core/src';
import { widgets as defaultWidgets } from './widgets/antd';

// TODO 调试代码，发布前记得删除
import '../form-render-next/core/useForm'

export { defaultWidgets as widgets };
export {
  useForm,
  connectForm,
  createWidget,
  mapping,
} from './form-render-core/src';



const FR = ({ widgets, configProvider, ...rest }) => {
  return (
    <ConfigProvider locale={zhCN} {...configProvider}>
      <FRCore widgets={{ ...defaultWidgets, ...widgets }} {...rest} />
    </ConfigProvider>
  );
};

export default FR;
