import { serviceLisitngUrlSearchParamsUtils } from '../utils/listingUrlSearchParams';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/overrides/RemixJS/types';

export type ServiceListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<
  typeof serviceLisitngUrlSearchParamsUtils
>;
