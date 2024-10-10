import { Button } from '@mui/material';
import { useTableContext } from '../context/TableContext';
import { TOGGLE_EDIT_BUTTON_TEXT } from '../stringConstants';
import { Edit, Save } from '@mui/icons-material';

export const EditToggleButton = () => {
  const { editMode, toggleEditMode, commitStagedEdits } = useTableContext();

  const text = editMode
    ? TOGGLE_EDIT_BUTTON_TEXT.SAVE
    : TOGGLE_EDIT_BUTTON_TEXT.EDIT;
  return (
    <Button
      variant={editMode ? 'contained' : 'outlined'}
      onClick={editMode ? commitStagedEdits : () => toggleEditMode(!editMode)}
      startIcon={editMode ? <Save /> : <Edit />}
    >
      {text}
    </Button>
  );
};
