import { getOngoingProjects } from '../project/index.js';
import { toMockJson } from '../utils/helper.js';

export const mockOngoingProjectJson = () => {
  const ongoingList = getOngoingProjects();
  toMockJson(ongoingList, '/project/ongoing.json');
};
