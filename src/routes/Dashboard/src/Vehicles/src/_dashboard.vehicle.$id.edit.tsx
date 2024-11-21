import { notification } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { VehiclesWithPageBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, LoaderFunctionArgs, TypedResponse } from '~/overrides/remix';
import { BoxFields } from '~/components/BoxFields';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter, MutationHeader } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, redirect, useActionData, useNavigate, useNavigation } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import { SimpleLoaderResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';

import {
  VehiclesFormMutationActions,
  VehiclesFormMutationProps,
  VehiclesFormMutationValues,
} from '~/packages/Vehicles/components/FormMutation/FormMutation';
import { CreateTabs } from '~/packages/Vehicles/components/FormMutation/tab';
import { getFormMutationResolver } from '~/packages/Vehicles/components/FormMutation/zodResolver';
import { Vehicles } from '~/packages/Vehicles/models/Vehicles';
import { getVehicle } from '~/packages/Vehicles/services/getVehicle';
import { updateVehicle } from '~/packages/Vehicles/services/updateVehicle';
import { vehiclesFormMutationValuesToCreateVehiclesService } from '~/packages/Vehicles/utils/vehicleFormMutationValuesToCreateCVehiclesService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditVehiclesActionResponse = SimpleActionResponse<
  Pick<Vehicles, '_id'>,
  VehiclesFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditVehiclesActionResponse>> => {
  const { request, params } = remixRequest;
  if (!params['id']) {
    return redirect(VehiclesWithPageBaseUrl);
  }
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'vehicles'] as const);
    const { errors, data } = await validateFormData<VehiclesFormMutationValues>(request, getFormMutationResolver(t));
    if (data) {
      await updateVehicle({
        remixRequest,
        data: {
          _id: params['id'],
          ...vehiclesFormMutationValuesToCreateVehiclesService(data),
        },
      });

      return json({
        hasError: false,
        message: 'Saved',
        info: undefined,
      });
    }
    return json(...handleFormResolverError(errors));
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

type LoaderResponse = SimpleLoaderResponse<{ vehicles: Vehicles }>;
export const loader = async (remixRequest: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  const { params } = remixRequest;
  if (!params['id']) {
    return redirect('/404');
  }
  try {
    const response = await getVehicle({
      remixRequest,
      data: {
        _id: params['id'],
      },
    });
    return json({
      info: {
        vehicles: response.data,
      },
      hasError: false,
      message: '',
    });
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};

export const shouldRevalidate = preventRevalidateOnEditPage;

export const ErrorBoundary = PageErrorBoundary;

const FormUpdateUid = 'FormUpdateUid';
export const Page = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['vehicles']);

  const navigation = useNavigation();
  // const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  // const defaultValues = useMemo(() => {
  //   return VehiclesModelToDefaultValuesOfFormMutation({
  //     vehicles: loaderData.info?.vehicles,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

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
          message: t('vehicles:edit_error'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        isReadyNavigateAfterSubmit.current = true;
        notification.success({ message: t('vehicles:edit_success') });
        navigate(VehiclesWithPageBaseUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="flex h-full flex-col">
      <MutationHeader title={t('vehicles:edit_title')} onBack={() => navigate(VehiclesWithPageBaseUrl)} />
      <div className="mb-4 flex-1">
        <BoxFields>
          {/* <VehiclesFormMutation
            ref={formActionsRef}
            isSubmiting={isSubmiting}
            uid={FormUpdateUid}
            defaultValues={defaultValues}
          /> */}
          <CreateTabs />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdateUid, htmlType: 'submit' }}
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
