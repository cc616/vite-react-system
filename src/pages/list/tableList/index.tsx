import { useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import Content from '@/components/content';
import { TABLE_LIST_STATUS, TABLE_LIST_STATUS_MAPPER } from '@/constants/list';
import useListStore from '@/store/list';
import { ITableItem } from '@/typing/list';

import styles from './index.module.less';

const TableList = () => {
  const { getTableList } = useListStore();

  const { data, isFetching } = useQuery({
    queryKey: ['list/table-list'],
    queryFn: getTableList,
    initialData: [],
  });

  const columns: ColumnsType<ITableItem> = [
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
          loading={isFetching}
          rowKey="id"
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

export default TableList;
