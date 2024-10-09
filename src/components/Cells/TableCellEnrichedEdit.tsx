import { SelectChangeEvent, TableCell, Select, MenuItem } from '@mui/material';
import { TEST_IDS } from '../../stringContants';
import { Enriched } from '../../types/apiData.types';
import { useTableContext } from '../../context/TableContext';
import { useState } from 'react';

interface TableCellEnrichedEditProps {
  data: Enriched;
  id: string;
}

export const TableCellEnrichedEdit: React.FC<TableCellEnrichedEditProps> = ({
  data,
  id,
}) => {
  const { handleStageEdit } = useTableContext();
  const [value, setValue] = useState(data.isCrownJewel.toString());

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    handleStageEdit(id, event.target.value === 'true');
  };

  return (
    <TableCell data-testid={TEST_IDS.TABLE_CELL_ENRICHED} align="left">
      <Select value={value} onChange={handleChange}>
        <MenuItem value={'true'}>True</MenuItem>
        <MenuItem value={'false'}>False</MenuItem>
      </Select>
    </TableCell>
  );
};
