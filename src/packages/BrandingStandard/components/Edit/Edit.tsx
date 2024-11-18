import { forwardRef, useMemo } from 'react';
import { BrandingStandard } from '../../models/BrandingStandard';
import { brandingStandardModelToDefaultValuesOfFormMutation } from '../../utils/brandingModelToDefaultValuesOfFormMutation';
import {
  BrandingStandardFormMutation,
  BrandingStandardFormMutationActions,
  BrandingStandardFormMutationValues,
} from '../FormMutation/FormMutation';

interface Props {
  brandingStandard: BrandingStandard;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof BrandingStandardFormMutationValues, string>>;
  onSubmit?: (values: BrandingStandardFormMutationValues) => void;
  disabled?: boolean;
}

export const BrandingStandardEdit = forwardRef<BrandingStandardFormMutationActions, Props>(
  ({ brandingStandard, ...formProps }, ref) => {
    const defaultValues = useMemo(() => {
      return brandingStandardModelToDefaultValuesOfFormMutation({ brandingStandard });
    }, [brandingStandard]);

    return <BrandingStandardFormMutation {...formProps} ref={ref} defaultValues={defaultValues} />;
  },
);

BrandingStandardEdit.displayName = 'BrandingStandardEdit';
