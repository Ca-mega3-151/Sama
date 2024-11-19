import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { ServiceListingSearchParams } from '../../types/ListingSearchParams';
import { serviceLisitngUrlSearchParamsSchema } from '../../utils/listingUrlSearchParams';
import { getCountForFilterDrawer } from '~/components/FilterDrawer';
import { SearchNFilter } from '~/components/Listing';
import { Form } from '~/overrides/remix';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { SelectStatus } from '~/packages/BrandingFullFeatures/components/SelectVariants/SelectStatus';
import { useDeepCompareEffect } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';

type FormFilterValues = FormQueryStateValues<ServiceListingSearchParams, 'status'>;
interface FormFilterProps {
  onFilter?: (formFilterValues: FormFilterValues) => void;
  onResetFilter?: () => void;
  isSubmiting?: boolean;
  formFilterValues: FormFilterValues;
  searchValue?: string;
  onSearch?: (value: string) => void;
  containerClassName?: string;
}

const UID = 'FORM_FILTER_LISTING_SERVICE';
export const ServiceFormSearchNFilter = ({
  formFilterValues,
  searchValue,
  onSearch,
  isSubmiting = false,
  onResetFilter,
  onFilter,
  containerClassName,
}: FormFilterProps) => {
  const { t } = useTranslation(['common', 'service']);

  const { handleSubmit, reset, watch, setValue } = useRemixForm<FormFilterValues>({
    mode: 'onSubmit',
    defaultValues: formFilterValues,
    resolver: zodResolver(serviceLisitngUrlSearchParamsSchema),
    submitHandlers: {
      onValid: onFilter,
    },
  });
  const [status] = watch(['status']);

  const handleResetFormFilterValues = () => {
    reset({ status: undefined });
    onResetFilter?.();
  };

  useDeepCompareEffect(() => {
    reset(formFilterValues);
  }, [formFilterValues]);

  return (
    <SearchNFilter
      inputClassName="md:!max-w-[450px]"
      containerClassName={containerClassName}
      isSubmiting={isSubmiting}
      search={{
        placeholder: t('service:search_placeholder'),
        searchValue: searchValue,
        onSearch: onSearch,
      }}
      filter={{
        uid: UID,
        onReset: handleResetFormFilterValues,
        count: getCountForFilterDrawer({ fieldKeys: ['status'], formFilterValues }),
        form: (
          <Form method="GET" id={UID} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <SelectStatus status={status} onChange={value => setValue('status', value)} />
            </div>
          </Form>
        ),
      }}
    />
  );
};
