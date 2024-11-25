import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ListingHeader } from '~/components/Listing';
import { getStatusMappingToLabels } from '~/packages/Branding/constants/StatusMappingToLabels';
import { StatusMappingToTagColor } from '~/packages/Branding/constants/StatusMappingToTagColor';
import { Branding } from '~/packages/Branding/models/Branding';
import { BrandingListingSearchParams } from '~/packages/Branding/types/ListingSearchParams';
import { Button, Segmented, Table, TableActions, TableColumnType, TableProps, Tag } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';
import { dayjs } from '~/shared/Utilities';

export interface SortValues extends FormQueryStateValues<BrandingListingSearchParams, 'brandingCode'> {}

interface Props
  extends Pick<
    TableProps<Branding, keyof SortValues>,
    | 'onSortChange'
    | 'totalRecords'
    | 'currentPage'
    | 'pageSize'
    | 'onPaginationChange'
    | 'loading'
    | 'selectedRecordsState'
    | 'setSelectedRecordsState'
  > {
  sortValues: Exclude<TableProps<Branding, keyof SortValues>['sortValues'], undefined>;
  data: Branding[] | undefined;
  onEdit?: (record: Branding) => void;
  onDelete?: (record: Branding) => void;
  onCreate?: () => void;
}

export const BrandingListingTable = ({
  loading,
  data = [],
  currentPage = 1,
  totalRecords = 0,
  pageSize,
  onPaginationChange,
  sortValues,
  onSortChange,
  onEdit,
  onDelete,
  onCreate,
  selectedRecordsState,
  setSelectedRecordsState,
}: Props) => {
  const { t } = useTranslation(['common', 'branding'] as const);

  const StatusMappingToLabels = useMemo(() => {
    return getStatusMappingToLabels(t);
  }, [t]);

  const columns: Array<TableColumnType<Branding, keyof SortValues>> = useMemo(() => {
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
        width: 80,
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
    <div className="flex flex-1 flex-col">
      <ListingHeader
        onCreate={onCreate}
        title={t('branding:brandings')}
        createBtn={t('branding:create')}
        exportBtn={t('branding:export_data')}
        importBtn={t('branding:import_data')}
      />
      <Table
        selectedRecordsState={selectedRecordsState}
        setSelectedRecordsState={setSelectedRecordsState}
        offsetHeader={84}
        title={
          <Segmented
            items={[
              { value: 'ACTIVE', label: StatusMappingToLabels['ACTIVE'] },
              { value: 'DEACTIVE', label: StatusMappingToLabels['DEACTIVE'] },
            ]}
          />
        }
        displayColumnsConfigable={{
          enable: true,
          type: 'advance',
          texts: {
            title: t('common:displayed_fields'),
            selectAllLabel: t('common:all'),
            showCurrentState: ({ selected, total }) => {
              return t('common:quantity_columns_selected_on_total', { selected, total });
            },
          },
        }}
        renderStickyAction={({ selectedRecords }) => {
          return (
            <div className="flex h-12 w-[400px] max-w-md items-center gap-4">
              <div className="flex grow items-center justify-between">
                <div className="font-medium">
                  {t('common:quantity_records_selected', {
                    quantity: selectedRecords.length,
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Button icon={<DeleteOutlined />} type="text" color="error" className="!text-white">
                    {t('branding:delete')}
                  </Button>
                </div>
              </div>
            </div>
          );
        }}
        recordKey={record => record._id}
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        onPaginationChange={onPaginationChange}
        sortValues={sortValues}
        onSortChange={onSortChange}
        loading={loading}
        columns={columns}
        dataSource={data}
        plural={({ from, to }) => t('common:showing_range_results', { from, to, total: totalRecords })}
        singular={({ from, to }) => t('common:showing_range_result', { from, to, total: totalRecords })}
        paginationClassName="!-mx-4 md:!-mx-8"
      />
    </div>
  );
};
