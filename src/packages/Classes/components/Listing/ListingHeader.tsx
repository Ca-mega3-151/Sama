import { useTranslation } from 'react-i18next';
import { ListingHeader } from '~/components/Listing';

interface Props {
  onCreate: () => void;
  creatable?: boolean;
}

export const ClassesListingHeader = ({ onCreate, creatable }: Props) => {
  const { t } = useTranslation(['classes']);

  return (
    <ListingHeader
      exportable={false}
      importable={false}
      creatable={creatable}
      onCreate={onCreate}
      title={t('classes:Classes')}
      createBtn={t('classes:create')}
      exportBtn={t('classes:export_data')}
      importBtn={t('classes:import_data')}
    />
  );
};
