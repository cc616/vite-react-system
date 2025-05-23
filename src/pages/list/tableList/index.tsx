import { useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { useState } from 'react';

import Content from '@/components/content';
import { TABLE_LIST_STATUS, TABLE_LIST_STATUS_MAPPER } from '@/constants/list';
import useListStore from '@/store/list';
import { ITableItem, ITableListResponse } from '@/typing/list';

import styles from './index.module.less';

const TableList = () => {
  const { getTableList } = useListStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data = { list: [], total: 0 }, isFetching } = useQuery<ITableListResponse<ITableItem[]>>({
    queryKey: ['list/table-list', { page, pageSize }],
    queryFn: () => getTableList(page, pageSize),
    placeholderData: (prevData) => prevData || { list: [], total: 0, page: 1, pageSize: 10 },
  });
  const { list, total } = data;

  const columns: ColumnsType<ITableItem> = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index: number) => pageSize * (page - 1) + 1 + index,
    },
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
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (startDate: number) => dayjs(startDate).format('YYYY-MM-DD'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate: number) => dayjs(endDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: TABLE_LIST_STATUS) => (
        <Tag color={status === TABLE_LIST_STATUS.PUBLISH ? 'green' : 'orange'}>{TABLE_LIST_STATUS_MAPPER[status]}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            {record.status === TABLE_LIST_STATUS.UNPUBLISHED && <Button type="text">编辑</Button>}
            <Button type="text">删除</Button>
          </Space>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (_: number, size: number) => {
    setPageSize(size);
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
          dataSource={list}
          loading={isFetching}
          rowKey="id"
          pagination={{
            current: page,
            pageSize,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `共 ${total} 条`,
            total,
            onChange: handlePageChange,
            onShowSizeChange: handlePageSizeChange,
          }}
        />
      </div>
    </Content>
  );
};

export default TableList;
