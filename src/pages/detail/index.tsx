import React from 'react';

import Content from '@/components/content';
import { Button, Select, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import styles from './index.module.less';

enum STATUS {
  PUBLISH = 'PUBLISH',
  UNPUBLISHED = 'UNPUBLISHED',
}

const STATUS_MAP = {
  [STATUS.PUBLISH]: '已发布',
  [STATUS.UNPUBLISHED]: '未发布',
};

interface DataType {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: STATUS;
}

const data: DataType[] = [
  {
    id: '1',
    name: 'John Brown',
    description: '生命就像一盒巧克力，结果往往出人意料',
    startDate: '2020-01-01',
    endDate: '2020-01-01',
    status: STATUS.PUBLISH,
  },
  {
    id: '2',
    name: 'Jim Green',
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    startDate: '2020-01-01',
    endDate: '2020-01-01',
    status: STATUS.UNPUBLISHED,
  },
  {
    id: '3',
    name: 'Joe Black',
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    startDate: '2020-01-01',
    endDate: '2020-01-01',
    status: STATUS.UNPUBLISHED,
  },
];

const Detail = (): JSX.Element => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'StartDate',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'EndDate',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: STATUS) => (
        <Tag color={status === STATUS.PUBLISH ? 'green' : 'orange'}>{STATUS_MAP[status]}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            {record.status === STATUS.UNPUBLISHED && <Button type="text">编辑</Button>}
            <Button type="text">删除</Button>
          </Space>
        );
      },
    },
  ];

  const handlePageChange = (page: number, pageSize?: number) => {
    console.log(page, pageSize);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    console.log(current, size);
  };

  return (
    <Content bgWhite>
      <div className={styles.wrapper}>
        <Select className={styles.select} defaultValue={'ALL'}>
          <Select.Option value="ALL">All</Select.Option>
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
        </Select>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: 1,
            pageSize: 10,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `共 ${total} 条`,
            total: 100,
            onChange: handlePageChange,
            onShowSizeChange: handlePageSizeChange,
          }}
        />
      </div>
    </Content>
  );
};

export default Detail;
