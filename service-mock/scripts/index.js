import downloadGeoJSON from './download-geo.js';
import { mockTokenJson, mockUserProfileJson } from './user.js';
import { mockOngoingProjectJson } from './project.js';
import { mockTableListJson } from './list.js';

const mockJson = async () => {
  mockTokenJson();
  mockUserProfileJson();
  mockOngoingProjectJson();
  mockTableListJson();
  await Promise.allSettled([downloadGeoJSON()]);
};

mockJson();
