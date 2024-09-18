import { PaginationProps as AntPaginationProps, Table as AntTable, TableProps as AntTableProps } from 'antd';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import { useInitializeContext } from '../../../base';
import { SortIcon } from './components/SortIcon/SortIcon';
import './styles.css';
import { ColumnType } from './types/ColumnType';
import { SortOrder, SortValues } from './types/Sorter';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { pluralize, toArray } from '~/shared/Utilities';

export interface Props<RecordType extends AnyRecord, ActionKey extends string = string>
  extends Pick<
    AntTableProps<RecordType>,
    'className' | 'dataSource' | 'expandable' | 'direction' | 'indentSize' | 'loading' | 'rowKey' | 'size'
  > {
  /** The current page number.  */
  currentPage: number | undefined;
  /** The number of items to display per page. */
  pageSize: number;
  /** The total number of records in the data source. */
  totalRecords: number | undefined;
  /** Function to generate a plural label for the total count, based on the visible range. */
  plural?: (params: { from: number; to: number }) => string;
  /** Function to generate a singular label for the total count, based on the visible range. */
  singular?: (params: { from: number; to: number }) => string;
  /** The pagination mode. Defaults to 'sticky'. */
  paginationMode?: 'sticky' | 'none';
  /** An array of columns to be displayed in the table. */
  columns?: ColumnType<RecordType, ActionKey>[];
  /** Whether to disable pagination entirely. */
  nonePagination?: boolean;
  /** Whether to display a size changer in the pagination controls. */
  showSizeChanger?: boolean;
  /** Custom CSS class for the pagination controls. */
  paginationClassName?: string;
  /** Locale settings for the pagination controls. */
  locale?: AntPaginationProps['locale'];
  /** Options for the number of items per page in the size changer dropdown. */
  sizeChangerOptions?: number[];
  /** Callback function triggered when the page or pageSize changes. */
  onPaginationChange?: (params: { page: number; pageSize: number }) => void;
  /** Callback function triggered when the sort values change. */
  onSortChange?: (sortValues: SortValues<ActionKey>) => void;
  /** Function to render a custom sort icon based on the current sort order. */
  sortIcon?: (order: SortOrder) => ReactNode;
  /** Current sort values for the columns. */
  sortValues?: SortValues<ActionKey>;
}

/**
 * The `Table` component extends the functionality of the Ant Design Table component by providing additional customization and support for stricter type safety.
 *
 * @template RecordType - The type of the data record.
 * @template ActionKey - The type of keys for actions, defaults to string.
 *
 * @param {string} [className] - Custom CSS class for the table.
 * @param {Array<RecordType>} [dataSource] - Data source array for the table.
 * @param {Object} [expandable] - Configuration for expandable rows.
 * @param {('ltr' | 'rtl')} [direction] - Table layout direction ('ltr' or 'rtl').
 * @param {number} [indentSize] - Size of the indent for tree data.
 * @param {boolean} [loading] - Whether the table is in a loading state.
 * @param {string | Function} [rowKey] - Unique key for each row.
 * @param {('small' | 'middle' | 'large')} [size] - Size of the table.
 * @param {number} [currentPage=1] - The current page number.
 * @param {number} pageSize - The number of items per page.
 * @param {number} [totalRecords=0] - The total number of records in the data source.
 * @param {Function} [plural] - Function to generate a plural label for the total count, based on the visible range.
 * @param {Function} [singular] - Function to generate a singular label for the total count, based on the visible range.
 * @param {('sticky' | 'none')} [paginationMode='sticky'] - The pagination mode.
 * @param {Array} [columns=[]] - An array of columns to be displayed in the table.
 * @param {boolean} [nonePagination=false] - Whether to disable pagination entirely.
 * @param {boolean} [showSizeChanger=false] - Whether to display a size changer dropdown in the pagination controls.
 * @param {string} [paginationClassName] - Custom CSS class for the pagination controls.
 * @param {Object} [locale] - Locale settings for the pagination controls.
 * @param {Array} [sizeChangerOptions=[]] - Options for the number of items per page in the size changer dropdown.
 * @param {Function} [onPaginationChange] - Callback function triggered when the page or pageSize changes.
 * @param {Function} [onSortChange] - Callback function triggered when the sort values change.
 * @param {Function} [sortIcon] - Function to render a custom sort icon based on the current sort order.
 * @param {Object} [sortValues] - Current sort values for the columns.
 * @returns {ReactNode} The rendered Table component.
 */
