import { BrandingStandardWithModalBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { json, redirect } from '~/overrides/remix';
import { deleteBrandingStandard } from '~/packages/BrandingStandard/services/deleteBrandingStandard';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type DeleteBrandingActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<DeleteBrandingActionResponse>> => {
  const { params } = remixRequest;
  try {
    if (params['id']) {
      await deleteBrandingStandard({ _id: params['id'] });
      return json({
        hasError: false,
        message: 'Removed',
        info: undefined,
      });
    }
    return redirect(BrandingStandardWithModalBaseUrl);
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};
