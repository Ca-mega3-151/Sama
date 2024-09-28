import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import { Button } from '../../../../Button';
import { Checkbox } from '../../../../Checkbox';
import { Modal } from '../../../../Modal';
import { ColumnsState } from '../../types/ColumnsState';
import { SortableList } from './components/SortableList/SortableList';
import './css/AdvanceConfigColumns.css';
import { Cog } from './icons/Cog';
import { XClose } from './icons/XClose';

interface Props {
  columnsState: ColumnsState<any, any>;
  title: ReactNode;
  Left: ReactNode;
  onChange: (data: ColumnsState<any, any>) => void;
  selectAllLabel: ReactNode;
  showCurrentState: (params: { selected: number; total: number }) => ReactNode;
}

export const AdvanceConfigColumns: FC<Props> = ({
  Left,
  title,
  columnsState,
  onChange,
  selectAllLabel,
  showCurrentState,
}) => {
  const [columnsStateValues, setColumnsStateValues] = useState<typeof columnsState | undefined>(undefined);

  return (
    <>
      <div className="AntTableAdvanceConfigColumns__container">
        <div>{Left}</div>
        <Button
          size="small"
          type="text"
          className="AntTableAdvanceConfigColumns__settingsViewTrigger"
          onClick={() => setColumnsStateValues(columnsState.filter(columnState => columnState.visible))}
          icon={<Cog />}
        />
      </div>
      <Modal
        width={800}
        title={title}
        open={!!columnsStateValues}
        onCancel={() => setColumnsStateValues(undefined)}
        onOk={() => {
          const unSelectedItems = columnsState
            .filter(columnState => {
              return !columnsStateValues?.find(columnStateValue => {
                return columnStateValue.id === columnState.id;
              });
            })
            .map(columnState => ({ ...columnState, visible: false }));
          onChange?.((columnsStateValues ?? []).concat(unSelectedItems));
          setColumnsStateValues(undefined);
        }}
      >
        <div className="AntTableAdvanceConfigColumns__settingsViewContent">
          <div className="AntTableAdvanceConfigColumns__columnsSelectable">
            <div className="AntTableAdvanceConfigColumns__columnsSelectableHeader">
              <Checkbox
                checked={columnsStateValues?.length === columnsState.length}
                onChange={checked => {
                  const nextColumns = checked ? columnsState : [];
                  setColumnsStateValues(nextColumns.map(columnState => ({ ...columnState, visible: true })));
                }}
              >
                {selectAllLabel}
              </Checkbox>
            </div>
            <div className="AntTableAdvanceConfigColumns__columnsSelectableContent">
              <div className="AntTableAdvanceConfigColumns__columnsSelectableList">
                {columnsState.map(item => {
                  const selected = columnsStateValues?.find(itemState => itemState.id === item.id);
                  return (
                    <Checkbox
                      checked={!!selected}
                      onChange={checked => {
                        const nextState = checked
                          ? columnsStateValues?.concat(item)
                          : columnsStateValues?.filter(itemState => itemState.id !== item.id);
                        setColumnsStateValues(nextState);
                      }}
                      key={item.id}
                    >
                      {item.rawData.title}
                    </Checkbox>
                  );
                })}
                <div className="AntTableAdvanceConfigColumns__columnsSelectableContentPlaceholder" />
              </div>
            </div>
          </div>
          <div className="AntTableAdvanceConfigColumns__columnsSortable">
            <div className="AntTableAdvanceConfigColumns__columnsSortableHeader">
              {showCurrentState({ selected: columnsStateValues?.length ?? 0, total: columnsState.length })}
            </div>
            <div className="AntTableAdvanceConfigColumns__columnsSortableContent">
              <SortableList
                items={columnsStateValues?.filter(item => item.visible)}
                onChange={setColumnsStateValues}
                renderItem={item => {
                  return (
                    <SortableList.Item id={item.id}>
                      <div
                        className={classNames(
                          'AntTableQuickConfigColumns__columnItem',
                          !item.visible ? 'AntTableQuickConfigColumns__columnItem--invisible' : '',
                        )}
                      >
                        <div className="AntTableQuickConfigColumns__columnInfo">
                          <SortableList.DragHandle />
                          <div className="AntTableQuickConfigColumns__columnName">{item.rawData.title}</div>
                        </div>
                        <Button
                          type="text"
                          size="small"
                          onClick={() => {
                            const nextState = columnsStateValues?.filter(itemState => itemState.id !== item.id);
                            setColumnsStateValues(nextState);
                          }}
                        >
                          <XClose />
                        </Button>
                      </div>
                    </SortableList.Item>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
