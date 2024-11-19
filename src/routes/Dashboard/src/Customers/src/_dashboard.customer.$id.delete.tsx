import { CustomerWithModalBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { json, redirect } from '~/overrides/remix';
import { deleteCustomer } from '~/packages/Customers/services/deleteCustomer';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type DeleteCustomerActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<DeleteCustomerActionResponse>> => {
  const { params } = remixRequest;
  try {
    if (params['id']) {
      await deleteCustomer({ _id: params['id'] });
      return json({
        hasError: false,
        message: 'Removed',
        info: undefined,
      });
    }
    return redirect(CustomerWithModalBaseUrl);
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};
