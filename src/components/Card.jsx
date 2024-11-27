import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import SubCard from './SubCard';

const Card = ({ card, subCards, onAddSubCard, isLastCard }) => {
  const { setNodeRef } = useDroppable({ id: card.id });
  const [newSubCardContent, setNewSubCardContent] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddSubCard = () => {
    if (newSubCardContent.trim() === '') return;
    onAddSubCard(card.id, newSubCardContent);
    setNewSubCardContent(''); // Clear input field after adding
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '16px',
        backgroundColor: '#fff',
        width: '500px',
      }}
    >
      <h3 style={{ marginBottom: '8px' }}>{card.name}</h3>
      <div>
        {card.subCards.map((subCardId) => (
          <SubCard
            key={subCardId}
            id={subCardId}
            content={subCards[subCardId]?.content}
          />
        ))}
      </div>
      
      {onAddSubCard && isLastCard && (
        <div style={{ marginTop: '16px' }}>
          <input
            type="text"
            placeholder="Nhập task cần thêm"
            value={newSubCardContent}
            onChange={(e) => setNewSubCardContent(e.target.value)}
            style={{
              padding: '8px',
              width: 'calc(100% - 20px)',
              marginBottom: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <button
            style={{
              padding: '8px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={handleAddSubCard}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
