import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Services } from '../../models/Services';
import { ServiceListingSearchParams } from '../../types/ListingSearchParams';
import { ListingColumnType, ListingTable, ListingTableProps } from '~/components/Listing';
import { TableActions } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';

export interface SortValues extends FormQueryStateValues<ServiceListingSearchParams, 'name'> {}

interface Props
  extends Pick<
    ListingTableProps<Services>,
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
  onEdit: (record: Services) => void;
  onDelete: (record: Services) => void;
}

export const ServiceListingTable = ({
  currentPage = 1,
  pageSize,
  totalRecords,
  dataSource = [],
  onPaginationChange,
  onEdit,
  onDelete,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'service'] as const);

  const columns: Array<ListingColumnType<Services, keyof SortValues>> = useMemo(() => {
    return [
      {
        id: 'name',
        title: t('service:name'),
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
        id: 'description',
        title: t('service:description'),
        width: 420,
        render: record => record.description,
      },
      {
        id: 'action',
        title: t('service:action'),
        width: 90,
        align: 'center',
        fixed: 'right',
        render: record => {
          return (
            <TableActions
              items={[
                {
                  key: '1',
                  label: t('service:edit'),
                  icon: <EditOutlined />,
                  onClick: () => onEdit?.(record),
                },
                {
                  key: '2',
                  danger: true,
                  label: <div>{t('service:delete')}</div>,
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
    <ListingTable<Services>
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
