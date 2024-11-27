// components/SubCard.jsx
import React from 'react';
import { useDraggable ,  } from '@dnd-kit/core';

const SubCard = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform,transition, isDragging  } = useDraggable({
    id,
  });
  
  const style = {  
    padding: '8px',
    background: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '8px',
    cursor: 'move',
    width: 'auto',  // Ensure no resize happens
    height: 'auto', // Ensure no resize happens
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <p>{content || 'No Content'}</p>
    </div>
  );
};

export default SubCard;

