import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import {
  BrandingStandardFormMutationProps,
  BrandingStandardFormMutationValues,
} from '~/packages/BrandingStandard/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/BrandingStandard/components/FormMutation/zodResolver';
import { BrandingStandard } from '~/packages/BrandingStandard/models/BrandingStandard';
import { createBrandingStandard } from '~/packages/BrandingStandard/services/createBrandingStandard';
import { brandingStandardFormMutationValuesToCreateBrandingService } from '~/packages/BrandingStandard/utils/brandingFormMutationValuesToCreateBrandingService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';

export type CreateBrandingActionResponse = SimpleActionResponse<
  Pick<BrandingStandard, '_id'>,
  BrandingStandardFormMutationProps['fieldsError']
>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<CreateBrandingActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'branding'] as const);
    const { errors, data } = await validateFormData<BrandingStandardFormMutationValues>(
      await fetcherFormData.decrypt(request),
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
