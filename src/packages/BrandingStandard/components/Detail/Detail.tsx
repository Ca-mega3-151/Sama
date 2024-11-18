import { useMemo } from 'react';
import { BrandingStandard } from '../../models/BrandingStandard';
import { brandingStandardModelToDefaultValuesOfFormMutation } from '../../utils/brandingModelToDefaultValuesOfFormMutation';
import { BrandingStandardFormMutation } from '../FormMutation/FormMutation';

interface Props {
  brandingStandard: BrandingStandard;
}

export const BrandingStandardDetail = ({ brandingStandard }: Props) => {
  const defaultValues = useMemo(() => {
    return brandingStandardModelToDefaultValuesOfFormMutation({ brandingStandard });
  }, [brandingStandard]);

  return <BrandingStandardFormMutation isSubmiting={false} uid="" disabled defaultValues={defaultValues} />;
};
