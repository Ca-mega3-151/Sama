import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListingColumnType, ListingTable, ListingTableProps } from '~/components/Listing';
import { getStatusMappingToLabels } from '~/packages/Branding/constants/StatusMappingToLabels';
import { StatusMappingToTagColor } from '~/packages/Branding/constants/StatusMappingToTagColor';
import { Branding } from '~/packages/Branding/models/Branding';
import { BrandingListingSearchParams } from '~/packages/Branding/types/ListingSearchParams';
import { TableActions, Tag } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';
import { dayjs } from '~/shared/Utilities';

export interface SortValues extends FormQueryStateValues<BrandingListingSearchParams, 'brandingCode'> {}

interface Props
  extends Pick<
    ListingTableProps<Branding>,
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
  onEdit: (record: Branding) => void;
  onDelete: (record: Branding) => void;
}

export const BrandingListingTable = ({
  currentPage = 1,
  pageSize,
  totalRecords,
  dataSource = [],
  onPaginationChange,
  onEdit,
  onDelete,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'branding'] as const);

  const StatusMappingToLabels = useMemo(() => {
    return getStatusMappingToLabels(t);
  }, [t]);

  const columns: Array<ListingColumnType<Branding, keyof SortValues>> = useMemo(() => {
    return [
      {
        id: 'code',
        title: t('branding:code'),
        width: 320,
        actions: {
          key: 'brandingCode',
          sort: true,
        },
        render: record => {
          return <div>{record.brandingCode}</div>;
        },
      },
      {
        id: 'name',
        title: t('branding:name'),
        width: 320,
        render: record => record.brandingName,
      },
      {
        id: 'status',
        title: t('branding:status'),
        width: 160,
        align: 'center',
        render: record => {
          return <Tag color={StatusMappingToTagColor[record.status]}>{StatusMappingToLabels[record.status]}</Tag>;
        },
      },
      {
        id: 'updated_by',
        title: t('branding:updated_by'),
        width: 320,
        render: record => {
          return record.updatedBy || record.createdBy;
        },
      },
      {
        id: 'updated_at',
        title: t('branding:updated_at'),
        width: 160,
        render: record => {
          return dayjs(record.updatedAt).format('DD/MM/YYYY HH:mm');
        },
      },
      {
        id: 'action',
        title: t('branding:action'),
        width: 90,
        align: 'center',
        fixed: 'right',
        render: record => {
          return (
            <TableActions
              items={[
                {
                  key: '1',
                  label: t('branding:edit'),
                  icon: <EditOutlined />,
                  onClick: () => onEdit?.(record),
                },
                {
                  key: '2',
                  danger: true,
                  label: <div>{t('branding:delete')}</div>,
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
    <ListingTable<Branding>
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
