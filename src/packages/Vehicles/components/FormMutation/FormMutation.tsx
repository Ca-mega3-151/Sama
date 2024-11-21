import { DatePicker } from 'antd';
import { equals } from 'ramda';
import { forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { Input } from '~/shared/ReactJS';
import { Field, useDeepCompareEffect } from '~/shared/ReactJS';
import { DeepPartial, FormMutationStateValues } from '~/shared/TypescriptUtilities';

export type VehiclesFormMutationValues = TypeOf<ReturnType<typeof getFormMutationSchema>>;
export type VehiclesFormMutationStateValues = FormMutationStateValues<VehiclesFormMutationValues>;
const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export interface VehiclesFormMutationProps {
  uid: string;
  isSubmiting: boolean;
  defaultValues: VehiclesFormMutationStateValues;
  fieldsError?: DeepPartial<Record<keyof VehiclesFormMutationValues, string>>;
  onSubmit?: (values: VehiclesFormMutationValues) => void;
  disabled?: boolean;
  statusUpdatable?: boolean;
}

export interface VehiclesFormMutationActions {
  isDirty: () => boolean;
}

export const VehiclesFormMutation = forwardRef<VehiclesFormMutationActions, VehiclesFormMutationProps>((props, ref) => {
  const { uid, defaultValues, fieldsError = {}, isSubmiting, onSubmit, disabled } = props;

  const { t } = useTranslation(['common', 'vehicles']);
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
  } = useRemixForm<VehiclesFormMutationStateValues>({
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

  const registrationNumber = watch('registrationNumber');
  const vehicleBrand = watch('vehicleBrand');
  const vehicleModel = watch('vehicleModel');
  const service = watch('service');

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
      <div className="grid h-full grid-cols-2 gap-5">
        <div>
          <Field withRequiredMark label={t('vehicles:registrationNumber')} error={errors.registrationNumber?.message}>
            <Input
              valueVariant="controlled-state"
              value={registrationNumber}
              onChange={value => {
                setValue('registrationNumber', value);
                if (errors.registrationNumber) {
                  trigger('registrationNumber');
                }
              }}
              disabled={disabledField}
              placeholder={t('vehicles:registrationNumber')}
            />
          </Field>
          <div className="flex gap-5">
            <div className="w-1/2">
              <Field withRequiredMark label={t('vehicles:vehicleModel')} error={errors.vehicleModel?.message}>
                <Input
                  valueVariant="controlled-state"
                  value={vehicleModel}
                  onChange={value => {
                    setValue('vehicleModel', value);
                    if (errors.vehicleModel) {
                      trigger('vehicleModel');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('vehicles:vehicleModel')}
                />
              </Field>
              <Field withRequiredMark label={t('vehicles:RegistrationDate')} error={errors.registrationDate?.message}>
                {/* <Input
                  valueVariant="controlled-state"
                  value={registrationNumber}
                  onChange={value => {
                    setValue('registrationNumber', value);
                    if (errors.registrationNumber) {
                      trigger('registrationNumber');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('vehicles:registrationNumber')}
                /> */}
                <DatePicker onChange={onChange} needConfirm className="w-full" />
              </Field>
            </div>
            <div className="w-1/2">
              <Field withRequiredMark label={t('vehicles:ManufactureDate')} error={errors.manufacturerDate?.message}>
                {/* <Input
                  valueVariant="controlled-state"
                  value={registrationNumber}
                  onChange={value => {
                    setValue('registrationNumber', value);
                    if (errors.registrationNumber) {
                      trigger('registrationNumber');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('vehicles:registrationNumber')}
                /> */}
                <DatePicker onChange={onChange} needConfirm className="w-full" />
              </Field>
              <Field
                withRequiredMark
                label={t('vehicles:FirstCirculationDate')}
                error={errors.firstcirculationDate?.message}
              >
                {/* <Input
                  valueVariant="controlled-state"
                  value={registrationNumber}
                  onChange={value => {
                    setValue('registrationNumber', value);
                    if (errors.registrationNumber) {
                      trigger('registrationNumber');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('vehicles:registrationNumber')}
                /> */}
                <DatePicker onChange={onChange} needConfirm className="w-full" />
              </Field>
            </div>
          </div>
        </div>
        <div>
          <Field withRequiredMark label={t('vehicles:vehicleBrand')} error={errors.vehicleBrand?.message}>
            <Input
              valueVariant="controlled-state"
              value={vehicleBrand}
              onChange={value => {
                setValue('vehicleBrand', value);
                if (errors.vehicleBrand) {
                  trigger('vehicleBrand');
                }
              }}
              disabled={disabledField}
              placeholder={t('vehicles:vehicleBrand')}
            />
          </Field>
          <Field withRequiredMark label={t('vehicles:service')} error={errors.service?.message}>
            <Input
              valueVariant="controlled-state"
              value={service}
              onChange={value => {
                setValue('service', value);
                if (errors.service) {
                  trigger('service');
                }
              }}
              disabled={disabledField}
              placeholder={t('vehicles:service')}
            />
          </Field>
          <div className="flex gap-5">
            <div className="w-1/2">
              <Field
                withRequiredMark
                label={t('vehicles:ExpiryTechnicalVisitDate')}
                error={errors.expiryTechnicalVisitDate?.message}
              >
                {/* <Input
                  valueVariant="controlled-state"
                  value={service}
                  onChange={value => {
                    setValue('service', value);
                    if (errors.service) {
                      trigger('service');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('vehicles:service')}
                /> */}
                <DatePicker onChange={onChange} needConfirm className="w-full" />
              </Field>
            </div>
            <div className="w-1/2">
              <Field
                withRequiredMark
                label={t('vehicles:InsuranceExpiryDate')}
                error={errors.insuranceExpiryDate?.message}
              >
                {/* <Input
                  valueVariant="controlled-state"
                  value={vehicleBrand}
                  onChange={value => {
                    setValue('vehicleBrand', value);
                    if (errors.vehicleBrand) {
                      trigger('vehicleBrand');
                    }
                  }}
                  disabled={disabledField}
                  placeholder={t('vehicles:vehicleBrand')}
                /> */}
                <DatePicker width={500} onChange={onChange} needConfirm className="w-full" />
              </Field>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
});

VehiclesFormMutation.displayName = 'VehiclesFormMutation';
