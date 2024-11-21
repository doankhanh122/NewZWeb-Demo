import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice'; // Action để thêm task

const CreateTaskModal = ({ open, handleClose, columnId }) => {
  const [taskTitle, setTaskTitle] = useState(''); // Quản lý tiêu đề task
  const dispatch = useDispatch(); // Để dispatch action vào Redux store

  // Xử lý thay đổi input
  const handleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  // Xử lý tạo task mới
  const handleCreateTask = () => {
    if (taskTitle.trim() !== '') {
      // Tạo task mới và dispatch action thêm task vào cột tương ứng
      dispatch(addTask({ column: columnId, task: { id: Date.now().toString(), title: taskTitle } }));
      setTaskTitle(''); // Reset input sau khi tạo task
      handleClose(); // Đóng modal
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          fullWidth
          variant="outlined"
          value={taskTitle}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreateTask} color="primary">
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskModal;
