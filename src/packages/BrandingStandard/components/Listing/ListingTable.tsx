import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getStatusMappingToLabels } from '../../constants/StatusMappingToLabels';
import { StatusMappingToTagColor } from '../../constants/StatusMappingToTagColor';
import { BrandingStandard } from '../../models/BrandingStandard';
import { ListingColumnType, ListingTable, ListingTableProps } from '~/components/Listing';
import { TableActions, Tag } from '~/shared/ReactJS';
import { dayjs } from '~/shared/Utilities';

interface Props
  extends Pick<
    ListingTableProps<BrandingStandard>,
    | 'currentPage'
    | 'dataSource'
    | 'loading'
    | 'offsetHeader'
    | 'onPaginationChange'
    | 'pageSize'
    | 'paginationMode'
    | 'totalRecords'
    | 'selectedRecordsState'
    | 'setSelectedRecordsState'
    | 'recordSelectable'
  > {
  onEdit: (record: BrandingStandard) => void;
  onDelete: (record: BrandingStandard) => void;
}

export const BrandingStandardListingTable = ({
  currentPage = 1,
  pageSize,
  totalRecords,
  dataSource = [],
  onPaginationChange,
  onEdit,
  onDelete,
  ...props
}: Props) => {
  const { t } = useTranslation(['common', 'branding_standard'] as const);

  const StatusMappingToLabels = useMemo(() => {
    return getStatusMappingToLabels(t);
  }, [t]);

  const columns: Array<ListingColumnType<BrandingStandard>> = useMemo(() => {
    return [
      {
        id: 'code',
        title: t('branding_standard:code'),
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
        title: t('branding_standard:name'),
        width: 320,
        render: record => record.brandingName,
      },
      {
        id: 'status',
        title: t('branding_standard:status'),
        width: 160,
        align: 'center',
        render: record => {
          return <Tag color={StatusMappingToTagColor[record.status]}>{StatusMappingToLabels[record.status]}</Tag>;
        },
      },
      {
        id: 'updated_by',
        title: t('branding_standard:updated_by'),
        width: 320,
        render: record => {
          return record.updatedBy || record.createdBy;
        },
      },
      {
        id: 'updated_at',
        title: t('branding_standard:updated_at'),
        width: 160,
        render: record => {
          return dayjs(record.updatedAt).format('DD/MM/YYYY HH:mm');
        },
      },
      {
        id: 'action',
        title: t('branding_standard:action'),
        width: 90,
        align: 'center',
        fixed: 'right',
        render: record => {
          return (
            <TableActions
              items={[
                {
                  key: '1',
                  label: t('branding_standard:edit'),
                  icon: <EditOutlined />,
                  onClick: () => onEdit?.(record),
                },
                {
                  key: '2',
                  danger: true,
                  label: <div>{t('branding_standard:delete')}</div>,
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
    <ListingTable<BrandingStandard>
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
