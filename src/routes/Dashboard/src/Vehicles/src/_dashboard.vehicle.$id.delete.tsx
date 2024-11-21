import { VehiclesWithPageBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { json, redirect } from '~/overrides/remix';
import { deleteVehicle } from '~/packages/Vehicles/services/deleteVehicle';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';

export type DeleteVehiclesActionResponse = SimpleActionResponse<undefined, undefined>;
export const action = async (
  remixRequest: ActionFunctionArgs,
): Promise<TypedResponse<DeleteVehiclesActionResponse>> => {
  const { params } = remixRequest;
  try {
    if (params['id']) {
      await deleteVehicle({ _id: params['id'] });
      return json({
        hasError: false,
        message: 'Removed',
        info: undefined,
      });
    }
    return redirect(VehiclesWithPageBaseUrl);
  } catch (error) {
    return handleCatchClauseAsSimpleResponse(error);
  }
};
