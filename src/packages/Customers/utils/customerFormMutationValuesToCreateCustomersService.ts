import { CustomerFormMutationValues } from '../components/FormMutation/FormMutation';
import { CreateCustomer } from '../services/createCustomer';

export const customerFormMutationValuesToCreateCustomersService = (
  values: CustomerFormMutationValues,
): CreateCustomer['data'] => {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    email: values.email,
    address: values.address,
  };
};
