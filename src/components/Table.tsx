import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import { APIData } from '../types/apiData.types';
import CustomTableCell from './Cells/CustomTableCell';
import { useApiData } from '../hooks/useApiData';
import { TEST_IDS } from '../stringContants';

export const Table: React.FC = () => {
  const { loading, data } = useApiData();

  if (loading) {
    return (
      <TableContainer
        component={Paper}
        data-testid={TEST_IDS.TABLE_LOADING_SPINNER}
      >
        <CircularProgress />
      </TableContainer>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <TableContainer component={Paper} data-testid={TEST_IDS.TABLE_NO_DATA}>
        <Typography variant="h6" sx={{ p: 2 }}>
          No data available
        </Typography>
      </TableContainer>
    );
  }

  const keys = Object.keys(data[0]) as (keyof APIData)[];

  return (
    <TableContainer component={Paper} data-testid={TEST_IDS.TABLE_DATA}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key}>{key}</TableCell>
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
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
