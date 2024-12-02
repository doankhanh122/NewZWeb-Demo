import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: {
    'giaoViec': {
      id: 'giaoViec',
      name: 'Giao Việc',
      cards: {
        'card-1': {
          id: 'card-1',
          name: 'ThuyTT',
          subCards: ['sub-1', 'sub-2'],
        },
        'card-2': {
          id: 'card-2',
          name: 'HangTTT',
          subCards: ['sub-3'],
        },
      },
    },
    'viecCuaToi': {
      id: 'viecCuaToi',
      name: 'Việc Của Tôi',
      cards: {
        'card-3': {
          id: 'card-3',
          name: 'Todo',
          subCards: ['sub-4'],
        },
      },
    },
    xinYKien: [
      { id: 'Trình Tổng Giám Đốc', subcards: [] },
      { id: 'Trình Trưởng Phòng', subcards: [] },
      { id: 'Trình Chủ Tịch', subcards: [] },
    ],
  },
  subCards: {
    'sub-1': { id: 'sub-1', content: 'Task 1' },
    'sub-2': { id: 'sub-2', content: 'Task 2' },
    'sub-3': { id: 'sub-3', content: 'Task 3' },
    'sub-4': { id: 'sub-4', content: 'Task 4' },
  },
};


const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addSubcard(state, action) {
      const { columnId, cardId, subcard } = action.payload;
      state.columns[columnId].find(card => card.id === cardId).subcards.push(subcard);
    },
    moveSubcard: (state, action) => {
      const { sourceCardId, targetCardId, subcardId } = action.payload;
    
      // Locate the source and target cards in the state
      const sourceCard = Object.values(state.columns)
        .flatMap((column) => column.cards)
        .find((card) => card.id === sourceCardId);
    
      const targetCard = Object.values(state.columns)
        .flatMap((column) => column.cards)
        .find((card) => card.id === targetCardId);
    
      // If the cards or subcard are not found, exit early
      if (!sourceCard || !targetCard) return;
    
      const subcardIndex = sourceCard.subcards.findIndex((subcard) => subcard.id === subcardId);
      if (subcardIndex === -1) return;
    
      // Remove the subcard from the source card
      const [subcard] = sourceCard.subcards.splice(subcardIndex, 1);
    
      // Add the subcard to the target card
      targetCard.subcards.push(subcard);
    },
    setPosition: (state, action) => {
      const { id, x, y } = action.payload;
      if (state.subCards[id]) {
        state.subCards[id] = { ...state.subCards[id], x, y };
      }
    },
    setPlaceholderPosition: (state, action) => {
      state.placeholderPosition = action.payload;
    },
    clearPlaceholderPosition: (state) => {
      state.placeholderPosition = null;
    },
    setPlaceholder: (state, action) => {
      state.placeholder = action.payload; // Store the ID of the hovered subCard
    },
    clearPlaceholder: (state) => {
      state.placeholder = null; // Clear the placeholder
    },
  },
});

export const { addSubcard, moveSubcard , setPosition , setPlaceholderPosition, clearPlaceholderPosition , setPlaceholder , clearPlaceholder } = tasksSlice.actions;
export default tasksSlice.reducer;
