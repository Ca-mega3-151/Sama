import { ClassesFormMutationValues } from '../components/FormMutation/FormMutation';
import { CreateClasses } from '../services/CreateClasses';

export const classesFormMutationValuesToCreateClassesService = (
  values: ClassesFormMutationValues,
): CreateClasses['data'] => {
  return {
    name: values.name,
    code: values.code,
  };
};
