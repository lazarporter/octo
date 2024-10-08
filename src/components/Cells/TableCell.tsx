import React from 'react';
import { Enriched, Owner } from '../../hooks/apiData.types';
import TableCellEnriched from './TableCellEnriched';
import TableCellOwner from './TableCellOwner';

type TableCellData = Enriched | Owner | string;

interface TableCellProps {
  data: TableCellData;
}

const TableCell: React.FC<TableCellProps> = ({ data }) => {
  if (typeof data === 'object') {
    if ('isCrownJewel' in data) {
      return <TableCellEnriched data={data} />;
    }
    if ('name' in data || 'owner' in data) {
      return <TableCellOwner data={data} />;
    }
  }

  return <td data-testid="table-cell-string">{data}</td>;
};

export default TableCell;
