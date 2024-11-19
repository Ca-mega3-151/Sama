import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { object, string } from 'zod';
import { getRequiredMessage } from '~/utils/functions/getRequiredMessage';

export const getFormMutationSchema = (t: TFunction<['common', 'customer']>) => {
  const firstName = {
    required: getRequiredMessage(t, 'customer:firstName'),
  };
  const lastName = {
    required: getRequiredMessage(t, 'customer:lastName'),
  };
  const phone = {
    required: getRequiredMessage(t, 'customer:phone'),
  };
  const email = {
    required: getRequiredMessage(t, 'customer:email'),
  };
  const address = {
    required: getRequiredMessage(t, 'customer:address'),
  };
  return object({
    firstName: string({ required_error: firstName.required }).min(1, firstName.required),
    lastName: string({ required_error: lastName.required }).min(1, lastName.required),
    phone: string({ required_error: phone.required }).min(1, phone.required),
    email: string({ required_error: email.required }),
    address: string({ required_error: address.required }).min(1, address.required),
  });
};

export const getFormMutationResolver = (t: TFunction<['common', 'customer']>) => {
  return zodResolver(getFormMutationSchema(t));
};
