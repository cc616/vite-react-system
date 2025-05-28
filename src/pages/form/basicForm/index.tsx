import { Button, DatePicker, Form, Input, InputNumber, message, Radio } from 'antd';

import Content from '@/components/content';
import Header from '@/components/header';

import styles from './index.module.less';

const { RangePicker } = DatePicker;

enum PUBLIC_TYPE {
  PUBLIC = 'PUBLIC',
  PARTIAL = 'PARTIAL',
  PRIVATE = 'PRIVATE',
}

const PUBLIC_TYPE_MAPPER: { [key in PUBLIC_TYPE]: string } = {
  [PUBLIC_TYPE.PUBLIC]: '公开',
  [PUBLIC_TYPE.PARTIAL]: '部分公开',
  [PUBLIC_TYPE.PRIVATE]: '不公开',
};

interface IBasicForm {
  title: string;
  dateRange: [string, string];
  description: string;
  standard: string;
  customer?: string;
  invites?: string;
  weight?: number;
  publicType: PUBLIC_TYPE;
}

const BasicForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = (values: IBasicForm) => {
    console.log('提交的表单数据:', values);
    messageApi.success('提交成功');
  };

  const handleResetForm = () => {
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Header bgWhite={false} title="基础表单">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
      </Header>
      <Content padding bgWhite className={styles.content}>
        <Form form={form} className={styles.form} layout="vertical" onFinish={handleFinish}>
          <Form.Item<IBasicForm> label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
            <Input placeholder="给目标起个名字" />
          </Form.Item>
          <Form.Item<IBasicForm>
            name="dateRange"
            label="起止日期"
            rules={[{ type: 'array' as const, required: true, message: '请选择起止日期' }]}
          >
            <RangePicker placeholder={['开始日期', '结束日期']} />
          </Form.Item>
          <Form.Item<IBasicForm>
            name="description"
            label="目标描述"
            rules={[{ required: true, message: '请输入目标描述' }]}
          >
            <Input.TextArea showCount placeholder="请输入你的阶段性工作目标" rows={3} maxLength={100} />
          </Form.Item>
          <Form.Item<IBasicForm>
            name="standard"
            label="衡量标准"
            rules={[{ required: true, message: '请输入衡量标准' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入衡量标准" showCount maxLength={100} />
          </Form.Item>
          <Form.Item<IBasicForm> label="客户" name="customer">
            <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
          </Form.Item>
          <Form.Item<IBasicForm> label="邀评人" name="invites">
            <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
          </Form.Item>
          <Form.Item<IBasicForm> label="权重" name="weight" initialValue={0}>
            <InputNumber
              formatter={(value) => (Number(value) > 100 ? '100%' : `${value}%`)}
              parser={(value) => value?.replace('%', '') as unknown as number}
            />
          </Form.Item>
          <Form.Item<IBasicForm>
            name="publicType"
            label="公开类型"
            rules={[{ required: true, message: '请选择公开类型' }]}
          >
            <Radio.Group>
              {Object.values(PUBLIC_TYPE).map((type) => (
                <Radio key={type} value={type}>
                  {PUBLIC_TYPE_MAPPER[type]}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button" onClick={handleResetForm} className={styles.resetBtn}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default BasicForm;
