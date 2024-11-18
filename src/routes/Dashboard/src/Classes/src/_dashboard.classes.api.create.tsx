import type { ActionFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { json } from '~/overrides/remix';
import { validateFormData } from '~/overrides/remix-hook-form';
import { i18nServer } from '~/packages/_Common/I18n/i18n.server';
import { getFormMutationResolver } from '~/packages/BrandingStandard/components/FormMutation/zodResolver';
import {
  ClassesFormMutationProps,
  ClassesFormMutationValues,
} from '~/packages/Classes/components/FormMutation/FormMutation';
import { Classes } from '~/packages/Classes/models/Classes';
import { createClasses } from '~/packages/Classes/services/CreateClasses';
import { classesFormMutationValuesToCreateClassesService } from '~/packages/Classes/utils/classesFormMutationValuesToCreateClassesService';
import { SimpleActionResponse } from '~/types/SimpleActionResponse';
import { fetcherFormData } from '~/utils/functions/formData/fetcherFormData';
import { handleCatchClauseAsSimpleResponse } from '~/utils/functions/handleErrors/handleCatchClauseSimple';
import { handleFormResolverError } from '~/utils/functions/handleErrors/handleFormResolverError';

export type CreateClassesActionResponse = SimpleActionResponse<
  Pick<Classes, '_id'>,
  ClassesFormMutationProps['fieldsError']
>;
export const action = async (remixRequest: ActionFunctionArgs): Promise<TypedResponse<CreateClassesActionResponse>> => {
  const { request } = remixRequest;
  try {
    const t = await i18nServer.getFixedT(request, ['common', 'branding'] as const);
    const { errors, data } = await validateFormData<ClassesFormMutationValues>(
      await fetcherFormData.decrypt(request),
      getFormMutationResolver(t),
    );
    if (data) {
      await createClasses({
        remixRequest,
        data: classesFormMutationValuesToCreateClassesService(data),
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
