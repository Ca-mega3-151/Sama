import { equals } from 'ramda';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { Input, Switch } from '~/shared/ReactJS';
import { Field, useDeepCompareEffect } from '~/shared/ReactJS';
import { DeepPartial, FormMutationStateValues } from '~/shared/TypescriptUtilities';

export type BrandingStandardFormMutationValues = TypeOf<ReturnType<typeof getFormMutationSchema>>;
export type BrandingStandardFormMutationStateValues = FormMutationStateValues<BrandingStandardFormMutationValues>;

export interface BrandingStandardFormMutationProps {
  uid: string;
  isSubmiting: boolean;
  defaultValues: BrandingStandardFormMutationStateValues;
  fieldsError?: DeepPartial<Record<keyof BrandingStandardFormMutationValues, string>>;
  onSubmit?: (values: BrandingStandardFormMutationValues) => void;
  disabled?: boolean;
  statusUpdatable?: boolean;
}

export interface BrandingStandardFormMutationActions {
  isDirty: () => boolean;
}

export const BrandingStandardFormMutation = forwardRef<
  BrandingStandardFormMutationActions,
  BrandingStandardFormMutationProps
>((props, ref) => {
  const { uid, defaultValues, fieldsError = {}, isSubmiting, onSubmit, disabled, statusUpdatable = false } = props;

  const { t } = useTranslation(['common', 'branding_standard']);
  const disabledField = disabled || isSubmiting;

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
  } = useRemixForm<BrandingStandardFormMutationStateValues>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: console.log,
    },
    defaultValues: {
      ...defaultValues,
    },
    resolver: getFormMutationResolver(t),
  });
  const name = watch('name');
  const code = watch('code');
  const status = watch('status');

  useDeepCompareEffect(() => {
    Object.keys(fieldsError).forEach(key => {
      const key_ = key as keyof typeof fieldsError;
      if (fieldsError[key_]) {
        setError(key_, {
          message: fieldsError[key_],
        });
      }
    });
  }, [fieldsError]);

  useDeepCompareEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  useImperativeHandle(ref, () => {
    return {
      isDirty: () => !equals(defaultValues, getValues()),
    };
  }, [defaultValues, getValues]);

  return (
    <Form method="POST" id={uid} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <Field withRequiredMark label={t('branding_standard:code')} error={errors.code?.message}>
          <Input
            valueVariant="controlled-state"
            value={code}
            onChange={value => {
              setValue('code', value);
              if (errors.code) {
                trigger('code');
              }
            }}
            disabled={disabledField}
            placeholder={t('branding_standard:code')}
          />
        </Field>
        <Field withRequiredMark label={t('branding_standard:name')} error={errors.name?.message}>
          <Input
            valueVariant="controlled-state"
            value={name}
            onChange={value => {
              setValue('name', value);
              if (errors.name) {
                trigger('name');
              }
            }}
            disabled={disabledField}
            placeholder={t('branding_standard:name')}
          />
        </Field>
        <Field withRequiredMark label={t('branding_standard:active_status')} error={errors.status?.message}>
          <Switch
            valueVariant="controlled-state"
            disabled={statusUpdatable ? disabledField : true}
            checked={status === 'ACTIVE'}
            onChange={checked => {
              setValue('status', checked ? 'ACTIVE' : 'DEACTIVE');
              if (errors.status) {
                trigger('status');
              }
            }}
          />
        </Field>
      </div>
    </Form>
  );
});

BrandingStandardFormMutation.displayName = 'BrandingStandardFormMutation';
