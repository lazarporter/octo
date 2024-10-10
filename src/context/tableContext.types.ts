import React from 'react';
import { APIData } from '../types/apiData.types';

export interface TableContextType {
  data: APIData[];
  setData: React.Dispatch<React.SetStateAction<APIData[]>>;
  editMode: boolean;
  toggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleStageEdit: (id: string, nextVal: boolean) => void;
  commitStagedEdits: () => void;
  loading: boolean;
}

export interface StagedEdits {
  [key: string]: boolean;
}
