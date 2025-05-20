import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

import Content from '@/components/content';

import styles from './index.module.less';

const Failure = () => {
  return (
    <Content bgWhite>
      <Result
        status="error"
        title="提交失败"
        subTitle="请核对并修改以下信息后，再重新提交。"
        extra={[
          <Button type="primary" key="edit">
            返回修改
          </Button>,
        ]}
      >
        <div className={styles.title}>您提交的内容有如下错误：</div>
        <div className={styles.desc}>
          <CloseCircleOutlined className={styles.icon} />
          您的账户已被冻结
          <a>立即解冻 &gt;</a>
        </div>
        <div className={styles.desc}>
          <CloseCircleOutlined className={styles.icon} />
          您的账户还不具备申请资格
          <a>立即升级 &gt;</a>
        </div>
      </Result>
    </Content>
  );
};

export default Failure;
