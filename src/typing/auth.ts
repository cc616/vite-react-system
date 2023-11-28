import { ROLE } from '@/constants/auth';

export interface ILogin {
  username: string;
  password: string;
}

export interface IProfile {
  id: string;
  username: string;
  role: ROLE;
  position: string;
}
