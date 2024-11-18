import { BrandingStandardFormMutationProps } from '../components/FormMutation/FormMutation';
import { BrandingStandard } from '../models/BrandingStandard';

interface BrandingStandardModelToDefaultValuesOfFormMutation {
  brandingStandard: BrandingStandard | undefined;
}

export const brandingStandardModelToDefaultValuesOfFormMutation = ({
  brandingStandard,
}: BrandingStandardModelToDefaultValuesOfFormMutation): BrandingStandardFormMutationProps['defaultValues'] => {
  if (!brandingStandard) {
    return {
      status: 'ACTIVE',
      name: undefined,
      code: undefined,
    };
  }

  return {
    status: brandingStandard.status,
    code: brandingStandard.brandingCode,
    name: brandingStandard.brandingName,
  };
};
