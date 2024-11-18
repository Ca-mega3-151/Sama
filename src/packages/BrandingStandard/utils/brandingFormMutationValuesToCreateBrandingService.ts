import { BrandingStandardFormMutationValues } from '../components/FormMutation/FormMutation';
import { CreateBrandingStandard } from '../services/createBrandingStandard';

export const brandingStandardFormMutationValuesToCreateBrandingService = (
  values: BrandingStandardFormMutationValues,
): CreateBrandingStandard['data'] => {
  return {
    brandingCode: values.code,
    brandingName: values.name,
    status: values.status,
  };
};
