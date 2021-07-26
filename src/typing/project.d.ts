import { TEAM } from '@/constants/team';

export interface IProject {
  id: string;
  team: TEAM;
  description: string;
  publishedAt: string;
}
