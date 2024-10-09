import { createContext, useContext } from 'react';
import { TableContextType } from './tableContext.types';

export const initialTableContext: TableContextType = {
  data: [],
  setData: () => {},
  editMode: false,
  setEditMode: () => {},
  handleStageEdit: () => {},
  commitStagedEdits: () => {},
  loading: false,
};

export const TableContext =
  createContext<TableContextType>(initialTableContext);

export const useTableContext = () => useContext(TableContext);
