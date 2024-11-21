import { useTranslation } from 'react-i18next';
import { ListingHeader } from '~/components/Listing';

interface Props {
  onCreate: () => void;
  creatable?: boolean;
}

export const VehiclesListingHeader = ({ onCreate, creatable }: Props) => {
  const { t } = useTranslation(['vehicles']);

  return (
    <ListingHeader
      exportable={false}
      importable={false}
      creatable={creatable}
      onCreate={onCreate}
      title={t('vehicles:vehicles')}
      createBtn={t('vehicles:create')}
      exportBtn={t('vehicles:export_data')}
      importBtn={t('vehicles:import_data')}
    />
  );
};
