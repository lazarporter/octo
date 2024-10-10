import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer as MuiTableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { APIData } from '../types/apiData.types';
import CustomTableCell from './Cells/CustomTableCell';

import { TEST_IDS } from '../stringContants';

const COLUMNS: { [key in keyof APIData]: string } = {
  _id: 'ID',
  assetName: 'Asset Name',
  owner: 'Owner Name',
  enriched: 'Is Crown Jewel',
};

interface TableProps {
  data: APIData[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  const keys = Object.keys(data[0]) as (keyof APIData)[];

  return (
    <MuiTableContainer component={Paper} data-testid={TEST_IDS.TABLE_DATA}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key}>{COLUMNS[key]}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData) => (
            <TableRow key={rowData._id}>
              {keys.map((cellName) => (
                <CustomTableCell
                  key={`${rowData._id}-${cellName}`}
                  data={rowData[cellName]}
                  id={rowData._id}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};
