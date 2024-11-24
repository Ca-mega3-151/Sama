import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs'; // Import Dayjs
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { VehicleFormMutationStateValues } from '../FormMutation';
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

type FieldNames =
  | 'vehicleInformation.registrationDate'
  | 'vehicleInformation.manufacturerDate'
  | 'vehicleInformation.firstcirculationDate'
  | 'vehicleInformation.expiryTechnicalVisitDate'
  | 'vehicleInformation.insuranceExpiryDate'
  | 'vehicleInformation.vehicleBrand'
  | 'vehicleInformation.services'
  | 'vehicleInformation.registrationNumber'
  | 'vehicleInformation.vehicleModel';

export const VehicleIfnormation = ({ form, disabledField }: Props) => {
  const { t } = useTranslation(['common', 'vehicles']);

  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = form;

  // Lấy giá trị từ form
  const registrationNumber = watch('vehicleInformation.registrationNumber');
  const vehicleModel = watch('vehicleInformation.vehicleModel');
  const registrationDate = watch('vehicleInformation.registrationDate');
  const manufacturerDate = watch('vehicleInformation.manufacturerDate');
  const firstCirculationDate = watch('vehicleInformation.firstcirculationDate');
  const expiryTechnicalVisitDate = watch('vehicleInformation.expiryTechnicalVisitDate');
  const insuranceExpiryDate = watch('vehicleInformation.insuranceExpiryDate');
  const vehicleBrand = watch('vehicleInformation.vehicleBrand');
  const services = watch('vehicleInformation.services');

  // Hàm xử lý khi chọn ngày
  const handleDateChange = (date: Dayjs | null, fieldName: FieldNames) => {
    if (date) {
      setValue(fieldName, date.format('YYYY-MM-DD')); // Cập nhật giá trị vào form
      trigger(fieldName); // Trigger validation nếu có lỗi
    }
  };

  // Chuyển đổi các giá trị ngày từ string hoặc undefined thành Dayjs
  const convertToDayjs = (value: string | undefined | Dayjs): Dayjs | null => {
    return value ? dayjs(value) : null; // Chuyển string thành Dayjs, hoặc trả về null nếu undefined
  };

  return (
    <div className="grid h-full grid-cols-2 gap-5">
      <div>
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
              <DatePicker
                value={convertToDayjs(registrationDate)} // Chuyển đổi ngày thành Dayjs
                onChange={date => handleDateChange(date, 'vehicleInformation.registrationDate')} // Cập nhật giá trị vào form
                className="w-full"
                disabled={disabledField}
                format="YYYY-MM-DD"
              />
            </Field>
          </div>

          <div className="w-1/2">
            <Field
              withRequiredMark
              label={t('vehicles:ManufactureDate')}
              error={errors.vehicleInformation?.manufacturerDate?.message}
            >
              <DatePicker
                value={convertToDayjs(manufacturerDate)} // Chuyển đổi ngày thành Dayjs
                onChange={date => handleDateChange(date, 'vehicleInformation.manufacturerDate')} // Cập nhật giá trị vào form
                className="w-full"
                disabled={disabledField}
                format="YYYY-MM-DD"
              />
            </Field>

            <Field
              withRequiredMark
              label={t('vehicles:FirstCirculationDate')}
              error={errors.vehicleInformation?.firstcirculationDate?.message}
            >
              <DatePicker
                value={convertToDayjs(firstCirculationDate)} // Chuyển đổi ngày thành Dayjs
                onChange={date => handleDateChange(date, 'vehicleInformation.firstcirculationDate')} // Cập nhật giá trị vào form
                className="w-full"
                disabled={disabledField}
                format="YYYY-MM-DD"
              />
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
              <DatePicker
                value={convertToDayjs(expiryTechnicalVisitDate)} // Chuyển đổi ngày thành Dayjs
                onChange={date => handleDateChange(date, 'vehicleInformation.expiryTechnicalVisitDate')} // Cập nhật giá trị vào form
                className="w-full"
                disabled={disabledField}
                format="YYYY-MM-DD"
              />
            </Field>
          </div>

          <div className="w-1/2">
            <Field
              withRequiredMark
              label={t('vehicles:InsuranceExpiryDate')}
              error={errors.vehicleInformation?.insuranceExpiryDate?.message}
            >
              <DatePicker
                value={convertToDayjs(insuranceExpiryDate)} // Chuyển đổi ngày thành Dayjs
                onChange={date => handleDateChange(date, 'vehicleInformation.insuranceExpiryDate')} // Cập nhật giá trị vào form
                className="w-full"
                disabled={disabledField}
                format="YYYY-MM-DD"
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
};
