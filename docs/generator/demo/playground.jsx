import React, { useRef } from 'react';
import Generator from 'fr-generator';
import './index.less';

const Demo = () => {
  const ref = useRef();

  const goToFrPlayground = () => {
    ref.current.copyValue();
    window.open('/playground');
  };

  return (
    <div className="fr-generator-playground" style={{ height: '80vh' }}>
      <Generator
        ref={ref}
        defaultValue={{
          "type": "object",
          "properties": {
            "input_vSJ_4V": {
              "title": "输入框",
              "type": "string",
              "props": {}
            },
            "date_dFSZC5": {
              "title": "日期选择",
              "type": "string",
              "format": "date"
            },
            "object_3mMrAt": {
              "title": "对象",
              "type": "object",
              "properties": {
                "input_D5r36R": {
                  "title": "输入框",
                  "type": "string",
                  "props": {}
                }
              }
            }
          },
          "labelWidth": 120,
          "displayType": "row"
        }}
        extraButtons={[{ text: '去playground验证', onClick: goToFrPlayground }]}
        onChange={data => console.log('data:change', data)}
        onSchemaChange={schema => console.log('schema:change', schema)}
      />
    </div>
  );
};

export default Demo;
