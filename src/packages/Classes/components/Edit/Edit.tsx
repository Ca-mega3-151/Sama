import { forwardRef, useMemo } from 'react';
import { Classes } from '../../models/Classes';
import { ClassesModelToDefaultValuesOfFormMutation } from '../../utils/ClassesModelToDefaultValuesOfFormMutation';
import {
  ClassesFormMutation,
  ClassesFormMutationActions,
  ClassesFormMutationValues,
} from '../FormMutation/FormMutation';

interface Props {
  classes: Classes;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof ClassesFormMutationValues, string>>;
  onSubmit?: (values: ClassesFormMutationValues) => void;
  disabled?: boolean;
}

export const ClassesEdit = forwardRef<ClassesFormMutationActions, Props>(({ classes, ...formProps }, ref) => {
  const defaultValues = useMemo(() => {
    return ClassesModelToDefaultValuesOfFormMutation({ classes });
  }, [classes]);

  return <ClassesFormMutation {...formProps} ref={ref} defaultValues={defaultValues} />;
});

ClassesEdit.displayName = 'ClassesEdit';
