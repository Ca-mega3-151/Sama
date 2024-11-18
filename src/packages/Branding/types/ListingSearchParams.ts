import { brandingLisitngUrlSearchParamsUtils } from '../utils/listingUrlSearchParams';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/overrides/RemixJS/types';

export type BrandingListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<
  typeof brandingLisitngUrlSearchParamsUtils
>;
