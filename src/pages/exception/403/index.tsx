import { Button, Result } from 'antd';

const Exception403 = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你没有访问权限。"
      extra={<Button type="primary">回到首页</Button>}
    />
  );
};

export default Exception403;
