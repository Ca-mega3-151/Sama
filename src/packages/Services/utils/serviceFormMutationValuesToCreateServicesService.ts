import { ServiceFormMutationValues } from '../components/FormMutation/FormMutation';
import { CreateService } from '../services/createService';

export const serviceFormMutationValuesToCreateServicesService = (
  values: ServiceFormMutationValues,
): CreateService['data'] => {
  return {
    name: values.name,
    description: values.description,
  };
};
