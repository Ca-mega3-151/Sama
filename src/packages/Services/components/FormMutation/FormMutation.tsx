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

export type ServiceFormMutationValues = TypeOf<ReturnType<typeof getFormMutationSchema>>;
export type ServiceFormMutationStateValues = FormMutationStateValues<ServiceFormMutationValues>;

export interface ServiceFormMutationProps {
  uid: string;
  isSubmiting: boolean;
  defaultValues: ServiceFormMutationStateValues;
  fieldsError?: DeepPartial<Record<keyof ServiceFormMutationValues, string>>;
  onSubmit?: (values: ServiceFormMutationValues) => void;
  disabled?: boolean;
  statusUpdatable?: boolean;
}

export interface ServiceFormMutationActions {
  isDirty: () => boolean;
}

export const ServiceFormMutation = forwardRef<ServiceFormMutationActions, ServiceFormMutationProps>((props, ref) => {
  const { uid, defaultValues, fieldsError = {}, isSubmiting, onSubmit, disabled } = props;

  const { t } = useTranslation(['common', 'service']);
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
  } = useRemixForm<ServiceFormMutationStateValues>({
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
  const description = watch('description');

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
        <Field withRequiredMark label={t('service:name')} error={errors.name?.message}>
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
            placeholder={t('service:name')}
          />
        </Field>
        <Field withRequiredMark label={t('service:description')} error={errors.description?.message}>
          <Input
            valueVariant="controlled-state"
            value={description}
            onChange={value => {
              setValue('description', value);
              if (errors.description) {
                trigger('description');
              }
            }}
            disabled={disabledField}
            placeholder={t('service:description')}
          />
        </Field>
      </div>
    </Form>
  );
});

ServiceFormMutation.displayName = 'ServiceFormMutation';
