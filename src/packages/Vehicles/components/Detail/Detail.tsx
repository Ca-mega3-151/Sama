import { useMemo } from 'react';
import { Vehicles } from '../../models/Vehicles';
import { VehiclesModelToDefaultValuesOfFormMutation } from '../../utils/VehiclesModelToDefaultValuesOfFormMutation';
import { VehiclesFormMutation } from '../FormMutation/FormMutation';

interface Props {
  vehicles: Vehicles;
}

export const BrandingStandardDetail = ({ vehicles }: Props) => {
  const defaultValues = useMemo(() => {
    return VehiclesModelToDefaultValuesOfFormMutation({ vehicles });
  }, [vehicles]);

  return <VehiclesFormMutation isSubmiting={false} uid="" disabled defaultValues={defaultValues} />;
};
