import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'classes']>) => {
  const code = {
    required: getRequiredMessage(t, 'classes:code'),
  };
  const name = {
    required: getRequiredMessage(t, 'classes:name'),
  };
  return object({
    code: string({ required_error: code.required }).min(1, code.required),
    name: string({ required_error: name.required }).min(1, name.required),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'classes']>) => {
  return zodResolver(getFormMutationSchema(t));
};
