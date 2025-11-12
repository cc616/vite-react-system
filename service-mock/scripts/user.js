import { createToken, getUserProfile } from '../user/index.js';
import { toMockJson } from '../utils/helper.js';

export const mockTokenJson = () => {
  const token = createToken();
  toMockJson(token, '/user/login.json');
};

export const mockUserProfileJson = () => {
  const profile = getUserProfile();
  toMockJson(profile, '/user/profile.json');
};
