import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandingStandardWithPageBaseUrl } from './constants/BaseUrl';
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
  BrandingStandardFormMutation,
  BrandingStandardFormMutationActions,
  BrandingStandardFormMutationProps,
  BrandingStandardFormMutationValues,
} from '~/packages/BrandingStandard/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/BrandingStandard/components/FormMutation/zodResolver';
import { BrandingStandard } from '~/packages/BrandingStandard/models/BrandingStandard';
import { createBrandingStandard } from '~/packages/BrandingStandard/services/createBrandingStandard';
import { brandingStandardFormMutationValuesToCreateBrandingService } from '~/packages/BrandingStandard/utils/brandingFormMutationValuesToCreateBrandingService';
import { brandingStandardModelToDefaultValuesOfFormMutation } from '~/packages/BrandingStandard/utils/brandingModelToDefaultValuesOfFormMutation';
import { notification } from '~/shared/ReactJS';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { handleGetMessageToToast } from '~/utils/functions/handleErrors/handleGetMessageToToast';

export type CreateBrandingStandardActionResponse = SimpleActionResponse<
  Pick<BrandingStandard, '_id'>,
  BrandingStandardFormMutationProps['fieldsError']
>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<CreateBrandingStandardActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'branding_standard'] as const);
    const { errors, data } = await getValidatedFormData<BrandingStandardFormMutationValues>(
      request,
      getFormMutationResolver(t),
    );
    if (data) {
      await createBrandingStandard({
        remixRequest,
        data: brandingStandardFormMutationValuesToCreateBrandingService(data),
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
  const { t } = useTranslation(['branding_standard']);

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const defaultValues = useMemo(() => {
    return brandingStandardModelToDefaultValuesOfFormMutation({ brandingStandard: undefined });
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
          message: t('branding_standard:create_error'),
          description: handleGetMessageToToast(t, actionData),
        });
      } else {
        isReadyNavigateAfterSubmit.current = true;
        notification.success({ message: t('branding_standard:create_success') });
        navigate(BrandingStandardWithPageBaseUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <div className="flex h-full flex-col">
      <MutationHeader
        title={t('branding_standard:create_title')}
        onBack={() => navigate(BrandingStandardWithPageBaseUrl)}
      />
      <div className="mb-4 flex-1">
        <BoxFields>
          <BrandingStandardFormMutation
            ref={formActionsRef}
            isSubmiting={isSubmiting}
            uid={FormCreateUid}
            defaultValues={defaultValues}
          />
        </BoxFields>
      </div>
      <MutationFooter
        isLoading={isSubmiting}
        okConfirmProps={{ form: FormCreateUid, htmlType: 'submit' }}
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
