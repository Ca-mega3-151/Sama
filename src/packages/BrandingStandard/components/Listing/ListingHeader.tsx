import { useTranslation } from 'react-i18next';
import { ListingHeader } from '~/components/Listing';

interface Props {
  onCreate: () => void;
  creatable?: boolean;
}

export const BrandingListingHeader = ({ onCreate, creatable }: Props) => {
  const { t } = useTranslation(['branding']);

  return (
    <ListingHeader
      exportable={false}
      importable={false}
      creatable={creatable}
      onCreate={onCreate}
      title={t('branding:brandings')}
      createBtn={t('branding:create')}
      exportBtn={t('branding:export_data')}
      importBtn={t('branding:import_data')}
    />
  );
};
