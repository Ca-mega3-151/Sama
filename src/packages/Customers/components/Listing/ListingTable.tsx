import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Customers } from '../../models/Customers';
import { CustomerListingSearchParams } from '../../types/ListingSearchParams';
import { ListingColumnType, ListingTable, ListingTableProps } from '~/components/Listing';
import { TableActions } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';

export interface SortValues extends FormQueryStateValues<CustomerListingSearchParams, 'firstName'> {}

interface Props
  extends Pick<
    ListingTableProps<Customers>,
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
  onEdit: (record: Customers) => void;
  onDelete: (record: Customers) => void;
}

export const CustomerListingTable = ({
  currentPage = 1,
  pageSize,
  totalRecords,
  dataSource = [],
  onPaginationChange,
  onEdit,
  onDelete,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'customer'] as const);

  const columns: Array<ListingColumnType<Customers, keyof SortValues>> = useMemo(() => {
    return [
      {
        id: 'firstName',
        title: t('customer:firstName'),
        width: 200,
        render: record => {
          return <div>{record.firstName}</div>;
        },
      },
      {
        id: 'lastName',
        title: t('customer:lastName'),
        width: 200,
        render: record => {
          return <div>{record.lastName}</div>;
        },
      },

      {
        id: 'phone',
        title: t('customer:phone'),
        width: 200,
        render: record => record.phone,
      },
      {
        id: 'email',
        title: t('customer:email'),
        width: 200,
        render: record => record.email,
      },
      {
        id: 'address',
        title: t('customer:address'),
        width: 200,
        render: record => record.address,
      },
      // {
      //   id: 'total',
      //   title: t('customer:total'),
      //   width: 320,
      //   render: record => record.total,
      // },
      {
        id: 'action',
        title: t('customer:action'),
        width: 90,
        align: 'center',
        fixed: 'right',
        render: record => {
          return (
            <TableActions
              items={[
                {
                  key: '1',
                  label: t('customer:edit'),
                  icon: <EditOutlined />,
                  onClick: () => onEdit?.(record),
                },
                {
                  key: '2',
                  danger: true,
                  label: <div>{t('customer:delete')}</div>,
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
    <ListingTable<Customers>
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
