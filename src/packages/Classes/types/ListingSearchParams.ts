import { classesLisitngUrlSearchParamsUtils } from '../utils/listingUrlSearchParams';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/overrides/RemixJS/types';

export type ClassesListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<
  typeof classesLisitngUrlSearchParamsUtils
>;
