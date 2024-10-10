import React, { memo } from 'react';
import { Owner } from '../../types/apiData.types';
import { getOwnerName } from '../../utils/utils';
import TableCell from '@mui/material/TableCell';
import { TABLE_CELL_NO_DATA, TEST_IDS } from '../../stringConstants';

interface TableCellOwnerProps {
  data: Owner;
}

const TableCellOwner: React.FC<TableCellOwnerProps> = ({ data }) => {
  const ownerName = getOwnerName(data);

  return (
    <TableCell data-testid={TEST_IDS.TABLE_CELL_OWNER}>
      {ownerName ?? TABLE_CELL_NO_DATA}
    </TableCell>
  );
};

function areEqual(
  prevProps: TableCellOwnerProps,
  nextProps: TableCellOwnerProps
) {
  return getOwnerName(prevProps.data) === getOwnerName(nextProps.data);
}

export default memo(TableCellOwner, areEqual);
