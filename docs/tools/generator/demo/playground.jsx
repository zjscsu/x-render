import React, { useEffect, useRef } from 'react';
import { useHistory } from 'umi';
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
            "input_yEA7p3": {
              "title": "输入框",
              "type": "string",
              "props": {}
            },
            "input_VKw5-8": {
              "title": "输入框",
              "type": "string",
              "props": {}
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
