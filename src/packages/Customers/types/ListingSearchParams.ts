import { customerLisitngUrlSearchParamsUtils } from '../utils/listingUrlSearchParams';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/overrides/RemixJS/types';

export type CustomerListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<
  typeof customerLisitngUrlSearchParamsUtils
>;
