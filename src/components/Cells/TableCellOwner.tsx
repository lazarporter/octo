import React from 'react';
import { Owner } from '../../hooks/apiData.types';
import { getOwnerName } from '../../utils/utils';

interface TableCellOwnerProps {
  data: Owner;
}

const TableCellOwner: React.FC<TableCellOwnerProps> = ({ data }) => {
  const ownerName = getOwnerName(data);

  return <td data-testid="table-cell-owner">{ownerName}</td>;
};

export default TableCellOwner;
