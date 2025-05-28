import { Button, Descriptions, Divider, Result, Steps } from 'antd';
import { useState } from 'react';

import Content from '@/components/content';
import Header from '@/components/header';

import styles from './index.module.less';
import StepOne, { IPayInformation } from './stepOne';
import StepTwo from './stepTwo';

const StepForm = () => {
  const [step, setStep] = useState(0);
  const [payInformation, setPayInformation] = useState<IPayInformation | null>(null);

  const handleStepTwo = (values: IPayInformation) => {
    setPayInformation(values);
    handleNext();
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handlePayAgain = () => {
    setStep(0);
    setPayInformation(null);
  };

  return (
    <>
      <Header bgWhite={false} title="分步表单">
        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
      </Header>
      <Content padding bgWhite className={styles.content}>
        <Steps
          className={styles.steps}
          current={step}
          items={[
            {
              title: '填写转账信息',
            },
            {
              title: '确认转账信息',
            },
            {
              title: '完成',
            },
          ]}
        />
        <div className={styles.form}>
          {step === 0 && <StepOne onNext={handleStepTwo} />}
          {step === 1 && payInformation && (
            <StepTwo onNext={handleNext} onPrev={handlePrev} payInformation={payInformation} />
          )}
        </div>
        {step === 2 && (
          <Result
            className={styles.result}
            status="success"
            title="操作成功"
            subTitle="预计两小时内到账"
            extra={[
              <Button type="primary" key="again" onClick={handlePayAgain}>
                再转一笔
              </Button>,
              <Button key="info">查看账单</Button>,
            ]}
          >
            <Descriptions column={1}>
              <Descriptions.Item label="付款账户">{payInformation?.payAccount}</Descriptions.Item>
              <Descriptions.Item label="收款账户">{payInformation?.receiverAccount}</Descriptions.Item>
              <Descriptions.Item label="收款人姓名">{payInformation?.receiverName}</Descriptions.Item>
              <Descriptions.Item label="转账金额">{payInformation?.amount}</Descriptions.Item>
            </Descriptions>
          </Result>
        )}
        <Divider />
        <div>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Content>
    </>
  );
};

export default StepForm;
