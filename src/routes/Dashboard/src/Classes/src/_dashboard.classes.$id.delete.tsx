import { ClassesWithModalBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { json, redirect } from '~/overrides/remix';
import { deleteClass } from '~/packages/Classes/services/deleteClass';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type DeleteClassesActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<DeleteClassesActionResponse>> => {
  const { params } = remixRequest;
  try {
    if (params['id']) {
      await deleteClass({ _id: params['id'] });
      return json({
        hasError: false,
        message: 'Removed',
        info: undefined,
      });
    }
    return redirect(ClassesWithModalBaseUrl);
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};
