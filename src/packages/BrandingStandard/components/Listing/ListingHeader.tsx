import { useTranslation } from 'react-i18next';
import { ListingHeader } from '~/components/Listing';

interface Props {
  onCreate: () => void;
  creatable?: boolean;
}

export const BrandingStandardListingHeader = ({ onCreate, creatable }: Props) => {
  const { t } = useTranslation(['branding_standard']);

  return (
    <ListingHeader
      exportable={false}
      importable={false}
      creatable={creatable}
      onCreate={onCreate}
      title={t('branding_standard:brandings')}
      createBtn={t('branding_standard:create')}
      exportBtn={t('branding_standard:export_data')}
      importBtn={t('branding_standard:import_data')}
    />
  );
};
