import { Result, Button, Descriptions, Steps } from 'antd';
import { DingdingOutlined } from '@ant-design/icons';

import Content from '@/components/content';

import styles from './index.module.less';

const Success = () => {
  return (
    <Content bgWhite>
      <Result
        status="success"
        title="提交成功"
        subTitle="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
        extra={[
          <Button type="primary" key="list">
            返回列表
          </Button>,
          <Button key="log">查看日志</Button>,
          <Button key="print">打印</Button>,
        ]}
      >
        <Descriptions title="项目名称">
          <Descriptions.Item label="项目 ID">23421</Descriptions.Item>
          <Descriptions.Item label="负责人">曲丽丽</Descriptions.Item>
          <Descriptions.Item label="生效时间">2016-12-12 ~ 2017-12-12</Descriptions.Item>
        </Descriptions>
        <br />
        <Steps progressDot current={1}>
          <Steps.Step
            title="创建项目"
            description={
              <div className={styles.desc}>
                <div className={styles.descTitle}>
                  曲丽丽
                  <DingdingOutlined className={styles.icon} />
                </div>
                <div>2016-12-12 12:32</div>
              </div>
            }
          />
          <Steps.Step
            title="部门初审"
            description={
              <div className={styles.desc}>
                <div className={styles.descTitle}>
                  周毛毛
                  <a className={styles.icon}>
                    <DingdingOutlined />
                    催一下
                  </a>
                </div>
              </div>
            }
          />
          <Steps.Step title="财务复核" />
          <Steps.Step title="完成" />
        </Steps>
      </Result>
    </Content>
  );
};

export default Success;
