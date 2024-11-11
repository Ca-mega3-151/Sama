import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandingStandardWithPageBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, LoaderFunctionArgs, TypedResponse } from '~/overrides/remix';
import { BoxFields } from '~/components/BoxFields';
import { ModalConfirmNavigate } from '~/components/ModalConfirmNavigate';
import { MutationFooter, MutationHeader } from '~/components/Mutation';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, redirect, useActionData, useLoaderData, useNavigation, useNavigate } from '~/overrides/remix';
import { getValidatedFormData } from '~/overrides/remix-hook-form';
import { useCallbackPrompt } from '~/overrides/RemixJS/client';
import { SimpleActionResponse, SimpleLoaderResponse } from '~/overrides/RemixJS/types';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import {
  BrandingStandardFormMutation,
  BrandingStandardFormMutationActions,
  BrandingStandardFormMutationProps,
  BrandingStandardFormMutationValues,
} from '~/packages/BrandingStandard/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/BrandingStandard/components/FormMutation/zodResolver';
import { BrandingStandard } from '~/packages/BrandingStandard/models/BrandingStandard';
import { getBrandingStandard } from '~/packages/BrandingStandard/services/getBrandingStandard';
import { updateBrandingStandard } from '~/packages/BrandingStandard/services/updateBrandingStandard';
import { brandingStandardFormMutationValuesToCreateBrandingService } from '~/packages/BrandingStandard/utils/brandingFormMutationValuesToCreateBrandingService';
import { brandingStandardModelToDefaultValuesOfFormMutation } from '~/packages/BrandingStandard/utils/brandingModelToDefaultValuesOfFormMutation';
import { notification } from '~/shared/ReactJS';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditBrandingActionResponse = SimpleActionResponse<
  Pick<BrandingStandard, '_id'>,
  BrandingStandardFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditBrandingActionResponse>> => {
  const { request, params } = remixRequest;
  if (!params['id']) {
    return redirect(BrandingStandardWithPageBaseUrl);
  }
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'branding_standard'] as const);
    const { errors, data } = await getValidatedFormData<BrandingStandardFormMutationValues>(
      request,
      getFormMutationResolver(t),
    );
    if (data) {
      await updateBrandingStandard({
        remixRequest,
        data: {
          _id: params['id'],
          ...brandingStandardFormMutationValuesToCreateBrandingService(data),
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

type LoaderResponse = SimpleLoaderResponse<{ brandingStandard: BrandingStandard }>;
export const loader = async (remixRequest: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  const { params } = remixRequest;
  if (!params['id']) {
    return redirect('/404');
  }
  try {
    const response = await getBrandingStandard({
      remixRequest,
      data: {
        _id: params['id'],
      },
    });
    return json({
      info: {
        brandingStandard: response.data,
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
  const { t } = useTranslation(['branding_standard']);

  const navigation = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const defaultValues = useMemo(() => {
    return brandingStandardModelToDefaultValuesOfFormMutation({
      brandingStandard: loaderData.info?.brandingStandard,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSubmiting = useMemo(() => {
    return navigation.state === 'loading' || navigation.state === 'submitting';
  }, [navigation.state]);

  //#region Confirm back when form is dirty
  const formActionsRef = useRef<BrandingStandardFormMutationActions | null>(null);
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
          message: t('branding_standard:edit_error'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        isReadyNavigateAfterSubmit.current = true;
        notification.success({ message: t('branding_standard:edit_success') });
        navigate(BrandingStandardWithPageBaseUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="flex h-full flex-col">
      <MutationHeader
        title={t('branding_standard:edit_title')}
        onBack={() => navigate(BrandingStandardWithPageBaseUrl)}
      />
      <div className="mb-4 flex-1">
        <BoxFields>
          <BrandingStandardFormMutation
            ref={formActionsRef}
            isSubmiting={isSubmiting}
            uid={FormUpdateUid}
            defaultValues={defaultValues}
          />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormUpdateUid, htmlType: 'submit' }}
        onCancel={() => navigate(BrandingStandardWithPageBaseUrl)}
      />
      <ModalConfirmNavigate
        confirmLoading={navigation.state === 'loading'}
        title={t('branding_standard:confirm_unsave_change_title')}
        subTitle={t('branding_standard:confirm_unsave_change_sub_title')}
        description={t('branding_standard:confirm_unsave_change_description')}
        open={showPrompt}
        onOk={handleConfirmBack}
        onCancel={handleCancelback}
      />
    </div>
  );
};

export default Page;
