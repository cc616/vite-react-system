import { ROLE } from '@/constants/auth';

export interface ILogin {
  username: string;
  password: string;
}

export interface IProfile {
  username: string;
  roles: ROLE[];
}
