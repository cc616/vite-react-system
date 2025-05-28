import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { memo } from 'react';

enum RECEIVER_TYPE {
  ALIPAY = 'ALIPAY',
  BANK = 'BANK',
}

const RECEIVER_TYPE_MAPPER: { [key in RECEIVER_TYPE]: string } = {
  [RECEIVER_TYPE.ALIPAY]: '支付宝',
  [RECEIVER_TYPE.BANK]: '银行帐户',
};

export interface IPayInformation {
  payAccount: string;
  receiverType: RECEIVER_TYPE;
  receiverAccount: string;
  receiverName: string;
  amount: number;
}

interface IProps {
  onNext: (values: IPayInformation) => void;
}

const StepOne = ({ onNext }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={onNext}>
      <Form.Item<IPayInformation>
        label="付款账户"
        name="payAccount"
        initialValue={'alipay'}
        rules={[{ required: true, message: '请选择付款账户' }]}
      >
        <Select placeholder="请选择" allowClear options={[{ label: 'xxxn@alipay.com', value: 'alipay' }]} />
      </Form.Item>
      <Row>
        <Col span={6}>
          <Form.Item<IPayInformation>
            label="收款方式"
            name="receiverType"
            initialValue={RECEIVER_TYPE.ALIPAY}
            rules={[{ required: true, message: '请选择收款方式' }]}
          >
            <Select
              placeholder="请选择"
              allowClear
              options={Object.entries(RECEIVER_TYPE_MAPPER).map(([value, label]) => ({
                label,
                value,
              }))}
            />
          </Form.Item>
        </Col>
        <Col offset={2} span={16}>
          <Form.Item<IPayInformation>
            label="收款账户"
            name="receiverAccount"
            initialValue={'test@example.com'}
            rules={[{ required: true, message: '请输入收款账户' }]}
          >
            <Input
              allowClear
              placeholder={
                form.getFieldValue('receiverType') === RECEIVER_TYPE.ALIPAY ? '请输入支付宝账号' : '请输入银行账号'
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item<IPayInformation>
        label="收款人姓名"
        name="receiverName"
        initialValue={'xxx'}
        rules={[{ required: true, message: '请输入收款人姓名' }]}
      >
        <Input allowClear placeholder="请输入收款人姓名" />
      </Form.Item>
      <Form.Item<IPayInformation>
        label="转账金额"
        name="amount"
        initialValue={500}
        rules={[{ required: true, message: '请输入转账金额' }]}
      >
        <InputNumber style={{ width: '160px' }} prefix="¥" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(StepOne);
