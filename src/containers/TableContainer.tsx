import {
  Box,
  Typography,
  TableContainer as MuiTableContainer,
  CircularProgress,
  Paper,
} from '@mui/material';
import { EditToggleButton } from '../components/EditToggleButton';
import {
  INSTRUCTIONS,
  TABLE_NO_DATA_MESSAGE,
  TEST_IDS,
} from '../stringContants';
import { useTableContext } from '../context/TableContext';
import { Table } from '../components/Table';

export const TableContainer = () => {
  const { loading, data } = useTableContext();

  if (loading) {
    return (
      <MuiTableContainer
        component={Paper}
        data-testid={TEST_IDS.TABLE_LOADING_SPINNER}
      >
        <CircularProgress />
      </MuiTableContainer>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <MuiTableContainer component={Paper} data-testid={TEST_IDS.TABLE_NO_DATA}>
        <Typography variant="h6" sx={{ p: 2 }}>
          {TABLE_NO_DATA_MESSAGE}
        </Typography>
      </MuiTableContainer>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography sx={{ mt: 2, mb: 2 }}>{INSTRUCTIONS}</Typography>
        <EditToggleButton />
      </Box>
      <Table data={data} />
    </>
  );
};
