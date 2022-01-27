import { useState, useEffect } from 'react';
import FormRender, {
  useForm,
  widgets as defaultWidgets,
  mapping as defaultMapping,
} from 'form-render';
import {
  defaultSettings,
  baseCommonSettings,
  defaultCommonSettings,
} from '../../settings';
import { useDebouncedCallback } from 'use-debounce';
import { mergeInOrder } from '../../utils';
import { getWidgetName } from '../../utils/mapping';
import './index.less'

interface SettingsProps {
  widgets?: any;
  selected?: string;
  schema?: any;
  onChange?: (schema: any) => void;
}

export default function Settings({ selected, schema, onChange }: SettingsProps) {
  const form = useForm();
  const [settingSchema, setSettingSchema] = useState({});

  const getWidgetList = (settings, commonSettings) => {
    return settings.reduce((widgetList, setting) => {
      if (!Array.isArray(setting.widgets)) return widgetList;
      const basicWidgets = setting.widgets.map(item => {
        const baseItemSettings = {};
        if (item.schema.type === 'array' && item.schema.items) {
          baseItemSettings.items = {
            type: 'object',
            hidden: '{{true}}',
          };
        }
        return {
          ...item,
          widget:
            item.widget ||
            item.schema.widget ||
            getWidgetName(item.schema, defaultMapping),
          setting: mergeInOrder(
            baseCommonSettings,
            commonSettings,
            baseItemSettings,
            item.setting
          ),
        };
      });
      return [...widgetList, ...basicWidgets];
    }, []);
  };

  const onDataChange = useDebouncedCallback(value => {
    try {
      const item = schema.properties[selected];
      if (!item || selected === '#') return;
      if (item) {
        onChange(value);
      }
    } catch (error) {
      console.error(error, 'catch');
    }
  }, 100);

  useEffect(() => {
    // setting 该显示什么的计算，要把选中组件的 schema 和它对应的 widgets 的整体 schema 进行拼接
    try {
      const item = schema.properties[selected];
      if (!item || selected === '#') return;
      // 算 widgetList
      const _settings = defaultSettings;
      const _commonSettings = defaultCommonSettings;
      const widgetList = getWidgetList(_settings, _commonSettings);
      const widgetName = getWidgetName(item, defaultMapping);
      const element = widgetList.find(e => e.widget === widgetName) || {}; // 有可能会没有找到
      const properties = { ...element.setting };

      setTimeout(() => {
        setSettingSchema({
          type: 'object',
          displayType: 'column',
          properties,
        });
        const value = item;
        form.setValues(value);
        onDataChange(form.getValues());
        form.submit();
      }, 0);
    } catch (error) {
      console.error(error);
    }
  }, [selected]);

  return (
    <div className="fr-generator-settings">
      组件配置
      <FormRender
        form={form}
        removeHiddenData
        schema={settingSchema}
        watch={{
          '#': v => setTimeout(() => onDataChange(v), 0),
        }}
      />
    </div>
  );
}
