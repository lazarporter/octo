import { useState, useCallback, useEffect } from 'react';
import { initialTableContext, TableContext } from './TableContext';
import { useApiData } from '../hooks/useApiData';
import { APIData } from '../types/apiData.types';
import { StagedEdits } from './tableContext.types';
import { LOCAL_STORAGE_SAVED_EDITS } from '../stringContants';
import { logError } from '../utils/logError';

export const TableContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<APIData[]>(initialTableContext.data);
  const [stagedEdits, setStagedEdits] = useState<StagedEdits>({});
  const [editMode, setEditMode] = useState<boolean>(false);

  const { loading, data: apiData } = useApiData();

  function handleStageEdit(id: string, nextVal: boolean) {
    setStagedEdits((prev) => ({ ...prev, [id]: nextVal }));
  }

  const commitStagedEdits = useCallback(() => {
    try {
      const savedEdits = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SAVED_EDITS) || '{}'
      );
      const mergedEdits = { ...savedEdits, ...stagedEdits };

      // this takes the place of an API call to persist on a backend
      localStorage.setItem(
        LOCAL_STORAGE_SAVED_EDITS,
        JSON.stringify(mergedEdits)
      );

      // No need for a "roundtrip" to the server since we know what the successful save looks like
      setData((prev) => {
        const next = mergeEditsWithState(prev, stagedEdits);
        console.log({ next });
        return next;
      });
      setStagedEdits({});
      setEditMode(false);
    } catch (e) {
      // something went wrong saving.
      logError(e as Error);
      // TODO: show error to user
    }
  }, [stagedEdits]);

  // get any previous saved updates from localstorage and merge them into the initial data
  useEffect(() => {
    const savedEdits = localStorage.getItem(LOCAL_STORAGE_SAVED_EDITS);

    if (savedEdits) {
      const parsedEdits = JSON.parse(savedEdits);

      setData(mergeEditsWithState(apiData, parsedEdits));
    } else {
      setData(apiData);
    }
  }, [apiData]);

  return (
    <TableContext.Provider
      value={{
        data,
        setData,
        editMode,
        setEditMode,
        handleStageEdit,
        commitStagedEdits,
        loading,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

function mergeEditsWithState(data: APIData[], stagedEdits: StagedEdits) {
  return data.map((item) => {
    const updatedVal = stagedEdits[item._id];

    return typeof updatedVal !== 'undefined'
      ? { ...item, enriched: { isCrownJewel: updatedVal } }
      : item;
  });
}
