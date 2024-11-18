import { isEmpty, prop, uniqBy } from 'ramda';
import { DependencyList, ReactNode, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { SelectMultiple, SelectMultipleProps, SelectOption } from '../../../components';
import { AnyRecord } from '~/shared/TypescriptUtilities';

const LOADING_FOR_EMPTY_VALUE = 'UNDEFINED';

interface OnPrepareDoneParameters<ModelId extends string, Model> {
  /** The transformed options to be displayed in the select dropdown. These options are created from the response data and any additional models. */
  options: SelectOption<ModelId, Model>[];
  /** A flag indicating whether there was a warning. This flag will be `true` if `itemsState` contains any item with type 'unmatched', and `false` otherwise. */
  isWarning: boolean;
  /** An array representing the state of items, whether they matched or not. */
  itemsState: Array<{
    /** The type of the item state, either matched or unmatched. */
    type: 'matched' | 'unmatched';
    /** The value of the item. */
    value: ModelId;
  }>;
}

export interface Props<Model extends AnyRecord, ModelId extends string>
  extends Omit<
    SelectMultipleProps<ModelId>,
    'options' | 'onChange' | 'filterOption' | 'onDropdownVisibleChange' | 'open' | 'searchValue' | 'onSearch'
  > {
  /** A function to fetch data from a service. */
  service: () => Promise<Model[]> | Model[];
  /** A function that transforms a model object into a selectable option. It may return `undefined` if the model does not meet the criteria for selection. */
  transformToOption: (model: Model) => SelectOption<ModelId, Model> | undefined;
  /** Callback function triggered when the selected values change. */
  onChange?: (value: ModelId[] | undefined, options: SelectOption<ModelId, Model>[] | undefined) => void;
  /** An array of dependencies to watch for fetching data. */
  depsFetch?: DependencyList;
  /** An array of dependencies to watch for transforming options. */
  depsTransformOption?: DependencyList;
  /** Used to display options while fetching models. */
  defaultModels?: Model[];
  /** Used to display additional options. For example, if a model is deleted in the database and the fetch fails to retrieve it from the API, it will not be displayed correctly. */
  additionalModels?: Model[];
  /** Callback function triggered when the preparation is done. This function can be used to handle warnings if the value passed to this component is not found in the response of the service. */
  onPrepareDone?: (params: OnPrepareDoneParameters<ModelId, Model>) => void;
  /** A text message to display when there is a warning, such as when the `value` passed to the component is not found in the response from the `service`. This can be a static message or a function that returns a message based on the `value` passed. */
  warningText?: (value: ModelId) => string;
  /** A function to provide a custom initializing message. This function takes the current `value` and returns a string that represents the initializing state. */
  initializingText?: (value: ModelId | undefined) => string;
}

/**
 * SelectMultipleDecoupling component provides a more flexible approach for working with Select components, allowing for separate data fetching and option transformation functions.
 * @template Model - The type of the data model.
 * @template ModelId - The type of the selected model IDs.
 * @param {Props<Model, ModelId>} props - The component props.
 * @returns {ReactNode} - The rendered SelectMultipleDecoupling component.
 */
export const SelectMultipleDecoupling = <Model extends AnyRecord, ModelId extends string>({
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
  initializingText,
  readOnly,
  valueVariant,
  showSearch,
  size,
  footer,
}: Props<Model, ModelId>): ReactNode => {
  const isMounted = useIsMounted();
  const [isFetching, setIsFetching] = useState(false);
  const [serviceResponseState, setServiceResponseState] = useState<Model[]>(defaultModels.concat(additionalModels));

  const [state, setState] = useState<{
    options: SelectOption<ModelId, Model>[];
    valueState: ModelId[];
    isPreparedDateOnce: boolean;
    warningValues: ModelId[];
  }>({
    options: defaultModels.concat(additionalModels).reduce<SelectOption<ModelId, Model>[]>((result, item) => {
      const option = transformToOption(item);
      if (option) {
        return result.concat(option);
      }
      return result;
    }, []),
    valueState: value ?? [],
    isPreparedDateOnce: false,
    warningValues: [],
  });

  const handleSelect: SelectMultipleProps<ModelId, Model>['onChange'] = (values, options) => {
    const isUndefined = isEmpty(values) || null;
    onChange?.(isUndefined ? undefined : values, isUndefined ? undefined : options);
    setState(state => ({
      ...state,
      valueState: values ?? [],
    }));
  };

  const handleTransformServiceResponse = (serviceResponse?: Model[]): void => {
    const prepareDoneParameters: Omit<OnPrepareDoneParameters<ModelId, Model>, 'options'> = {
      isWarning: false,
      itemsState: (value ?? []).map(item => {
        return {
          type: 'unmatched',
          value: item,
        };
      }),
    };
    const response = serviceResponse ?? serviceResponseState;

    const transformData = response.reduce<SelectOption<ModelId, Model>[]>((result, item) => {
      const option = transformToOption(item);

      const indexOfRecordInValue = (value ?? []).findIndex(record => option?.value === record);
      if (indexOfRecordInValue !== -1) {
        prepareDoneParameters.itemsState[indexOfRecordInValue] = {
          ...prepareDoneParameters.itemsState[indexOfRecordInValue],
          type: 'matched',
        };
      } else {
        prepareDoneParameters.isWarning = true;
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

    const warningValues = prepareDoneParameters.itemsState.reduce<ModelId[]>((result, itemState) => {
      if (itemState.type === 'unmatched') {
        return result.concat(itemState.value);
      }
      return result;
    }, []);
    setState(state => ({
      ...state,
      options: uniqData,
      warningValues,
      isPreparedDateOnce: true,
    }));
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
  }, [...depsTransformOption]);

  useDeepCompareEffect(() => {
    setState(state => ({
      ...state,
      valueState: value ?? [],
    }));
  }, [value]);

  /** Placeholder for display initializing */
  const initializingOption: Pick<SelectOption<ModelId, Model>, 'label' | 'value' | 'hidden' | 'displayLabel'>[] =
    useDeepCompareMemo(() => {
      if (!initializingText) {
        return [];
      }
      if (value?.length) {
        return value.map(valueItem => {
          return {
            hidden: true,
            label: initializingText(valueItem),
            displayLabel: initializingText(valueItem),
            value: `${valueItem}` as ModelId,
          };
        });
      }
      return [
        {
          hidden: true,
          label: initializingText(undefined),
          displayLabel: initializingText(undefined),
          value: LOADING_FOR_EMPTY_VALUE as ModelId,
        },
      ];
    }, [value]);
  /** Placeholder for display options weren't matched with service response */
  const warningOption: Pick<SelectOption<ModelId, Model>, 'label' | 'value' | 'hidden' | 'displayLabel'>[] =
    useDeepCompareMemo(() => {
      if (state.warningValues && warningText) {
        return state.warningValues.map(warningValue => {
          return {
            hidden: true,
            label: warningText(warningValue),
            displayLabel: warningText(warningValue),
            value: warningValue,
          };
        });
      }
      return [];
    }, [value, state.warningValues]);
  const mergedOptions: SelectOption<ModelId, Model>[] = useDeepCompareMemo(() => {
    // If component wasn't initialized => Select will display placeholder option for initializing
    if (!state.isPreparedDateOnce) {
      return state.options.concat(initializingOption as SelectOption<ModelId, Model>[]);
    }
    // If component was initialized => Display all options from service response & "Placeholder for display options weren't matched with service response"
    return state.options.concat(warningOption as SelectOption<ModelId, Model>[]);
  }, [state.isPreparedDateOnce, state.options]);

  const mergedValue = useDeepCompareMemo(() => {
    if (!state.isPreparedDateOnce && initializingText) {
      return value?.length ? value : LOADING_FOR_EMPTY_VALUE;
    }
    if (valueVariant === 'controlled-state') {
      return value;
    }
    return state.valueState;
  }, [state.isPreparedDateOnce, valueVariant, state.valueState, value]);

  return (
    <SelectMultiple
      key={Number(state.isPreparedDateOnce)}
      options={mergedOptions}
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
      value={mergedValue as ModelId[]}
      footer={footer}
    />
  );
};
