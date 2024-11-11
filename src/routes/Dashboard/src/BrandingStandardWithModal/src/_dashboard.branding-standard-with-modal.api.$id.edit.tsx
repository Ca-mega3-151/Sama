import { BrandingStandardWithModalBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, redirect } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import {
  BrandingStandardFormMutationProps,
  BrandingStandardFormMutationValues,
} from '~/packages/BrandingStandard/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/BrandingStandard/components/FormMutation/zodResolver';
import { BrandingStandard } from '~/packages/BrandingStandard/models/BrandingStandard';
import { updateBrandingStandard } from '~/packages/BrandingStandard/services/updateBrandingStandard';
import { brandingStandardFormMutationValuesToCreateBrandingService } from '~/packages/BrandingStandard/utils/brandingFormMutationValuesToCreateBrandingService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditBrandingActionResponse = SimpleActionResponse<
  Pick<BrandingStandard, '_id'>,
  BrandingStandardFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditBrandingActionResponse>> => {
  const { request, params } = remixRequest;
  if (!params['id']) {
    return redirect(BrandingStandardWithModalBaseUrl);
  }
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'branding_standard'] as const);
    const { errors, data } = await validateFormData<BrandingStandardFormMutationValues>(
      await fetcherFormData.decrypt(request),
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

export const shouldRevalidate = preventRevalidateOnEditPage;

export const ErrorBoundary = PageErrorBoundary;
