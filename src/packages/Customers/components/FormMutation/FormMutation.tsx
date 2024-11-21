import { equals } from 'ramda';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { Input } from '~/shared/ReactJS';
import { Field, useDeepCompareEffect } from '~/shared/ReactJS';
import { DeepPartial, FormMutationStateValues } from '~/shared/TypescriptUtilities';

export type CustomerFormMutationValues = TypeOf<ReturnType<typeof getFormMutationSchema>>;
export type CustomerFormMutationStateValues = FormMutationStateValues<CustomerFormMutationValues>;

export interface CustomerFormMutationProps {
  uid: string;
  isSubmiting: boolean;
  defaultValues: CustomerFormMutationStateValues;
  fieldsError?: DeepPartial<Record<keyof CustomerFormMutationValues, string>>;
  onSubmit?: (values: CustomerFormMutationValues) => void;
  disabled?: boolean;
  statusUpdatable?: boolean;
}

export interface CustomerFormMutationActions {
  isDirty: () => boolean;
}

export const CustomerFormMutation = forwardRef<CustomerFormMutationActions, CustomerFormMutationProps>((props, ref) => {
  const { uid, defaultValues, fieldsError = {}, isSubmiting, onSubmit, disabled } = props;

  const { t } = useTranslation(['common', 'customer']);
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
  } = useRemixForm<CustomerFormMutationStateValues>({
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
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const phone = watch('phone');
  const address = watch('address');

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
      <div className="grid grid-cols-2 gap-3">
        <Field withRequiredMark label={t('customer:firstName')} error={errors.firstName?.message}>
          <Input
            valueVariant="controlled-state"
            value={firstName}
            onChange={value => {
              setValue('firstName', value);
              if (errors.firstName) {
                trigger('firstName');
              }
            }}
            disabled={disabledField}
            placeholder={t('customer:firstName')}
          />
        </Field>
        <Field withRequiredMark label={t('customer:lastName')} error={errors.lastName?.message}>
          <Input
            valueVariant="controlled-state"
            value={lastName}
            onChange={value => {
              setValue('lastName', value);
              if (errors.lastName) {
                trigger('lastName');
              }
            }}
            disabled={disabledField}
            placeholder={t('customer:lastName')}
          />
        </Field>
        <Field withRequiredMark label={t('customer:email')} error={errors.email?.message}>
          <Input
            valueVariant="controlled-state"
            value={email}
            onChange={value => {
              setValue('email', value);
              if (errors.email) {
                trigger('email');
              }
            }}
            disabled={disabledField}
            placeholder={t('customer:email')}
          />
        </Field>
        <Field withRequiredMark label={t('customer:phone')} error={errors.phone?.message}>
          <Input
            valueVariant="controlled-state"
            value={phone}
            onChange={value => {
              setValue('phone', value);
              if (errors.phone) {
                trigger('phone');
              }
            }}
            disabled={disabledField}
            placeholder={t('customer:phone')}
          />
        </Field>
        <Field withRequiredMark label={t('customer:address')} error={errors.address?.message}>
          <Input
            valueVariant="controlled-state"
            value={address}
            onChange={value => {
              setValue('address', value);
              if (errors.address) {
                trigger('address');
              }
            }}
            disabled={disabledField}
            placeholder={t('customer:address')}
          />
        </Field>
      </div>
    </Form>
  );
});

CustomerFormMutation.displayName = 'CustomerFormMutation';
