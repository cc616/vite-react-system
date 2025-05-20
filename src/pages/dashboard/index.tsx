import { Avatar, Card, Col, Row } from 'antd';

import AngularLogo from '@/assets/team/angular.png';
import AntDesignLogo from '@/assets/team/ant-design.png';
import BootstrapLogo from '@/assets/team/bootstrap.png';
import ReactLogo from '@/assets/team/react.png';
import ViteLogo from '@/assets/team/vite.png';
import VueLogo from '@/assets/team/vue.png';
import UserLogo from '@/assets/user.png';
import Content from '@/components/content';
import Header from '@/components/header';
import { TEAM, TEAM_NAME_MAP, TEAM_PROJECT_NAME_MAP } from '@/constants/team';
import useAuthStore from '@/store/auth';

import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { IProject } from '@/typing/project';
import useProjectStore from '@/store/project';

const TEAM_AVATAR_MAP = {
  [TEAM.REACT]: ReactLogo,
  [TEAM.VUE]: VueLogo,
  [TEAM.ANGULAR]: AngularLogo,
  [TEAM.ANT_DESIGN]: AntDesignLogo,
  [TEAM.BOOTSTRAP]: BootstrapLogo,
  [TEAM.VITE_PRO]: ViteLogo,
};

const Dashboard = () => {
  const { profile } = useAuthStore();
  const [projects, setProjects] = useState<IProject[]>([]);
  const { getProjects } = useProjectStore();

  useEffect(() => {
    getProjects().then(setProjects);
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
