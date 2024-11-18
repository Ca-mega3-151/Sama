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

export type ClassesFormMutationValues = TypeOf<ReturnType<typeof getFormMutationSchema>>;
export type ClassesFormMutationStateValues = FormMutationStateValues<ClassesFormMutationValues>;

export interface ClassesFormMutationProps {
  uid: string;
  isSubmiting: boolean;
  defaultValues: ClassesFormMutationStateValues;
  fieldsError?: DeepPartial<Record<keyof ClassesFormMutationValues, string>>;
  onSubmit?: (values: ClassesFormMutationValues) => void;
  disabled?: boolean;
  statusUpdatable?: boolean;
}

export interface ClassesFormMutationActions {
  isDirty: () => boolean;
}

export const ClassesFormMutation = forwardRef<ClassesFormMutationActions, ClassesFormMutationProps>((props, ref) => {
  const { uid, defaultValues, fieldsError = {}, isSubmiting, onSubmit, disabled } = props;

  const { t } = useTranslation(['common', 'classes']);
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
  } = useRemixForm<ClassesFormMutationStateValues>({
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
        <Field withRequiredMark label={t('classes:name')} error={errors.name?.message}>
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
            placeholder={t('classes:name')}
          />
        </Field>
        <Field withRequiredMark label={t('classes:code')} error={errors.code?.message}>
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
            placeholder={t('classes:code')}
          />
        </Field>
      </div>
    </Form>
  );
});

ClassesFormMutation.displayName = 'BrandingStandardFormMutation';
