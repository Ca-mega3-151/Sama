import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Popconfirm, Button, ButtonProps } from '~/shared/ReactJS';

interface Props {
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  cancelProps?: Omit<ButtonProps, 'onClick'>;
  okProps?: Omit<ButtonProps, 'onClick'>;
  okConfirmProps?: Omit<ButtonProps, 'onClick'>;
  Left?: ReactNode;
  isLoading?: boolean;
  className?: string;
  fitted?: boolean;
  Cancel?: (BaseButton: ReactNode) => ReactNode;
  Ok?: (BaseButton: ReactNode) => ReactNode;
  Other?: ReactNode;
  withoutConfirm?: boolean;
}

export const MutationFooter = ({
  cancelText,
  okText,
  onCancel,
  onOk,
  cancelProps,
  okProps,
  Left,
  isLoading,
  className,
  fitted,
  okConfirmProps,
  Cancel = BaseButton => BaseButton,
  Ok = BaseButton => BaseButton,
  Other,
  withoutConfirm = true,
}: Props) => {
  const { t } = useTranslation(['components']);

  const cancelText_ = cancelText ?? t('components:FormMutation.cancel').toString();
  const okText_ = okText ?? t('components:FormMutation.save').toString();

  const BaseCancelButton = (
    <Button {...cancelProps} disabled={cancelProps?.disabled ?? isLoading} onClick={onCancel}>
      {cancelProps?.children ?? cancelText_}
    </Button>
  );
  const BaseOkButton = (
    <Button
      {...okProps}
      {...(withoutConfirm ? okConfirmProps : {})}
      color={okProps?.color ?? 'primary'}
      loading={isLoading}
      disabled={isLoading}
      className={okProps?.className}
    >
      {okProps?.children ?? okText_}
    </Button>
  );

  return (
    <div
      className={classNames(
        'border-t-solid sticky bottom-0 z-10 flex flex-col items-end justify-between gap-2 border-t border-t-neutral-200 bg-white py-4 px-8 sm:flex-row sm:items-center rounded-bl-[inherit] rounded-br-[inherit] -ml-4 -mr-4 md:-mr-8 md:-ml-8',
        className,
      )}
    >
      <div className="flex-1">{Left}</div>
      <div className={classNames('flex items-center justify-end gap-3', fitted ? 'w-full' : '')}>
        {Cancel(BaseCancelButton)}
        {Other}
        {withoutConfirm ? (
          Ok(BaseOkButton)
        ) : (
          <Popconfirm
            okButtonProps={{ ...okConfirmProps, loading: okConfirmProps?.loading || isLoading }}
            onConfirm={onOk}
            okText={t('components:FormMutation.ok')}
            cancelText={t('components:FormMutation.cancel')}
            content={t('components:FormMutation.confirm_description')}
          >
            {Ok(BaseOkButton)}
          </Popconfirm>
        )}
      </div>
    </div>
  );
};
