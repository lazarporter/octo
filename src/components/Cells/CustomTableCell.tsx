import React, { memo } from 'react';
import TableCell from '@mui/material/TableCell';
import { Enriched, Owner } from '../../types/apiData.types';
import TableCellEnriched from './TableCellEnriched';
import TableCellOwner from './TableCellOwner';
import { TABLE_CELL_NO_DATA, TEST_IDS } from '../../stringContants';

type TableCellData = Enriched | Owner | string;

interface CustomTableCellProps {
  id: string;
  data: TableCellData;
}

const CustomTableCell: React.FC<CustomTableCellProps> = ({ id, data }) => {
  if (typeof data === 'object') {
    if ('isCrownJewel' in data) {
      return <TableCellEnriched id={id} data={data} />;
    }
    if ('name' in data || 'owner' in data) {
      return <TableCellOwner data={data} />;
    }
  }

  return (
    <TableCell data-testid={TEST_IDS.TABLE_CELL_STRING}>
      {data ?? TABLE_CELL_NO_DATA}
    </TableCell>
  );
};

export default memo(CustomTableCell);
