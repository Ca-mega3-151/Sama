import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { VehiclesWithPageBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { BoxFields } from '~/components/BoxFields';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter, MutationHeader } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, useActionData, useNavigate, useNavigation } from '~/overrides/remix';
import { getValidatedFormData } from '~/overrides/remix-hook-form';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';

import {
  // VehiclesFormMutation,
  VehiclesFormMutationActions,
  VehiclesFormMutationProps,
  VehiclesFormMutationValues,
} from '~/packages/Vehicles/components/FormMutation/FormMutation';
import { CreateTabs } from '~/packages/Vehicles/components/FormMutation/tab';
import { getFormMutationResolver } from '~/packages/Vehicles/components/FormMutation/zodResolver';
import { Vehicles } from '~/packages/Vehicles/models/Vehicles';
import { createVehicle } from '~/packages/Vehicles/services/createVehicle';
import { vehiclesFormMutationValuesToCreateVehiclesService } from '~/packages/Vehicles/utils/vehicleFormMutationValuesToCreateCVehiclesService';
// import { VehiclesModelToDefaultValuesOfFormMutation } from '~/packages/Vehicles/utils/VehiclesModelToDefaultValuesOfFormMutation';
import { notification } from '~/shared/ReactJS';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export type CreateVehiclesActionResponse = SimpleActionResponse<
  Pick<Vehicles, '_id'>,
  VehiclesFormMutationProps['fieldsError']
>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<CreateVehiclesActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'vehicles'] as const);
    const { errors, data } = await getValidatedFormData<VehiclesFormMutationValues>(
      request,
      getFormMutationResolver(t),
    );
    if (data) {
      await createVehicle({
        remixRequest,
        data: vehiclesFormMutationValuesToCreateVehiclesService(data),
      });

      return json({
        hasError: false,
        message: 'Created',
        info: undefined,
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

export const ErrorBoundary = PageErrorBoundary;

const FormCreateUid = 'FormCreateUid';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['vehicles']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  // const defaultValues = useMemo(() => {
  //   return VehiclesModelToDefaultValuesOfFormMutation({ vehicles: undefined });
  // }, []);
  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  //#region Confirm back when form is dirty
  const formActionsRef = useRef<VehiclesFormMutationActions | null>(null);
  const isReadyNavigateAfterSubmit = useRef<boolean>(false);
  const { cancelNavigation, confirmNavigation, showPrompt } = useCallbackPrompt({
    whenEnableForBrowser: () => {
      return !!formActionsRef.current?.isDirty();
    },
    whenEnableForReactRouter: ({ currentLocation, nextLocation }) => {
      if (isReadyNavigateAfterSubmit.current) {
        return false;
      }
      return currentLocation.pathname !== nextLocation.pathname && !!formActionsRef.current?.isDirty();
    },
  });

  const handleConfirmBack = confirmNavigation;
  const handleCancelback = () => {
    cancelNavigation();
  };
  //#endregion

  useEffect(() => {
    if (actionData) {
      if (actionData.hasError) {
        notification.error({
          message: t('vehicles:create_error'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        isReadyNavigateAfterSubmit.current = true;
        notification.success({ message: t('vehicles:create_success') });
        navigate(VehiclesWithPageBaseUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="flex h-full flex-col">
      <MutationHeader title={t('vehicles:create_title')} onBack={() => navigate(VehiclesWithPageBaseUrl)} />
      <div className="mb-4 flex-1">
        <BoxFields>
          {/* <VehiclesFormMutation
            ref={formActionsRef}
            isSubmiting={isSubmiting}
            uid={FormCreateUid}
            defaultValues={defaultValues}
          /> */}
          <CreateTabs />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
        onCancel={() => navigate(VehiclesWithPageBaseUrl)}
      />
      <ModalConfirmNavigate
        confirmLoading={navigation.state === 'loading'}
        title={t('vehicles:confirm_unsave_change_title')}
        subTitle={t('vehicles:confirm_unsave_change_sub_title')}
        description={t('vehicles:confirm_unsave_change_description')}
        open={showPrompt}
        onOk={handleConfirmBack}
        onCancel={handleCancelback}
      />
    </div>
  );
};

export default Page;
