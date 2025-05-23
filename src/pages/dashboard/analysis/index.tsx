import { Col, Row } from 'antd';

import Content from '@/components/content';

import FlyLineChart from './flyLineChart';

const Analysis = () => {
  return (
    <Content>
      <Row gutter={24}>
        <Col span={16}>
          <FlyLineChart />
        </Col>
      </Row>
    </Content>
  );
};

export default Analysis;
