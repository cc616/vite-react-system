import { faker, simpleFaker } from '@faker-js/faker';

export const getTableList = (req) => {
  const { page = 1, pageSize = 10 } = req.query;
  const data = [];
  for (let i = 0; i < 100; i += 1) {
    data.push({
      id: simpleFaker.string.uuid(),
      name: faker.person.fullName(),
      description: faker.lorem.sentence(),
      startDate: faker.date.past().getTime(),
      endDate: faker.date.future().getTime(),
      status: Math.random() > 0.5 ? 'PUBLISH' : 'UNPUBLISHED',
    });
  }
  const currentPageData = data.slice((page - 1) * pageSize, page * pageSize);
  return {
    total: data.length,
    list: currentPageData,
  };
};

export default getTableList;
