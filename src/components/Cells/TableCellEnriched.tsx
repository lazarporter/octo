import React, { memo } from 'react';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Enriched } from '../../types/apiData.types';
import TableCell from '@mui/material/TableCell';
import { TEST_IDS } from '../../stringContants';

interface TableCellEnrichedProps {
  data: Enriched;
}

const TableCellEnriched: React.FC<TableCellEnrichedProps> = ({ data }) => (
  <TableCell data-testid={TEST_IDS.TABLE_CELL_ENRICHED} align="left">
    {data.isCrownJewel ? (
      <DiamondIcon
        data-testid={TEST_IDS.CROWN_JEWEL}
        style={{ color: 'red' }}
      />
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
