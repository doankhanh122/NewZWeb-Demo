import React from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskCard, addSubtask } from '../store/tasksSlice';
import Column from './Column';

const Board = () => {
  const dispatch = useDispatch();
  const columns = useSelector(state => state.tasks.columns);
  const taskCards = useSelector(state => state.tasks.taskCards);
  const subtasks = useSelector(state => state.tasks.subtasks);

  const handleCreateSubtask = () => {
    const newSubtaskId = `subtask-${Object.keys(subtasks).length + 1}`;
    const newSubtask = {
      id: newSubtaskId,
      title: 'New Subtask',
      taskCardId: 'taskCard-2', // Default to middle task card
    };
    dispatch(addSubtask(newSubtask));
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {Object.values(columns).map((column) => (
        <Column
          key={column.id}
          column={column}
          taskCards={column.taskCardIds.map((taskCardId) => taskCards[taskCardId])}
          subtasks={subtasks}
        />
      ))}
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" onClick={handleCreateSubtask}>
          Create Subtask
        </Button>
      </Grid>
    </Grid>
  );
};

export default Board;
