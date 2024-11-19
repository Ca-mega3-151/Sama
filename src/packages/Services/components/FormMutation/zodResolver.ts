import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'service']>) => {
  const description = {
    required: getRequiredMessage(t, 'service:description'),
  };
  const name = {
    required: getRequiredMessage(t, 'service:name'),
  };
  return object({
    description: string({ required_error: description.required }).min(1, description.required),
    name: string({ required_error: name.required }).min(1, name.required),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'service']>) => {
  return zodResolver(getFormMutationSchema(t));
};
