import React from 'react';
import Card from './Card';
import AddSubCard from './AddSubCard'; // Import the AddSubCard component

const Column = ({ column, subCards, onAddSubCard }) => {
  return (
    <div style={{ flex: 1,
      margin: '16px',
      padding: '16px',
      backgroundColor: column.color,
      borderRadius: '8px',
      minWidth: '250px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '80vh', // Fixed height
      overflowY: 'auto', // Enable vertical scrolling
      position: 'relative', // Ensure columns are positioned in a stacking context
      zIndex: 0, // Default z-index for layout container
       }}>
      <h2>{column.name}</h2>
      {Object.values(column.cards).map((card) => (
        <Card
          key={card.id}
          card={card}
          subCards={subCards}
          onAddSubCard={onAddSubCard}
          isLastCard={card.id === Object.keys(column.cards).slice(-1)[0]} // Pass a flag for the last card
        />
      ))}
    </div>
  );
};

export default Column;


