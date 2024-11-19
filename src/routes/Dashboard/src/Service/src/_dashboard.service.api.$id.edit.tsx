import { ServiceWithModalBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, redirect } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { getFormMutationResolver } from '~/packages/Classes/components/FormMutation/zodResolver';
import {
  ServiceFormMutationProps,
  ServiceFormMutationValues,
} from '~/packages/Services/components/FormMutation/FormMutation';
import { Services } from '~/packages/Services/models/Services';
import { updateService } from '~/packages/Services/services/updateService';
import { serviceFormMutationValuesToCreateServicesService } from '~/packages/Services/utils/serviceFormMutationValuesToCreateServicesService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditServiceActionResponse = SimpleActionResponse<
  Pick<Services, '_id'>,
  ServiceFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditServiceActionResponse>> => {
  const { request, params } = remixRequest;
  if (!params['id']) {
    return redirect(ServiceWithModalBaseUrl);
  }
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'service'] as const);
    const { errors, data } = await validateFormData<ServiceFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await updateService({
        remixRequest,
        data: {
          _id: params['id'],
          ...serviceFormMutationValuesToCreateServicesService(data),
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
