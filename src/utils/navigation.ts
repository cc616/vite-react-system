import { IRoute } from '@/routes';

export const getAllFlattenRoutes = (routes: IRoute[]): IRoute[] => {
  return routes.reduce((prev, curr) => {
    const child = getAllFlattenRoutes(curr.children || []);
    return [...prev, curr, ...child];
  }, [] as IRoute[]);
};
