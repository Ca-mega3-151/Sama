import { vehiclesLisitngUrlSearchParamsUtils } from '../utils/listingUrlSearchParams';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/overrides/RemixJS/types';

export type VehiclesListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<
  typeof vehiclesLisitngUrlSearchParamsUtils
>;
