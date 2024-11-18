import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { FC, ReactNode } from 'react';
import { IconAddLinear } from '~/components/Icons/IconAddLinear';
import { Button } from '~/shared/ReactJS';

export interface ListingHeaderProps {
  title: ReactNode;
  exportBtn: ReactNode;
  importBtn: ReactNode;
  createBtn: ReactNode;
  creatable?: boolean;
  exportable?: boolean;
  importable?: boolean;
  onExport?: () => void;
  onImport?: () => void;
  onCreate?: () => void;
  isExporting?: boolean;
  onOpenModalConfigColumns?: () => void;
}

export const ListingHeader: FC<ListingHeaderProps> = ({
  title,
  exportBtn,
  exportable = false,
  importBtn,
  importable = false,
  createBtn,
  creatable = false,
  onCreate,
  onExport,
  onImport,
  isExporting,
}) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-1">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        {exportable && (
          <Button loading={isExporting} onClick={onExport} icon={<ExportOutlined />}>
            {exportBtn}
          </Button>
        )}
        {importable && (
          <Button onClick={onImport} className="hidden sm:flex" icon={<ImportOutlined />}>
            {importBtn}
          </Button>
        )}
        {creatable && (
          <Button onClick={onCreate} icon={<IconAddLinear className="text-2xl" />} color="primary">
            {createBtn}
          </Button>
        )}
      </div>
    </div>
  );
};
