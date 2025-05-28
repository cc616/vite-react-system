import { Button, Descriptions, Form, Input, Space } from 'antd';
import { memo, useMemo } from 'react';

import { IPayInformation } from './stepOne';

export interface IForm {
  payPassword: string;
}

interface IProps {
  onNext: (values: IForm) => void;
  onPrev: () => void;
  payInformation: IPayInformation;
}

const StepTwo = ({ onNext, onPrev, payInformation }: IProps) => {
  const [form] = Form.useForm();

  const items = useMemo(() => {
    return [
      {
        label: '付款账户',
        children: payInformation.payAccount,
      },
      {
        label: '收款账户',
        children: payInformation.receiverAccount,
      },
      {
        label: '收款人姓名',
        children: payInformation.receiverName,
      },
      {
        label: '转账金额',
        children: `${payInformation.amount} 元`,
      },
    ];
  }, [payInformation]);

  return (
    <Space direction="vertical" size={24}>
      <Descriptions column={1} bordered items={items} />
      <Form form={form} layout="vertical" onFinish={onNext}>
        <Form.Item<IForm>
          label="支付密码"
          name="payPassword"
          initialValue={'123456'}
          rules={[{ required: true, message: '需要支付密码才能进行支付' }]}
        >
          <Input.Password placeholder="请输入" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button onClick={onPrev}>上一步</Button>
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default memo(StepTwo);
