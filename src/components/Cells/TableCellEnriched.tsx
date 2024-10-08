import React, { memo } from 'react';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Enriched } from '../../hooks/apiData.types';
import TableCell from '@mui/material/TableCell';

interface TableCellEnrichedProps {
  data: Enriched;
}

const TableCellEnriched: React.FC<TableCellEnrichedProps> = ({ data }) => (
  <TableCell data-testid="table-cell-enriched" align="left">
    {data.isCrownJewel ? (
      <DiamondIcon data-testid="crown-jewel" style={{ color: 'red' }} />
    ) : (
      '-'
    )}
  </TableCell>
);

function areEqual(
  prevProps: TableCellEnrichedProps,
  nextProps: TableCellEnrichedProps
) {
  return prevProps.data.isCrownJewel === nextProps.data.isCrownJewel;
}

export default memo(TableCellEnriched, areEqual);
