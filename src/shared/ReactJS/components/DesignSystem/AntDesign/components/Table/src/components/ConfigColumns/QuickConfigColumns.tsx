import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Button } from '../../../../Button';
import { Popover } from '../../../../Popover';
import { ColumnsState } from '../../types/ColumnsState';
import { SortableList } from './components/SortableList/SortableList';
import './css/QuickConfigColumns.css';
import { Cog } from './icons/Cog';
import { Eye } from './icons/Eye';
import { EyeSlash } from './icons/EyeSlash';
import { Refresh } from './icons/Refresh';

interface Props {
  columnsState: ColumnsState<any, any>;
  onSort: (data: ColumnsState<any, any>) => void;
  onRefresh: () => void;
  onVisibleChange: (params: { id: string; visible: boolean }) => void;
  title: ReactNode;
  Left: ReactNode;
}

export const QuickConfigColumns: FC<Props> = ({ title, columnsState, onSort, onRefresh, onVisibleChange, Left }) => {
  const renderContent = (): ReactNode => {
    return (
      <div className="AntTableQuickConfigColumns__settingsViewContent">
        <div className="AntTableQuickConfigColumns__settingsViewContentHeader">
          <div>{title}</div>
          <Button size="small" icon={<Refresh />} onClick={onRefresh} />
        </div>
        <div className="AntTableQuickConfigColumns__listColumns">
          <SortableList
            items={columnsState}
            onChange={onSort}
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
                      onClick={() => onVisibleChange({ id: item.id, visible: !item.visible })}
                    >
                      {item.visible ? <Eye /> : <EyeSlash />}
                    </Button>
                  </div>
                </SortableList.Item>
              );
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="AntTableQuickConfigColumns__container">
      <div>{Left}</div>
      <Popover
        overlayClassName="AntTableQuickConfigColumns__popover"
        placement="topRight"
        content={renderContent()}
        trigger={['click']}
      >
        <div>
          <Button className="AntTableQuickConfigColumns__settingsViewTrigger" size="small" type="text" icon={<Cog />} />
        </div>
      </Popover>
    </div>
  );
};
