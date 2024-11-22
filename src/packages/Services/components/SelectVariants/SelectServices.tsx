import { Services } from '../../models/Services';
import { getServices } from '../../services/getServices';
import { SelectMultipleDecoupling, SelectMultipleDecouplingProps } from '~/shared/ReactJS';

interface Props {
  services?: Services['_id'][];
  onChange?: SelectMultipleDecouplingProps<Services, Services['_id']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder: string;
}

export const SelectServices = ({ disabled, services, allowClear = true, placeholder, onChange }: Props) => {
  return (
    <SelectMultipleDecoupling<Services, Services['_id']>
      allowClear={allowClear}
      placeholder={placeholder}
      disabled={disabled}
      value={services}
      onChange={onChange}
      service={async () => {
        const response = await getServices({
          page: 1,
          pageSize: 99999,
          searcher: {},
          sorter: {},
        });
        return response.data.hits;
      }}
      transformToOption={service => {
        return {
          label: service['name'],
          searchValue: service['name'],
          value: service['_id'],
          rawData: service,
        };
      }}
      className="w-full"
    />
  );
};
