import { useTranslation } from 'react-i18next';
import { ListingHeader } from '~/components/Listing';

interface Props {
  onCreate: () => void;
  creatable?: boolean;
}

export const CustomerListingHeader = ({ onCreate, creatable }: Props) => {
  const { t } = useTranslation(['customer']);

  return (
    <ListingHeader
      exportable={false}
      importable={false}
      creatable={creatable}
      onCreate={onCreate}
      title={t('customer:Customers')}
      createBtn={t('customer:create')}
      exportBtn={t('customer:export_data')}
      importBtn={t('customer:import_data')}
    />
  );
};
