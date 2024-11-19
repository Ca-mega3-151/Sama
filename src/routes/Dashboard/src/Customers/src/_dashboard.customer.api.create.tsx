import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { getFormMutationResolver } from '~/packages/Classes/components/FormMutation/zodResolver';
import {
  CustomerFormMutationProps,
  CustomerFormMutationValues,
} from '~/packages/Customers/components/FormMutation/FormMutation';
import { Customers } from '~/packages/Customers/models/Customers';
import { createCustomer } from '~/packages/Customers/services/createCustomer';

import { customerFormMutationValuesToCreateCustomersService } from '~/packages/Customers/utils/customerFormMutationValuesToCreateCustomersService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';

export type CreateCustomerActionResponse = SimpleActionResponse<
  Pick<Customers, '_id'>,
  CustomerFormMutationProps['fieldsError']
>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<CreateCustomerActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'customer'] as const);
    const { errors, data } = await validateFormData<CustomerFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await createCustomer({
        remixRequest,
        data: customerFormMutationValuesToCreateCustomersService(data),
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
