import React, { memo } from 'react';
import { Enriched } from '../../hooks/apiData.types';

interface TableCellEnrichedProps {
  data: Enriched;
}

const TableCellEnriched: React.FC<TableCellEnrichedProps> = ({ data }) => (
  <>
    <td data-testid="table-cell-enriched">
      {data.isCrownJewel ? 'The Crown Jewel!' : 'Not Crown Jewel'}
    </td>
  </>
);

function areEqual(
  prevProps: TableCellEnrichedProps,
  nextProps: TableCellEnrichedProps
) {
  return prevProps.data.isCrownJewel === nextProps.data.isCrownJewel;
}

export default memo(TableCellEnriched, areEqual);