export const Table = <RecordType extends AnyRecord, ActionKey extends string = string>({
  currentPage = 1,
  pageSize,
  totalRecords = 0,
  plural = (): string => '',
  singular = (): string => '',
  paginationMode = 'sticky',
  columns = [],
  nonePagination,
  className,
  dataSource,
  expandable,
  direction,
  indentSize,
  loading,
  rowKey,
  size,
  showSizeChanger = false,
  paginationClassName,
  locale,
  sizeChangerOptions = [],
  onPaginationChange,
  sortIcon,
  sortValues,
  onSortChange,
}: Props<RecordType, ActionKey>): ReactNode => {
  useInitializeContext();

  const from = Math.max((currentPage - 1) * pageSize, 0) + 1;
  const to = Math.min(currentPage * pageSize, totalRecords);

  const { columns_, tableWidth }: { columns_: Exclude<AntTableProps['columns'], undefined>; tableWidth: number } =
    useMemo(() => {
      let tableWidth = 0;
      const columns_ = columns.reduce<Exclude<AntTableProps['columns'], undefined>>((result, column) => {
        if (column.hidden) {
          return result;
        }
        tableWidth += column.width;
        const columnActionKey = 'actions' in column ? column.actions?.key : undefined;
        const sortValue = sortValues && columnActionKey ? sortValues[columnActionKey] : undefined;

        return result.concat({
          ...column,
          render: (_, record, index) => {
            return column.render(record, index);
          },
          // Sorter
          key: columnActionKey,
          sorter:
            'actions' in column && column.actions?.key
              ? {
                  compare: column.actions.sortStatic ? column.actions.sortStatic : (): number => 0,
                  multiple: column.actions.sortPriority,
                }
              : false,
          sortOrder: sortValue?.order,
          showSorterTooltip: false,
          sortIcon: ({ sortOrder }) => {
            const sortOrder_ = sortOrder ?? undefined;
            if (sortIcon) {
              return sortIcon(sortOrder_);
            }
            return <SortIcon order={sortOrder_} />;
          },
        });
      }, []);
      return {
        columns_,
        tableWidth,
      };
    }, [columns, sortIcon, sortValues]);

  return (
    <AntTable
      bordered
      tableLayout="auto"
      size={size}
      rowKey={rowKey}
      loading={loading}
      indentSize={indentSize}
      direction={direction}
      dataSource={dataSource}
      expandable={expandable}
      columns={columns_ as AntTableProps['columns']}
      className={classNames(
        'AntTable__container',
        paginationMode === 'sticky' ? 'AntTable--paginationSticky' : 'AntTable--paginationNone',
        className,
      )}
      scroll={{
        x: tableWidth,
      }}
      onChange={(_pagination, _filter, sorter, extra) => {
        if (extra.action === 'sort') {
          const nextSortValues = toArray(sorter).reduce<SortValues<ActionKey>>((result, item) => {
            if (typeof item.columnKey === 'string') {
              return {
                ...result,
                [item.columnKey as ActionKey]: {
                  order: item.order,
                  priority:
                    typeof item.column?.sorter === 'object' && 'multiple' in item.column.sorter
                      ? item.column?.sorter.multiple ?? 0
                      : 0,
                },
              };
            }
            return result;
          }, {} as SortValues<ActionKey>);
          onSortChange?.(nextSortValues);
        }
      }}
      pagination={
        nonePagination
          ? false
          : {
              simple: false,
              showLessItems: true,
              hideOnSinglePage: false,
              className: classNames('AntTable__pagination', paginationClassName),
              showSizeChanger: showSizeChanger,
              total: totalRecords,
              current: currentPage,
              pageSizeOptions: sizeChangerOptions,
              locale,
              pageSize,
              onChange: (page, pageSize) => onPaginationChange?.({ page, pageSize }),
              showTotal: (total): ReactNode => {
                if (!total) {
                  return null;
                }
                return (
                  <Highlighter
                    highlightClassName="AntTable__text-range--highlight"
                    searchWords={[/\d+/g]}
                    textToHighlight={pluralize({
                      count: totalRecords,
                      singular: singular({ from, to }),
                      plural: plural({ from, to }),
                    })}
                  />
                );
              },
            }
      }
    />
  );
};
