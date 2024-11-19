import { forwardRef, useMemo } from 'react';
import { Services } from '../../models/Services';
import { ServicesModelToDefaultValuesOfFormMutation } from '../../utils/ServiceModelToDefaultValuesOfFormMutation';
import {
  ServiceFormMutation,
  ServiceFormMutationActions,
  ServiceFormMutationValues,
} from '../FormMutation/FormMutation';

interface Props {
  service: Services;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof ServiceFormMutationValues, string>>;
  onSubmit?: (values: ServiceFormMutationValues) => void;
  disabled?: boolean;
}

export const ServiceEdit = forwardRef<ServiceFormMutationActions, Props>(({ service, ...formProps }, ref) => {
  const defaultValues = useMemo(() => {
    return ServicesModelToDefaultValuesOfFormMutation({ service });
  }, [service]);

  return <ServiceFormMutation {...formProps} ref={ref} defaultValues={defaultValues} />;
});

ServiceEdit.displayName = 'ServiceEdit';
