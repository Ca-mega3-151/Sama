import { forwardRef, useMemo } from 'react';
import { Vehicles } from '../../models/Vehicles';
import { VehiclesModelToDefaultValuesOfFormMutation } from '../../utils/VehiclesModelToDefaultValuesOfFormMutation';
import {
  VehiclesFormMutation,
  VehiclesFormMutationActions,
  VehiclesFormMutationValues,
} from '../FormMutation/FormMutation';

interface Props {
  vehicles: Vehicles;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof VehiclesFormMutationValues, string>>;
  onSubmit?: (values: VehiclesFormMutationValues) => void;
  disabled?: boolean;
}

export const VehiclesEdit = forwardRef<VehiclesFormMutationActions, Props>(({ vehicles, ...formProps }, ref) => {
  const defaultValues = useMemo(() => {
    return VehiclesModelToDefaultValuesOfFormMutation({ vehicles });
  }, [vehicles]);

  return <VehiclesFormMutation {...formProps} ref={ref} defaultValues={defaultValues} />;
});

VehiclesEdit.displayName = 'VehiclesEdit';
