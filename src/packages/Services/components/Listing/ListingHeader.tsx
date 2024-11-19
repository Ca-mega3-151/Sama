import { useTranslation } from 'react-i18next';
import { ListingHeader } from '~/components/Listing';

interface Props {
  onCreate: () => void;
  creatable?: boolean;
}

export const ServiceListingHeader = ({ onCreate, creatable }: Props) => {
  const { t } = useTranslation(['service']);

  return (
    <ListingHeader
      exportable={false}
      importable={false}
      creatable={creatable}
      onCreate={onCreate}
      title={t('service:service')}
      createBtn={t('service:create')}
      exportBtn={t('service:export_data')}
      importBtn={t('service:import_data')}
    />
  );
};
