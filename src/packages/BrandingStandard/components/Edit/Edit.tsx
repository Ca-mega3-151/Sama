import { forwardRef, useMemo } from 'react';
import {
  BrandingFormMutation,
  BrandingFormMutationActions,
  BrandingFormMutationValues,
} from '~/packages/Branding/components/FormMutation/FormMutation';
import { Branding } from '~/packages/Branding/models/Branding';
import { brandingModelToDefaultValuesOfFormMutation } from '~/packages/Branding/utils/brandingModelToDefaultValuesOfFormMutation';

interface Props {
  branding: Branding;
  uid: string;
  isSubmiting: boolean;
  fieldsError?: Partial<Record<keyof BrandingFormMutationValues, string>>;
  onSubmit?: (values: BrandingFormMutationValues) => void;
  disabled?: boolean;
}

export const BrandingEdit = forwardRef<BrandingFormMutationActions, Props>(({ branding, ...formProps }, ref) => {
  const defaultValues = useMemo(() => {
    return brandingModelToDefaultValuesOfFormMutation({ branding });
  }, [branding]);

  return <BrandingFormMutation {...formProps} ref={ref} defaultValues={defaultValues} />;
});

BrandingEdit.displayName = 'BrandingEdit';
