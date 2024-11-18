import { useMemo } from 'react';
import { Classes } from '../../models/Classes';
import { ClassesModelToDefaultValuesOfFormMutation } from '../../utils/ClassesModelToDefaultValuesOfFormMutation';
import { ClassesFormMutation } from '../FormMutation/FormMutation';

interface Props {
  classes: Classes;
}

export const BrandingStandardDetail = ({ classes }: Props) => {
  const defaultValues = useMemo(() => {
    return ClassesModelToDefaultValuesOfFormMutation({ classes });
  }, [classes]);

  return <ClassesFormMutation isSubmiting={false} uid="" disabled defaultValues={defaultValues} />;
};
