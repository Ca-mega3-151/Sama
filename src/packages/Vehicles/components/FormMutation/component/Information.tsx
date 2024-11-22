import { DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import { VehicleFormMutationStateValues } from '../Formmutation';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { SelectServices } from '~/packages/Services/components/SelectVariants/SelectServices';
import { Vehicles } from '~/packages/Vehicles/models/Vehicles';
import { Field, Input } from '~/shared/ReactJS';

interface Props {
  form: ReturnType<typeof useRemixForm<VehicleFormMutationStateValues>>;
  disabledField: boolean;
  isEdit: boolean;
  vehicles: Vehicles | undefined;
}
const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export const VehicleIfnormation = ({ form, disabledField }: Props) => {
  const { t } = useTranslation(['common', 'vehicles']);

  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = form;

  const registrationNumber = watch('vehicleInformation.registrationNumber');
  const vehicleBrand = watch('vehicleInformation.vehicleBrand');
  const vehicleModel = watch('vehicleInformation.vehicleModel');
  const services = watch('vehicleInformation.services');

  return (
    <div className="grid h-full grid-cols-2 gap-5">
      <div className="">
        <Field
          withRequiredMark
          label={t('vehicles:registrationNumber')}
          error={errors.vehicleInformation?.registrationNumber?.message}
        >
          <Input
            valueVariant="controlled-state"
            value={registrationNumber}
            onChange={value => {
              setValue('vehicleInformation.registrationNumber', value);
              if (errors.vehicleInformation?.registrationNumber) {
                trigger('vehicleInformation.registrationNumber');
              }
            }}
            disabled={disabledField}
            placeholder={t('vehicles:registrationNumber')}
          />
        </Field>
        <div className="flex gap-5">
          <div className="w-1/2">
            <Field
              withRequiredMark
              label={t('vehicles:vehicleModel')}
              error={errors.vehicleInformation?.vehicleModel?.message}
            >
              <Input
                valueVariant="controlled-state"
                value={vehicleModel}
                onChange={value => {
                  setValue('vehicleInformation.vehicleModel', value);
                  if (errors.vehicleInformation?.vehicleModel) {
                    trigger('vehicleInformation.vehicleModel');
                  }
                }}
                disabled={disabledField}
                placeholder={t('vehicles:vehicleModel')}
              />
            </Field>
            <Field
              withRequiredMark
              label={t('vehicles:RegistrationDate')}
              error={errors.vehicleInformation?.registrationDate?.message}
            >
              <DatePicker onChange={onChange} needConfirm className="w-full" />
            </Field>
          </div>
          <div className="w-1/2">
            <Field
              withRequiredMark
              label={t('vehicles:ManufactureDate')}
              error={errors.vehicleInformation?.manufacturerDate?.message}
            >
              <DatePicker onChange={onChange} needConfirm className="w-full" />
            </Field>
            <Field
              withRequiredMark
              label={t('vehicles:FirstCirculationDate')}
              error={errors.vehicleInformation?.firstcirculationDate?.message}
            >
              <DatePicker onChange={onChange} needConfirm className="w-full" />
            </Field>
          </div>
        </div>
      </div>
      <div>
        <Field
          withRequiredMark
          label={t('vehicles:vehicleBrand')}
          error={errors.vehicleInformation?.vehicleBrand?.message}
        >
          <Input
            valueVariant="controlled-state"
            value={vehicleBrand}
            onChange={value => {
              setValue('vehicleInformation.vehicleBrand', value);
              if (errors.vehicleInformation?.vehicleBrand) {
                trigger('vehicleInformation.vehicleBrand');
              }
            }}
            disabled={disabledField}
            placeholder={t('vehicles:vehicleBrand')}
          />
        </Field>
        <Field withRequiredMark label={t('vehicles:service')} error={errors.vehicleInformation?.services?.message}>
          <SelectServices
            services={services}
            onChange={value => {
              setValue('vehicleInformation.services', value);
              if (errors.vehicleInformation?.services) {
                trigger('vehicleInformation.services');
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
              error={errors.vehicleInformation?.expiryTechnicalVisitDate?.message}
            >
              <DatePicker onChange={onChange} needConfirm className="w-full" />
            </Field>
          </div>
          <div className="w-1/2">
            <Field
              withRequiredMark
              label={t('vehicles:InsuranceExpiryDate')}
              error={errors.vehicleInformation?.insuranceExpiryDate?.message}
            >
              <DatePicker width={500} onChange={onChange} needConfirm className="w-full" />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
};
