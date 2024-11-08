import { isEmpty, prop, uniqBy } from 'ramda';
import { DependencyList, ReactNode, useMemo, useState } from 'react';
import { useDeepCompareEffect, useIsMounted } from '../../../../../../hooks';
import { SelectOption, SelectSingle, SelectSingleProps } from '../../../components/Select';
import { AnyRecord } from '~/shared/TypescriptUtilities';

interface OnPrepareDoneParameters<ModelId extends string, Model> {
  /** The transformed options to be displayed in the select dropdown. These options are created from the response data and any additional models. */
  options: SelectOption<ModelId, Model>[];
  /** A flag indicating whether there was a warning. This flag will be `true` if the value passed to this component is not found in the response of the service. */
  isWarning: boolean;
}

export interface Props<Model extends AnyRecord, ModelId extends string>
  extends Omit<
    SelectSingleProps<ModelId>,
    'options' | 'onChange' | 'filterOption' | 'onDropdownVisibleChange' | 'open' | 'searchValue' | 'onSearch'
  > {
  /** A function to fetch data from a service. */
  service: () => Promise<Model[]> | Model[];
  /** A function that transforms a model object into a selectable option. It may return `undefined` if the model does not meet the criteria for selection. */
  transformToOption: (model: Model) => SelectOption<ModelId, Model> | undefined;
  /** Callback function triggered when the selected values change. */
  onChange?: (value: ModelId | undefined, options: SelectOption<ModelId, Model> | undefined) => void;
  /** An array of dependencies to watch for fetching data. */
  depsFetch?: DependencyList;
  /** An array of dependencies to watch for transforming options. */
  depsTransformOption?: DependencyList;
  /** Used to display options while fetching models. */
  defaultModels?: Model[];
  /** Used to display additional options. For example, if a model is deleted in the database and the fetch fails to retrieve it from the API, it will not be displayed correctly. */
  additionalModels?: Model[];
  /** Callback triggered after options preparation, providing details about the prepared options and any warnings encountered. */
  onPrepareDone?: (params: OnPrepareDoneParameters<ModelId, Model>) => void;
  /** A text message to display when there is a warning, such as when the `value` passed to the component is not found in the response from the `service`. This can be a static message or a function that returns a message based on the `value` passed. */
  warningText?: (value: ModelId) => string;
  /** A function to provide a custom loading message while fetching data. This function takes the current `value` and returns a string that represents the loading state. */
  loadingText?: (value: ModelId | undefined) => string;
}

/**
 * SelectSingleDecoupling component provides a more flexible approach for working with Select components, allowing for separate data fetching and option transformation functions.
 * @template Model - The type of the data model.
 * @template ModelId - The type of the selected model IDs.
 * @param {Props<Model, ModelId>} props - The component props.
 * @returns {ReactNode} - The rendered SelectSingleDecoupling component.
 */
export const SelectSingleDecoupling = <Model extends AnyRecord, ModelId extends string>({
  transformToOption,
  service,
  onChange,
  loading,
  depsFetch = [],
  depsTransformOption = [],
  allowClear = true,
  autoClearSearchValue,
  className,
  direction,
  disabled,
  notFoundContent,
  optionLabelProp,
  placeholder,
  value,
  defaultModels = [],
  additionalModels = [],
  onPrepareDone,
  warningText,
  loadingText,
  readOnly,
  valueVariant,
  showSearch,
  size,
}: Props<Model, ModelId>): ReactNode => {
  const isMounted = useIsMounted();
  const [isFetching, setIsFetching] = useState(false);
  const [serviceResponseState, setServiceResponseState] = useState<Model[]>(defaultModels.concat(additionalModels));

  const [state, setState] = useState<{
    options: SelectOption<ModelId, Model>[];
    valueState: ModelId | undefined;
    isPreparedDateOnce: boolean;
  }>({
    options: defaultModels.concat(additionalModels).reduce<SelectOption<ModelId, Model>[]>((result, item) => {
      const option = transformToOption(item);
      if (option) {
        return result.concat(option);
      }
      return result;
    }, []),
    valueState: value,
    isPreparedDateOnce: false,
  });

  const handleSelect: SelectSingleProps<ModelId, Model>['onChange'] = (values, options) => {
    const isUndefined = isEmpty(values) || null;
    onChange?.(isUndefined ? undefined : values, isUndefined ? undefined : options);
  };

  const handleTransformServiceResponse = (serviceResponse?: Model[]): void => {
    const prepareDoneParameters: Omit<OnPrepareDoneParameters<ModelId, Model>, 'options'> = {
      isWarning: !!value,
    };
    const response = serviceResponse ?? serviceResponseState;
    const transformData = response.reduce<SelectOption<ModelId, Model>[]>((result, item) => {
      const option = transformToOption(item);

      if (option?.value === value) {
        prepareDoneParameters.isWarning = false;
      }

      if (option) {
        return result.concat({
          ...option,
          rawData: item,
        });
      }
      return result;
    }, []);
    const uniqData = uniqBy(prop('value'), transformData);

    setState({
      options: uniqData,
      valueState: prepareDoneParameters.isWarning && value && warningText ? (warningText(value) as ModelId) : value,
      isPreparedDateOnce: true,
    });
    onPrepareDone?.({
      ...prepareDoneParameters,
      options: uniqData,
    });
  };

  const handleFetch = async (): Promise<void> => {
    setIsFetching(true);
    try {
      const items = await service();
      setServiceResponseState(items.concat(additionalModels));
      handleTransformServiceResponse(items.concat(additionalModels));
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useDeepCompareEffect(() => {
    handleFetch();
  }, [...depsFetch]);

  useDeepCompareEffect(() => {
    if (!isMounted || isFetching) {
      return;
    }
    handleTransformServiceResponse();
  }, [value, ...depsTransformOption]);

  const mergedValue = useMemo(() => {
    if (loadingText && !state.isPreparedDateOnce) {
      return loadingText(value);
    }
    return state.valueState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isPreparedDateOnce, state.valueState]);

  return (
    <SelectSingle
      key={Number(state.isPreparedDateOnce)}
      options={state.options}
      loading={loading || isFetching}
      allowClear={allowClear}
      autoClearSearchValue={autoClearSearchValue}
      className={className}
      direction={direction}
      disabled={disabled || !state.isPreparedDateOnce}
      notFoundContent={notFoundContent}
      optionLabelProp={optionLabelProp}
      placeholder={placeholder}
      readOnly={readOnly}
      valueVariant={valueVariant}
      showSearch={showSearch}
      size={size}
      onChange={handleSelect}
      value={mergedValue as ModelId}
    />
  );
};
