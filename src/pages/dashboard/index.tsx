import React, { useEffect, useState } from 'react';

import { Card, Row, Col, Avatar } from 'antd';

import Header from '@/components/header';
import Content from '@/components/content';
import UserLogo from '@/assets/user.png';
import { getProjects } from '@/apis/project';
import { IProject } from '@/typing/project';
import { TEAM, TEAM_PROJECT_NAME_MAP, TEAM_NAME_MAP } from '@/constants/team';
import ReactLogo from '@/assets/team/react.png';
import VueLogo from '@/assets/team/vue.png';
import AngularLogo from '@/assets/team/angular.png';
import AntDesignLogo from '@/assets/team/ant-design.png';
import BootstrapLogo from '@/assets/team/bootstrap.png';
import ViteLogo from '@/assets/team/vite.png';

import styles from './index.module.less';
import useAuthStore from '@/store/auth';

const TEAM_AVATAR_MAP = {
  [TEAM.REACT]: ReactLogo,
  [TEAM.VUE]: VueLogo,
  [TEAM.ANGULAR]: AngularLogo,
  [TEAM.ANT_DESIGN]: AntDesignLogo,
  [TEAM.BOOTSTRAP]: BootstrapLogo,
  [TEAM.VITE_PRO]: ViteLogo,
};

const Dashboard = (): JSX.Element => {
  const { profile } = useAuthStore();
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

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
      <Content className={styles.content}>
        <Row gutter={24}>
          <Col span={16}>
            <Card title="进行中的项目">
              {projects.map((item) => (
                <Card.Grid key={item.id} className={styles.projectCardGrid}>
                  <Card.Meta
                    description={item.description}
                    title={
                      <div className={styles.projectCardTitle}>
                        <Avatar size={24} src={TEAM_AVATAR_MAP[item.team]} />
                        <a>{TEAM_PROJECT_NAME_MAP[item.team]}</a>
                      </div>
                    }
                  />
                  <div className={styles.projectCardFooter}>
                    <a>{TEAM_NAME_MAP[item.team]}</a>
                    <span>{item.publishedAt}</span>
                  </div>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="技能指数">this is a dashboard page</Card>
            <Card title="团队">
              <Row className={styles.teamCard}>
                {Object.values(TEAM).map((item) => (
                  <Col key={item} span={12}>
                    <a className={styles.teamCardLink}>
                      <Avatar size={24} src={TEAM_AVATAR_MAP[item]} />
                      <span>{TEAM_PROJECT_NAME_MAP[item]}</span>
                    </a>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Dashboard;
