import { number, object, string, enum as enum_ } from 'zod';
import { RecordsPerPage } from '../../../services/constants/RecordsPerPage';
import { UrlSearchParamsUtils } from '~/shared/Utilities';

export const brandingStandardLisitngUrlSearchParamsSchema = object({
  page: number().optional(),
  search: string().optional(),
  pageSize: number().optional().default(RecordsPerPage),
  status: enum_(['ACTIVE', 'DEACTIVE']).optional(),
});

export const brandingStandardLisitngUrlSearchParamsUtils = new UrlSearchParamsUtils({
  zodSchema: brandingStandardLisitngUrlSearchParamsSchema,
});
