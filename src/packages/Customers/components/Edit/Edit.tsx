import { forwardRef, useMemo } from 'react';
import { Customers } from '../../models/Customers';
import { CustomerModelToDefaultValuesOfFormMutation } from '../../utils/CustomerModelToDefaultValuesOfFormMutation';
import {
  CustomerFormMutation,
  CustomerFormMutationActions,
  CustomerFormMutationValues,
} from '../FormMutation/FormMutation';

interface Props {
  customer: Customers;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof CustomerFormMutationValues, string>>;
  onSubmit?: (values: CustomerFormMutationValues) => void;
  disabled?: boolean;
}

export const CustomerEdit = forwardRef<CustomerFormMutationActions, Props>(({ customer, ...formProps }, ref) => {
  const defaultValues = useMemo(() => {
    return CustomerModelToDefaultValuesOfFormMutation({ customer });
  }, [customer]);

  return <CustomerFormMutation {...formProps} ref={ref} defaultValues={defaultValues} />;
});

CustomerEdit.displayName = 'CustomerEdit';
