import { ReactNode } from 'react';
import { Table, TableProps } from '~/shared/ReactJS';
import { AnyRecord } from '~/shared/TypescriptUtilities';

export interface Props<RecordType extends AnyRecord, ActionKey extends string = string>
  extends Pick<
    TableProps<RecordType, ActionKey>,
    | 'currentPage'
    | 'pageSize'
    | 'totalRecords'
    | 'dataSource'
    | 'onPaginationChange'
    | 'loading'
    | 'paginationMode'
    | 'offsetHeader'
    | 'recordKey'
    | 'autoIndex'
    | 'checkMode'
    | 'columns'
    | 'nonePagination'
    | 'onSortChange'
    | 'plural'
    | 'renderStickyAction'
    | 'showSizeChanger'
    | 'singular'
    | 'size'
    | 'sortValues'
    | 'tableLayout'
    | 'selectedRecordsState'
    | 'setSelectedRecordsState'
    | 'recordSelectable'
  > {}

const ListingTableComponent = (props: Props<any>) => {
  const {
    currentPage,
    pageSize,
    recordKey,
    totalRecords,
    autoIndex,
    checkMode,
    columns,
    dataSource,
    loading,
    nonePagination,
    offsetHeader,
    onPaginationChange,
    onSortChange,
    paginationMode,
    plural,
    renderStickyAction,
    showSizeChanger,
    singular,
    size,
    sortValues,
    tableLayout = 'auto',
    recordSelectable,
    selectedRecordsState,
    setSelectedRecordsState,
  } = props;

  return (
    <Table
      paginationClassName="!-mx-4 md:!-mx-8"
      tableLayout={tableLayout}
      currentPage={currentPage}
      pageSize={pageSize}
      recordKey={recordKey}
      totalRecords={totalRecords}
      autoIndex={autoIndex}
      checkMode={checkMode}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      nonePagination={nonePagination}
      offsetHeader={offsetHeader}
      onPaginationChange={onPaginationChange}
      onSortChange={onSortChange}
      paginationMode={paginationMode}
      plural={plural}
      renderStickyAction={renderStickyAction}
      showSizeChanger={showSizeChanger}
      singular={singular}
      size={size}
      sortValues={sortValues}
      recordSelectable={recordSelectable}
      selectedRecordsState={selectedRecordsState}
      setSelectedRecordsState={setSelectedRecordsState}
    />
  );
};

ListingTableComponent.displayName = 'ListingTable';

export const ListingTable = ListingTableComponent as <RecordType extends AnyRecord, ActionKey extends string = string>(
  props: Props<RecordType, ActionKey>,
) => ReactNode;
