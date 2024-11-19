import { CustomerWithModalBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, redirect } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';

import {
  CustomerFormMutationProps,
  CustomerFormMutationValues,
} from '~/packages/Customers/components/FormMutation/FormMutation';
import { getFormMutationResolver } from '~/packages/Customers/components/FormMutation/zodResolver';
import { Customers } from '~/packages/Customers/models/Customers';
import { updateCustomer } from '~/packages/Customers/services/updateCustomer';
import { customerFormMutationValuesToCreateCustomersService } from '~/packages/Customers/utils/customerFormMutationValuesToCreateCustomersService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditCustomerActionResponse = SimpleActionResponse<
  Pick<Customers, '_id'>,
  CustomerFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditCustomerActionResponse>> => {
  const { request, params } = remixRequest;
  if (!params['id']) {
    return redirect(CustomerWithModalBaseUrl);
  }
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'customer'] as const);
    const { errors, data } = await validateFormData<CustomerFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await updateCustomer({
        remixRequest,
        data: {
          _id: params['id'],
          ...customerFormMutationValuesToCreateCustomersService(data),
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
