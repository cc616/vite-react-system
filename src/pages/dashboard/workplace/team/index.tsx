import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Col, Row, Skeleton } from 'antd';
import { memo } from 'react';

import AngularLogo from '@/assets/team/angular.png';
import AntDesignLogo from '@/assets/team/ant-design.png';
import BootstrapLogo from '@/assets/team/bootstrap.png';
import ReactLogo from '@/assets/team/react.png';
import ViteLogo from '@/assets/team/vite.png';
import VueLogo from '@/assets/team/vue.png';
import { TEAM, TEAM_NAME_MAP, TEAM_PROJECT_NAME_MAP } from '@/constants/team';
import useProjectStore from '@/store/project';

import styles from './index.module.less';

const TEAM_AVATAR_MAP = {
  [TEAM.REACT]: ReactLogo,
  [TEAM.VUE]: VueLogo,
  [TEAM.ANGULAR]: AngularLogo,
  [TEAM.ANT_DESIGN]: AntDesignLogo,
  [TEAM.BOOTSTRAP]: BootstrapLogo,
  [TEAM.VITE_PRO]: ViteLogo,
};

const WorkplaceOngoingProject = () => {
  const { getProjects } = useProjectStore();

  const { data, isFetching } = useQuery({
    queryKey: ['project'],
    queryFn: getProjects,
    initialData: [],
  });
  return (
    <Card title="进行中的项目">
      {isFetching ? (
        <Skeleton active />
      ) : (
        data.map((item) => (
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
        ))
      )}
    </Card>
  );
};

export const WorkplaceTeam = () => {
  return (
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
  );
};

export default memo(WorkplaceOngoingProject);
