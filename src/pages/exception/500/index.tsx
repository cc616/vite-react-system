import React from 'react';

import { Button, Result } from 'antd';

const Exception500 = (): JSX.Element => {
  return (
    <div>
      <Result status="500" title="500" subTitle="抱歉，服务出错啦。" extra={<Button type="primary">回到首页</Button>} />
    </div>
  );
};

export default Exception500;
