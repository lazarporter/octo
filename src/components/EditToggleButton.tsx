import { Button } from '@mui/material';
import { useTableContext } from '../context/TableContext';
import { TOGGLE_EDIT_BUTTON_TEXT } from '../stringContants';

export const EditToggleButton = () => {
  const { editMode, setEditMode, commitStagedEdits } = useTableContext();

  const text = editMode
    ? TOGGLE_EDIT_BUTTON_TEXT.SAVE
    : TOGGLE_EDIT_BUTTON_TEXT.EDIT;
  return (
    <Button
      variant={editMode ? 'contained' : 'outlined'}
      onClick={editMode ? commitStagedEdits : () => setEditMode(!editMode)}
    >
      {text}
    </Button>
  );
};
