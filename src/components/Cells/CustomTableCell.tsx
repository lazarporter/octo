import React, { memo } from 'react';
import TableCell from '@mui/material/TableCell';
import { Enriched, Owner } from '../../hooks/apiData.types';
import TableCellEnriched from './TableCellEnriched';
import TableCellOwner from './TableCellOwner';

type TableCellData = Enriched | Owner | string;

interface CustomTableCellProps {
  data: TableCellData;
}

const CustomTableCell: React.FC<CustomTableCellProps> = ({ data }) => {
  if (typeof data === 'object') {
    if ('isCrownJewel' in data) {
      return <TableCellEnriched data={data} />;
    }
    if ('name' in data || 'owner' in data) {
      return <TableCellOwner data={data} />;
    }
  }

  return <TableCell data-testid="table-cell-string">{data}</TableCell>;
};

export default memo(CustomTableCell);
