// components/SubCard.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const SubCard = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform,transition, isDragging  } = useDraggable({
    id,
  });
  
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: '8px',
    background: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '8px',
    
    cursor: 'move',
    // position: isDragging ? 'absolute' : 'relative', // Make subcard absolute when dragging
    // opacity: isDragging ? 0.8 : 1, // Slightly fade the subcard when dragging
    // transition: isDragging ? 'none' : transition, // Smooth transition when not dragging
    // transform: isDragging 
    //   ? `translate(${transform ? transform.x : 0}px, ${transform ? transform.y : 0}px)` 
    //   : 'none',  // When not dragging, reset transform
    zIndex: isDragging ? 1000 : 'auto', // Bring it to the front when dragging
    width: 'auto',  // Ensure no resize happens
    height: 'auto', // Ensure no resize happens

  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <p>{content || 'No Content'}</p>
    </div>
  );
};

export default SubCard;

