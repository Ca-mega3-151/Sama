import { useMemo } from 'react';
import { Vehicles } from '../../models/Vehicles';
import { VehiclesModelToDefaultValuesOfFormMutation } from '../../utils/VehiclesModelToDefaultValuesOfFormMutation';
import { VehicleFormMutation } from '../FormMutation/Formmutation';

interface Props {
  vehicles: Vehicles;
}

export const BrandingStandardDetail = ({ vehicles }: Props) => {
  const defaultValues = useMemo(() => {
    return VehiclesModelToDefaultValuesOfFormMutation({ vehicles });
  }, [vehicles]);

  return <VehicleFormMutation vehicles={vehicles} isSubmiting={false} uid="" disabled defaultValues={defaultValues} />;
};
