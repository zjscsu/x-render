import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import './index.less'

const { TabPane } = Tabs;

interface SettingsProps {
  widgets?: any;
}

export default function Settings({ widgets }: SettingsProps) {
  return (
    <div className="fr-generator-settings">
      配置
    </div>
  );
}
