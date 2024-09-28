import { ColumnType } from './ColumnType';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export type ColumnsState<RecordType extends AnyRecord, ActionKey extends string> = Array<{
  id: string;
  visible: boolean;
  rawData: ColumnType<RecordType, ActionKey>;
}>;
