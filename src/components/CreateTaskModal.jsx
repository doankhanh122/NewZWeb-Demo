import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

const CreateTaskModal = ({ open, onClose, onCreate }) => {
  const [taskName, setTaskName] = useState('');

  const handleCreate = () => {
    if (taskName.trim()) {
      onCreate(taskName);
      setTaskName('');
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <TextField
          label="Task Name"
          variant="outlined"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          autoFocus
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleCreate} variant="contained">
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
