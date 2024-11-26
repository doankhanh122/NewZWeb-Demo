// App.jsx
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Column from './components/Column';
import { useDraggable } from '@dnd-kit/core';

const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      name: 'Giao Việc',
      color: '#007BFF',
      cards: {
        'card-1': {
          id: 'card-1',
          name: 'ThuyTT',
          subCards: ['sub-1', 'sub-2'],
        },
        'card-2': {
          id: 'card-2',
          name: 'HuyenNTT',
          subCards: ['sub-3', 'sub-4'],
        },
        'card-3': {
          id: 'card-3',
          name: 'HoanND',
          subCards: ['sub-5', 'sub-6'],
        },
      },
    },
    'column-2': {
      id: 'column-2',
      name: 'Việc Của Tôi',
      color: '#FFD700',
      cards: {
        'card-4': {
          id: 'card-4',
          name: 'Todo',
          subCards: ['sub-7', 'sub-8'],
        },
        'card-5': {
          id: 'card-5',
          name: 'In Progress',
          subCards: ['sub-9', 'sub-10'],
        },
        'card-6': {
          id: 'card-6',
          name: 'Done',
          subCards: ['sub-11', 'sub-12'],
        },
      },
    },
    'column-3': {
      id: 'column-3',
      name: 'Xin Ý Kiến',
      color: '#FF6347',
      cards: {
        'card-7': {
          id: 'card-7',
          name: 'Trình Tổng Giám Đốc',
          subCards: ['sub-13', 'sub-14'],
        },
        'card-8': {
          id: 'card-8',
          name: 'Trình Trưởng phòng',
          subCards: ['sub-15', 'sub-16'],
        },
        'card-9': {
          id: 'card-9',
          name: 'Trình Phó phòng',
          subCards: ['sub-17', 'sub-18'],
        },
      },
    },
  },
  subCards: {
    'sub-1': { id: 'sub-1', content: 'Task 1' },
    'sub-2': { id: 'sub-2', content: 'Task 2' },
    'sub-3': { id: 'sub-3', content: 'Task 3' },
    'sub-4': { id: 'sub-4', content: 'Task 4' },
    'sub-5': { id: 'sub-5', content: 'Task 1' },
    'sub-6': { id: 'sub-6', content: 'Task 2' },
    'sub-7': { id: 'sub-8', content: 'Task 3' },
    'sub-9': { id: 'sub-9', content: 'Task 4' },
    'sub-10': { id: 'sub-10', content: 'Task 1' },
    'sub-11': { id: 'sub-11', content: 'Task 2' },
    'sub-12': { id: 'sub-12', content: 'Task 3' },
    'sub-13': { id: 'sub-13', content: 'Task 4' },
    'sub-14': { id: 'sub-14', content: 'Task 1' },
    'sub-15': { id: 'sub-15', content: 'Task 2' },
    'sub-16': { id: 'sub-16', content: 'Task 3' },
    'sub-17': { id: 'sub-17', content: 'Task 4' }
  },
};

const App = () => {
  const [data, setData] = useState(initialData);
  const { attributes, listeners, setNodeRef, transform,transition, isDragging  } = useDraggable({
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let sourceCardId, targetCardId;

    Object.values(data.columns).forEach((column) => {
      Object.values(column.cards).forEach((card) => {
        if (card.subCards.includes(active.id)) sourceCardId = card.id;
        if (card.id === over.id) targetCardId = card.id;
      });
    });

    if (!sourceCardId || !targetCardId) return;

    setData((prev) => {
      const updatedData = { ...prev };
      const sourceCard = Object.values(updatedData.columns)
        .flatMap((col) => Object.values(col.cards))
        .find((card) => card.id === sourceCardId);

      const targetCard = Object.values(updatedData.columns)
        .flatMap((col) => Object.values(col.cards))
        .find((card) => card.id === targetCardId);

      sourceCard.subCards = sourceCard.subCards.filter(
        (subCardId) => subCardId !== active.id
      );
      targetCard.subCards.push(active.id);

      return updatedData;
    });
  };

  const handleAddSubCard = (cardId, content) => {
    setData((prev) => {
      const updatedData = { ...prev };
      const newSubCardId = `sub-${Date.now()}`;
      updatedData.subCards[newSubCardId] = { id: newSubCardId, content };
      const middleColumn = updatedData.columns['column-2'];
      const lastCardId = Object.keys(middleColumn.cards).slice(-1)[0];
      middleColumn.cards[lastCardId].subCards.push(newSubCardId);
      return updatedData;
    });
  };
  
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,}}>
        {Object.values(data.columns).map((column) => (
          <Column
            key={column.id}
            column={column}
            subCards={data.subCards}
            onAddSubCard={column.id === 'column-2' ? handleAddSubCard : null}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default App;
