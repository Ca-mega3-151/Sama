import { ClassesFormMutationProps } from '../components/FormMutation/FormMutation';
import { Classes } from '../models/Classes';

interface ClassesModelToDefaultValuesOfFormMutation {
  classes: Classes | undefined;
}

export const ClassesModelToDefaultValuesOfFormMutation = ({
  classes,
}: ClassesModelToDefaultValuesOfFormMutation): ClassesFormMutationProps['defaultValues'] => {
  if (!classes) {
    return {
      name: undefined,
      code: undefined,
    };
  }

  return {
    code: classes.code,
    name: classes.name,
  };
};
