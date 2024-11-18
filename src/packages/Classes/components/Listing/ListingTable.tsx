import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Classes } from '../../models/Classes';
import { ClassesListingSearchParams } from '../../types/ListingSearchParams';
import { ListingColumnType, ListingTable, ListingTableProps } from '~/components/Listing';
import { TableActions } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';

export interface SortValues extends FormQueryStateValues<ClassesListingSearchParams, 'name'> {}

interface Props
  extends Pick<
    ListingTableProps<Classes>,
    | 'currentPage'
    | 'dataSource'
    | 'loading'
    | 'offsetHeader'
    | 'onPaginationChange'
    | 'onSortChange'
    | 'pageSize'
    | 'paginationMode'
    | 'sortValues'
    | 'totalRecords'
    | 'selectedRecordsState'
    | 'setSelectedRecordsState'
    | 'recordSelectable'
  > {
  onEdit: (record: Classes) => void;
  onDelete: (record: Classes) => void;
}

export const ClassesListingTable = ({
  currentPage = 1,
  pageSize,
  totalRecords,
  dataSource = [],
  onPaginationChange,
  onEdit,
  onDelete,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'classes'] as const);

  const columns: Array<ListingColumnType<Classes, keyof SortValues>> = useMemo(() => {
    return [
      {
        id: 'name',
        title: t('classes:name'),
        width: 320,
        // actions: {
        //   key: 'name',
        //   sort: true,
        // },
        render: record => {
          return <div>{record.name}</div>;
        },
      },
      {
        id: 'code',
        title: t('classes:code'),
        width: 320,
        render: record => record.code,
      },
      {
        id: 'action',
        title: t('classes:action'),
        width: 90,
        align: 'center',
        fixed: 'right',
        render: record => {
          return (
            <TableActions
              items={[
                {
                  key: '1',
                  label: t('classes:edit'),
                  icon: <EditOutlined />,
                  onClick: () => onEdit?.(record),
                },
                {
                  key: '2',
                  danger: true,
                  label: <div>{t('classes:delete')}</div>,
                  icon: <DeleteOutlined />,
                  onClick: () => onDelete?.(record),
                },
              ]}
            />
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <ListingTable<Classes>
      {...props}
      dataSource={dataSource}
      columns={columns}
      currentPage={currentPage}
      pageSize={pageSize}
      totalRecords={totalRecords}
      recordKey={record => record._id}
      plural={({ from, to }) => {
        return t('common:showing_range_results', {
          from,
          to,
          total: totalRecords,
        });
      }}
      onPaginationChange={onPaginationChange}
      singular={({ from, to }) => {
        return t('common:showing_range_result', {
          from,
          to,
          total: totalRecords,
        });
      }}
    />
  );
};
