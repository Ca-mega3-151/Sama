import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { SortOrder } from '../../types/Sorter';
import { SortAlt } from './icons/SortAlt';
import './styles.css';

interface Props {
  order: SortOrder;
}

export const SortIcon: FC<Props> = ({ order }) => {
  if (order === 'ascend') {
    return <SortAscendingOutlined className="AntSortIcon__container" />;
  }
  if (order === 'descend') {
    return <SortDescendingOutlined className="AntSortIcon__container" />;
  }
  return <SortAlt className="AntSortIcon__container" />;
};
