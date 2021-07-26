import React from 'react';
import { useSelector } from 'react-redux';

import { Card, Row, Col } from 'antd';

import Header from '@/components/header';
import Content from '@/components/content';
import UserLogo from '@/assets/user.png';
import { IRootState } from '@/reducers';

import styles from './index.module.less';

const Dashboard = (): JSX.Element => {
  const { profile } = useSelector(({ auth }: IRootState) => auth);

  return (
    <>
      <Header title="工作台">
        <>
          <img className={styles.userLogo} src={UserLogo} />
          <div className={styles.userContent}>
            <div className={styles.title}>早安，{profile?.username}，祝你开心每一天！</div>
            <div>{profile?.position} | 后台管理系统体验技术部</div>
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
