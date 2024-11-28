// components/SubCard.jsx
import React, { useRef, useEffect, useState } from "react";
import { useDraggable ,  } from '@dnd-kit/core';

const SubCard = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform,transition, isDragging  } = useDraggable({
    id,
  });
  const subcardRef = useRef(null); // Reference for the subcard
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // Capture dimensions of the Subcard
  useEffect(() => {
    if (subcardRef.current) {
      const { width, height } = subcardRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const adjustedTransform = transform
    ? {
        x: transform.x - dimensions.width / 2,
        y: transform.y - dimensions.height / 2,
      }
    : null;
  const style1 = {  
    background: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '8px',
    backgroundColor: isHovered ? "#d1e7ff" : "#f4f4f4",
    transition: "all 0.3s ease",
    cursor: "grab",
    boxShadow: isHovered ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    textAlign: "center",
    transform: adjustedTransform
      ? `translate(${adjustedTransform.x}px, ${adjustedTransform.y}px)`
      : undefined,
    zIndex: isDragging ? 9999 : "auto",
    pointerEvents: isDragging ? "none" : "auto",
    
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style1}>
      <p>{content || 'No Content'}</p>
    </div>
  );
};

export default SubCard;

