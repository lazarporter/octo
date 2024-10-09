import React, { memo } from 'react';
import { Owner } from '../../types/apiData.types';
import { getOwnerName } from '../../utils/utils';
import TableCell from '@mui/material/TableCell';
import { TEST_IDS } from '../../stringContants';

interface TableCellOwnerProps {
  data: Owner;
}

const TableCellOwner: React.FC<TableCellOwnerProps> = ({ data }) => {
  const ownerName = getOwnerName(data);

  return (
    <TableCell data-testid={TEST_IDS.TABLE_CELL_OWNER}>{ownerName}</TableCell>
  );
};

function areEqual(
  prevProps: TableCellOwnerProps,
  nextProps: TableCellOwnerProps
) {
  return getOwnerName(prevProps.data) === getOwnerName(nextProps.data);
}

export default memo(TableCellOwner, areEqual);
