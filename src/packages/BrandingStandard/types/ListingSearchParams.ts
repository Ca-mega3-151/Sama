import { brandingStandardLisitngUrlSearchParamsUtils } from '../utils/listingUrlSearchParams';
import { GetTypeOfSearchParamsFromUrlParamsUtils } from '~/overrides/RemixJS/types';

export type BrandingStandardListingSearchParams = GetTypeOfSearchParamsFromUrlParamsUtils<
  typeof brandingStandardLisitngUrlSearchParamsUtils
>;
