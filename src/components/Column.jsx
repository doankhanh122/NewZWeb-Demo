import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { addTask } from '../store/tasksSlice';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal';
import { Card, CardContent, Typography, Button } from '@mui/material';

const Column = ({ columnId }) => {
  const column = useSelector((state) => state.tasks.columns[columnId]);
  const dispatch = useDispatch();
  const { setNodeRef } = useDroppable({ id: columnId });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCreateTask = (taskName) => {
    dispatch(addTask({ columnId, taskName }));
  };

  return (
    <Card variant="outlined" style={{ width: 300 }}>
      <CardContent ref={setNodeRef}>
        <Typography variant="h6" gutterBottom>
          {column.title}
        </Typography>
        {column.tasks.map((task) => (
          <TaskCard key={task} id={task} />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{ marginTop: '16px' }}
        >
          Create Task
        </Button>
        <CreateTaskModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateTask}
        />
      </CardContent>
    </Card>
  );
};

export default Column;
