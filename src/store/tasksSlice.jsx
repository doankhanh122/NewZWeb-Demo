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
      const { sourceColumnId, sourceCardId, targetColumnId, targetCardId, subcardId } = action.payload;

      // Find source and target cards
      const sourceColumn = state.columns[sourceColumnId];
      const targetColumn = state.columns[targetColumnId];
      const sourceCard = sourceColumn.find(card => card.id === sourceCardId);
      const targetCard = targetColumn.find(card => card.id === targetCardId);

      // Find the subcard
      const subcardIndex = sourceCard.subcards.findIndex(subcard => subcard.id === subcardId);
      const subcard = sourceCard.subcards[subcardIndex];

      // Remove the subcard from the source card
      sourceCard.subcards.splice(subcardIndex, 1);

      // Add the subcard to the target card
      targetCard.subcards.push(subcard);
    },
  },
});

export const { addSubcard, moveSubcard } = tasksSlice.actions;
export default tasksSlice.reducer;
