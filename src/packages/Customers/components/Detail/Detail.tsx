import { useMemo } from 'react';
import { Customers } from '../../models/Customers';
import { CustomerModelToDefaultValuesOfFormMutation } from '../../utils/CustomerModelToDefaultValuesOfFormMutation';
import { CustomerFormMutation } from '../FormMutation/FormMutation';

interface Props {
  customer: Customers;
}

export const CustomerDetail = ({ customer }: Props) => {
  const defaultValues = useMemo(() => {
    return CustomerModelToDefaultValuesOfFormMutation({ customer });
  }, [customer]);

  return <CustomerFormMutation isSubmiting={false} uid="" disabled defaultValues={defaultValues} />;
};
