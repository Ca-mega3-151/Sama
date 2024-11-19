import { CustomerFormMutationProps } from '../components/FormMutation/FormMutation';
import { Customers } from '../models/Customers';

interface CustomerModelToDefaultValuesOfFormMutation {
  customer: Customers | undefined;
}

export const CustomerModelToDefaultValuesOfFormMutation = ({
  customer,
}: CustomerModelToDefaultValuesOfFormMutation): CustomerFormMutationProps['defaultValues'] => {
  if (!customer) {
    return {
      firstName: undefined,
      lastName: undefined,
      phone: undefined,
      email: undefined,
      address: undefined,
    };
  }

  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
  };
};
