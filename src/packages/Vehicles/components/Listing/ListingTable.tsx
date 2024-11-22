import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Vehicles } from '../../models/Vehicles';
import { VehiclesListingSearchParams } from '../../types/ListingSearchParams';
import { ListingColumnType, ListingTable, ListingTableProps } from '~/components/Listing';
import { TableActions } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';

export interface SortValues extends FormQueryStateValues<VehiclesListingSearchParams, 'name'> {}

interface Props
  extends Pick<
    ListingTableProps<Vehicles>,
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
  onEdit: (record: Vehicles) => void;
  onDelete: (record: Vehicles) => void;
  onCopy: (record: Vehicles) => void;
}

export const VehiclesListingTable = ({
  currentPage = 1,
  pageSize,
  totalRecords,
  dataSource = [],
  onPaginationChange,
  onEdit,
  onDelete,
  onCopy,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'vehicles'] as const);

  const columns: Array<ListingColumnType<Vehicles, keyof SortValues>> = useMemo(() => {
    return [
      {
        id: 'code',
        title: t('vehicles:code'),
        width: 150,
        render: record => record.code,
      },
      {
        id: 'img',
        title: t('vehicles:img'),
        width: 130,
        render: record => <img src={record.img} alt="img" width={100} height={50} />,
      },
      {
        id: 'vehicleModel',
        title: t('vehicles:vehicleModel'),
        width: 320,
        render: record => record.vehicleModel,
      },
      {
        id: 'RegisterNumber',
        title: t('vehicles:registerNumber'),
        width: 200,
        render: record => record.registerNumber,
      },
      {
        id: 'total',
        title: t('vehicles:totalSeats'),
        width: 200,
        render: record => record.totalSeats,
      },

      {
        id: 'action',
        title: t('vehicles:action'),
        width: 90,
        align: 'center',
        fixed: 'right',
        render: record => {
          return (
            <TableActions
              items={[
                {
                  key: '2',
                  label: t('vehicles:copy'),
                  icon: <EditOutlined />,
                  onClick: () => onCopy?.(record),
                },
                {
                  key: '3',
                  label: t('vehicles:edit'),
                  icon: <EditOutlined />,
                  onClick: () => onEdit?.(record),
                },
                {
                  key: '4',
                  danger: true,
                  label: <div>{t('vehicles:delete')}</div>,
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
    <ListingTable<Vehicles>
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
