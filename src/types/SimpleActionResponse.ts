import { SimpleActionResponse as BaseSimpleActionResponse } from '~/overrides/RemixJS/types';
import { StatusCodeMappingToString } from '~/services/constants/StringMappingToStatusCode';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export type SimpleActionResponse<Model, FieldsError extends AnyRecord | undefined> = BaseSimpleActionResponse<
  Model,
  FieldsError,
  { errorCode?: keyof typeof StatusCodeMappingToString }
>;
