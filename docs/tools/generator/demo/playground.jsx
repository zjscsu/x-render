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

  const handleClick = () => {
    console.log(ref);
  }

  return (
    <div className="fr-generator-playground" style={{ height: '80vh' }}>
      <div onClick={handleClick}>测试</div>
      <Generator
        ref={ref}
        extraButtons={[{ text: '去playground验证', onClick: goToFrPlayground }]}
        onChange={data => console.log('data:change', data)}
        onSchemaChange={schema => console.log('schema:change', schema)}
      />
    </div>
  );
};

export default Demo;
