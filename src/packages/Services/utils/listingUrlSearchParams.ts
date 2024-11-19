import { number, object, string, enum as enum_ } from 'zod';
import { RecordsPerPage } from '../../../services/constants/RecordsPerPage';
import { UrlSearchParamsUtils } from '~/shared/Utilities';

export const serviceLisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: string().optional(),
  pageSize: number().optional().default(RecordsPerPage),
  status: enum_(['ACTIVE', 'DEACTIVE']).optional(),
  name: enum_(['descend', 'ascend']).optional(),
});

export const serviceLisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: serviceLisitngUrlSearchParamsSchema,
});
