import React, { memo } from 'react';
import { Owner } from '../../hooks/apiData.types';
import { getOwnerName } from '../../utils/utils';
import TableCell from '@mui/material/TableCell';

interface TableCellOwnerProps {
  data: Owner;
}

const TableCellOwner: React.FC<TableCellOwnerProps> = ({ data }) => {
  const ownerName = getOwnerName(data);

  return <TableCell data-testid="table-cell-owner">{ownerName}</TableCell>;
};

function areEqual(
  prevProps: TableCellOwnerProps,
  nextProps: TableCellOwnerProps
) {
  return getOwnerName(prevProps.data) === getOwnerName(nextProps.data);
}

export default memo(TableCellOwner, areEqual);
