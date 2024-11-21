import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';

import {
  ServiceFormMutationProps,
  ServiceFormMutationValues,
} from '~/packages/Services/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/Services/components/FormMutation/zodResolver';
import { Services } from '~/packages/Services/models/Services';
import { createService } from '~/packages/Services/services/createService';
import { serviceFormMutationValuesToCreateServicesService } from '~/packages/Services/utils/serviceFormMutationValuesToCreateServicesService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';

export type CreateServiceActionResponse = SimpleActionResponse<
  Pick<Services, '_id'>,
  ServiceFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<CreateServiceActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'service'] as const);
    const { errors, data } = await validateFormData<ServiceFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await createService({
        remixRequest,
        data: serviceFormMutationValuesToCreateServicesService(data),
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
