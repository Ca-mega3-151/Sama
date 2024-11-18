import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalWithI18nProps } from '../ModalWithI18n';
import { ModalDelete } from '~/shared/ReactJS';

export interface ModalConfirmDeleteProps
  extends Pick<ModalWithI18nProps, 'open' | 'onCancel' | 'onOk' | 'openVariant'> {
  title: ReactNode;
  description?: ReactNode;
  loading?: boolean;
}

export const ModalConfirmDelete = ({ title, description, loading, ...props }: ModalConfirmDeleteProps) => {
  const { t } = useTranslation(['components']);
  return (
    <ModalDelete
      {...props}
      title={title}
      description={description}
      okButtonProps={{ color: 'error' }}
      confirmLoading={loading}
      okText={t('components:ModalDelete.ok')}
      cancelText={t('components:ModalDelete.cancel')}
    />
  );
};
