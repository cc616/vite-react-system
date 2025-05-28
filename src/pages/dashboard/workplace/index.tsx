import { Card, Col, Row } from 'antd';

import Content from '@/components/content';

import styles from './index.module.less';
import WorkplaceProfile from './profile';
import WorkplaceOngoingProject, { WorkplaceTeam } from './team';

const Workplace = () => {
  return (
    <>
      <WorkplaceProfile />
      <Content className={styles.content}>
        <Row gutter={24}>
          <Col span={16}>
            <WorkplaceOngoingProject />
          </Col>
          <Col span={8}>
            <Card title="技能指数">this is a dashboard page</Card>
            <WorkplaceTeam />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Workplace;
