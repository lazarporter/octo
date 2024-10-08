import React from 'react';
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

export default TableCellEnriched;
