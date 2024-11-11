import { BrandingStandard } from '../models/BrandingStandard';
import { TagProps } from '~/shared/ReactJS';

export const StatusMappingToTagColor: Record<BrandingStandard['status'], TagProps['color']> = {
  ACTIVE: 'success',
  DEACTIVE: 'error',
};
