import { ClassesWithModalBaseUrl } from './constants/BaseUrl';
import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json, redirect } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { getFormMutationResolver } from '~/packages/BrandingStandard/components/FormMutation/zodResolver';
import {
  ClassesFormMutationProps,
  ClassesFormMutationValues,
} from '~/packages/Classes/components/FormMutation/FormMutation';
import { Classes } from '~/packages/Classes/models/Classes';
import { UpdateClasses } from '~/packages/Classes/services/updateClasses';
import { classesFormMutationValuesToCreateClassesService } from '~/packages/Classes/utils/classesFormMutationValuesToCreateClassesService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';
import { preventRevalidateOnEditPage } from '~/utils/functions/preventRevalidateOnEditPage';

export type EditClassesActionResponse = SimpleActionResponse<
  Pick<Classes, '_id'>,
  ClassesFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<EditClassesActionResponse>> => {
  const { request, params } = remixRequest;
  if (!params['id']) {
    return redirect(ClassesWithModalBaseUrl);
  }
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'classes'] as const);
    const { errors, data } = await validateFormData<ClassesFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await UpdateClasses({
        remixRequest,
        data: {
          _id: params['id'],
          ...classesFormMutationValuesToCreateClassesService(data),
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
