import { TFunction } from 'i18next';
import { equals } from 'ramda';
import { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeOf } from 'zod';
import { Vehicles } from '../../models/Vehicles';
import { VehicleIfnormation } from './component/Information';
import { SeatSelection } from './component/Seat';
import { getFormMutationResolver, getFormMutationSchema } from './zodResolver';
import { BoxFields } from '~/components/BoxFields';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { Tabs, useDeepCompareEffect } from '~/shared/ReactJS';
import { DeepPartial, DeepUnpartial, FormMutationStateValues } from '~/shared/TypescriptUtilities';

export interface VehicleFormMutationValues extends TypeOf<ReturnType<typeof getFormMutationSchema>> {}
export type VehicleFormMutationStateValues = FormMutationStateValues<DeepUnpartial<VehicleFormMutationValues>>;
export interface VehicleFormMutationProps {
  uid: string;
  isSubmiting: boolean;
  defaultValues: VehicleFormMutationStateValues;
  fieldsError?: DeepPartial<Record<keyof VehicleFormMutationValues, string>>;
  onSubmit?: (values: VehicleFormMutationValues) => void;
  disabled?: boolean;
  statusUpdatable?: boolean;
  tabActive?: VehicleFormMutationTabKey;
  setTabActive?: Dispatch<SetStateAction<VehicleFormMutationTabKey>>;
  hideTabs?: boolean;
  isEdit?: boolean;
  vehicles: Vehicles | undefined;
}
export type VehicleFormMutationTabKey = 'vehicle_information' | 'seat_settings';
export interface VehicleFormMutationActions {
  isDirty: () => boolean;
}
export const VehicleFormMutation = forwardRef<VehicleFormMutationActions, VehicleFormMutationProps>((props, ref) => {
  const {
    uid,
    defaultValues,
    fieldsError = {},
    isSubmiting,
    disabled,
    onSubmit,
    setTabActive,
    tabActive,
    isEdit = false,
    vehicles,
  } = props;

  const { t } = useTranslation(['common', 'vehicles']);
  const [tabActiveState, setTabActiveState] = useState<VehicleFormMutationTabKey>('vehicle_information');
  const formRef = useRef<HTMLFormElement | null>(null);
  const setTabActive_ = setTabActive ?? setTabActiveState;
  const tabActive_ = tabActive ?? tabActiveState;
  const disabledField = disabled || isSubmiting;
  const form = useRemixForm<VehicleFormMutationStateValues>({
    mode: 'onSubmit',
    submitHandlers: {
      onValid: onSubmit as any,
      onInvalid: errors => {
        if (errors.vehicleInformation) {
          setTabActive_('vehicle_information');
        } else if (errors.seatSettings) {
          setTabActive_('seat_settings');
        }
      },
    },
    defaultValues,
    resolver: getFormMutationResolver(t as TFunction<['common', 'vehicles']>),
  });
  const { handleSubmit, setError, reset, getValues } = form;
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
      isDirty: () => {
        return !equals(defaultValues, getValues());
      },
    };
  }, [defaultValues, getValues]);

  console.log(111, tabActive_);
  return (
    <div>
      <Form
        ref={formRef}
        method="POST"
        id={uid}
        onSubmit={event => {
          event.stopPropagation();
          handleSubmit(event);
        }}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
      >
        <Tabs
          tabActive={tabActive_}
          onChange={value => setTabActive_(value as VehicleFormMutationTabKey)}
          tabs={[
            {
              key: 'vehicle_information',
              label: t('vehicles:information'),
              children: (
                <BoxFields>
                  <VehicleIfnormation form={form} vehicles={vehicles} disabledField={disabledField} isEdit={isEdit} />
                </BoxFields>
              ),
            },
            {
              key: 'seat_settings',
              label: t('vehicles:seat'),
              children: (
                <BoxFields>
                  <SeatSelection form={form} vehicles={vehicles} disabledField={disabledField} isEdit={isEdit} />
                </BoxFields>
              ),
            },
          ]}
        />
      </Form>
    </div>
  );
});

VehicleFormMutation.displayName = 'VehicleFormMutation';
