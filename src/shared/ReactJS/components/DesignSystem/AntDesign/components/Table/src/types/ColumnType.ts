import { ColumnGroupType as AntColumnGroupType, ColumnType as AntColumnType } from 'antd/es/table';

type TakeBaseProps = 'align' | 'title' | 'className' | 'fixed' | 'onCell';
type ColumnGroupType<RecordType> = Pick<AntColumnGroupType<RecordType>, TakeBaseProps | 'children'> & {
  render: (
    record: RecordType,
    index: number,
  ) => ReturnType<Exclude<AntColumnGroupType<RecordType>['render'], undefined>>;
};
type ColumnSingleType<RecordType, ActionKey> = Pick<AntColumnType<RecordType>, TakeBaseProps> & {
  actions?: {
    key: ActionKey;
    sort?: boolean;
    sortPriority?: number;
    sortStatic?: (a: RecordType, b: RecordType) => number;
  };
  render: (
    record: RecordType,
    index: number,
  ) => ReturnType<Exclude<AntColumnGroupType<RecordType>['render'], undefined>>;
};
type ColumnTypeOrGroupColumnType<RecordType extends Record<string, any>, ActionKey extends string> =
  | ColumnGroupType<RecordType>
  | ColumnSingleType<RecordType, ActionKey>;

export interface CellConfig {
  colSpan?: number;
  className?: string;
  onClick?: () => void;
}

export type ColumnType<
  RecordType extends Record<string, any>,
  ActionKey extends string = string,
> = ColumnTypeOrGroupColumnType<RecordType, ActionKey> & {
  width: number;
  hidden?: boolean;
  onCell?: (record: RecordType, index: number) => CellConfig;
};
