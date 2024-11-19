import { ServiceFormMutationProps } from '../components/FormMutation/FormMutation';
import { Services } from '../models/Services';

interface ServicesModelToDefaultValuesOfFormMutation {
  service: Services | undefined;
}

export const ServicesModelToDefaultValuesOfFormMutation = ({
  service,
}: ServicesModelToDefaultValuesOfFormMutation): ServiceFormMutationProps['defaultValues'] => {
  if (!service) {
    return {
      name: undefined,
      description: undefined,
    };
  }

  return {
    description: service.description,
    name: service.name,
  };
};
