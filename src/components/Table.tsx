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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { APIData } from '../hooks/apiData.types';
import CustomTableCell from './Cells/CustomTableCell';
import { ApiRequest } from '../hooks/useApiData';

export const Table: React.FC<ApiRequest> = ({ loading, data, error }) => {
  if (loading) {
    return (
      <TableContainer component={Paper} data-testid="table-loading-spinner">
        <CircularProgress />
      </TableContainer>
    );
  }

  if (error) {
    return (
      <TableContainer component={Paper} data-testid="table-error">
        <Typography
          variant="h6"
          color="error"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          {error}
        </Typography>
      </TableContainer>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <TableContainer component={Paper} data-testid="table-no-data">
        <Typography variant="h6" sx={{ p: 2 }}>
          No data available
        </Typography>
      </TableContainer>
    );
  }

  const keys = Object.keys(data[0]) as (keyof APIData)[];

  return (
    <TableContainer component={Paper} data-testid="table-data">
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
