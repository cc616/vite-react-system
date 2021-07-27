import React from 'react';

import { Button, Result } from 'antd';

const Exception404 = (): JSX.Element => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在。"
        extra={<Button type="primary">回到首页</Button>}
      />
    </div>
  );
};

export default Exception404;
