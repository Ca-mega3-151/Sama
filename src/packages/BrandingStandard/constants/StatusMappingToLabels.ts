import { TFunction } from 'i18next';
import { BrandingStandard } from '../models/BrandingStandard';

export const getStatusMappingToLabels = (
  t: TFunction<['common', 'branding_standard']>,
): Record<BrandingStandard['status'], string> => {
  return {
    ACTIVE: t('branding_standard:active'),
    DEACTIVE: t('branding_standard:deactive'),
  };
};
