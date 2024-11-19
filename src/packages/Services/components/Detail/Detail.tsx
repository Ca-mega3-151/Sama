import { useMemo } from 'react';
import { Services } from '../../models/Services';
import { ServicesModelToDefaultValuesOfFormMutation } from '../../utils/ServiceModelToDefaultValuesOfFormMutation';
import { ServiceFormMutation } from '../FormMutation/FormMutation';

interface Props {
  service: Services;
}

export const BrandingStandardDetail = ({ service }: Props) => {
  const defaultValues = useMemo(() => {
    return ServicesModelToDefaultValuesOfFormMutation({ service });
  }, [service]);

  return <ServiceFormMutation isSubmiting={false} uid="" disabled defaultValues={defaultValues} />;
};
