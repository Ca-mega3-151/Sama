import { useMemo } from 'react';
import { BrandingFormMutation } from '~/packages/Branding/components/FormMutation/FormMutation';
import { Branding } from '~/packages/Branding/models/Branding';
import { brandingModelToDefaultValuesOfFormMutation } from '~/packages/Branding/utils/brandingModelToDefaultValuesOfFormMutation';

interface Props {
  branding: Branding;
}

export const BrandingDetail = ({ branding }: Props) => {
  const defaultValues = useMemo(() => {
    return brandingModelToDefaultValuesOfFormMutation({ branding });
  }, [branding]);

  return <BrandingFormMutation isSubmiting={false} uid="" disabled defaultValues={defaultValues} />;
};
