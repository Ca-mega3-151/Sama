import { ReactNode } from 'react';
import { Modal, ModalProps } from '~/shared/ReactJS';

export interface ModalConfirmNavigateProps extends Pick<ModalProps, 'open' | 'onCancel' | 'onOk' | 'confirmLoading'> {
  title: ReactNode;
  subTitle: ReactNode;
  description: ReactNode;
}

export const ModalConfirmNavigate = ({ title, description, subTitle, ...props }: ModalConfirmNavigateProps) => {
  return (
    <Modal {...props} title={title}>
      <p className="mb-1 font-semibold text-yy-primary">{subTitle}</p>
      <p>{description}</p>
    </Modal>
  );
};
