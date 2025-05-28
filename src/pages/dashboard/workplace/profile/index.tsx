import { Statistic } from 'antd';
import { memo } from 'react';

import UserLogo from '@/assets/user.png';
import Header from '@/components/header';
import useAuthStore from '@/store/auth';

import styles from './index.module.less';

const WorkplaceProfile = () => {
  const { profile } = useAuthStore();

  if (!profile) {
    return null;
  }

  return (
    <Header title="工作台">
      <div className={styles.profile}>
        <img className={styles.userLogo} src={UserLogo} />
        <div className={styles.userContent}>
          <div className={styles.title}>早安，{profile.username}，祝你开心每一天！</div>
          <div>
            {profile.position} | {profile.department}
          </div>
        </div>
      </div>
      <div className={styles.statistics}>
        <Statistic title="项目数" value={profile.projectCount} />
        <Statistic title="团队内排名" value={profile.teamRanking} suffix={`/ ${profile.teamTotal}`} />
        <Statistic title="项目访问" value={profile.projectVisitCount} />
      </div>
    </Header>
  );
};

export default memo(WorkplaceProfile);
