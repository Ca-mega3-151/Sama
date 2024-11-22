import { forwardRef, useMemo } from 'react';
import { Vehicles } from '../../models/Vehicles';
import { VehiclesModelToDefaultValuesOfFormMutation } from '../../utils/VehiclesModelToDefaultValuesOfFormMutation';
import {
  VehicleFormMutation,
  VehicleFormMutationActions,
  VehicleFormMutationValues,
} from '../FormMutation/Formmutation';

interface Props {
  vehicles: Vehicles;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof VehicleFormMutationValues, string>>;
  onSubmit?: (values: VehicleFormMutationValues) => void;
  disabled?: boolean;
}

export const VehiclesEdit = forwardRef<VehicleFormMutationActions, Props>(({ vehicles, ...formProps }, ref) => {
  const defaultValues = useMemo(() => {
    return VehiclesModelToDefaultValuesOfFormMutation({ vehicles });
  }, [vehicles]);

  return <VehicleFormMutation vehicles={vehicles} {...formProps} ref={ref} defaultValues={defaultValues} />;
});

VehiclesEdit.displayName = 'VehiclesEdit';
