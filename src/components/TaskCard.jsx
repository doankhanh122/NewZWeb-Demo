import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Paper, Typography } from '@mui/material';

const TaskCard = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    marginBottom: '8px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'grab',
  };

  return (
    <Paper ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Typography>{id}</Typography>
    </Paper>
  );
};

export default TaskCard;


