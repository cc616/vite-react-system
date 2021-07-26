import React from 'react';

import { Card, Row, Col } from 'antd';

import Header from '@/components/header';
import Content from '@/components/content';
import UserLogo from '@/assets/user.png';

import styles from './index.module.less';

const Dashboard = (): JSX.Element => {
  return (
    <>
      <Header title="工作台">
        <>
          <img className={styles.userLogo} src={UserLogo} />
          <div className={styles.userContent}>
            <div className={styles.title}>早安，吴彦祖，祝你开心每一天！</div>
            <div>高级搬砖专家 | 后台管理系统体验技术部</div>
          </div>
        </>
      </Header>
      <Content>
        <Row gutter={24}>
          <Col span={16}>
            <Card title="进行中的项目">
              <Card.Grid>Content</Card.Grid>
              <Card.Grid>Content</Card.Grid>
              <Card.Grid>Content</Card.Grid>
              <Card.Grid>Content</Card.Grid>
              <Card.Grid>Content</Card.Grid>
              <Card.Grid>Content</Card.Grid>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="技能指数">this is a dashboard page</Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Dashboard;
