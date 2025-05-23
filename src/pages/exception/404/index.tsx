import { Button, Result } from 'antd';

const Exception404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在。"
      extra={<Button type="primary">回到首页</Button>}
    />
  );
};

export default Exception404;
