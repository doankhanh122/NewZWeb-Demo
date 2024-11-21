import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    columns: {
      todo: [
        { id: '1', title: 'Task 1' },
        { id: '2', title: 'Task 2' },
      ],
      inProgress: [],
      done: [],
    },
  },
  reducers: {
    addTask: (state, action) => {
      const { column, task } = action.payload;
      state.columns[column].push(task);
    },
    moveTask: (state, action) => {
      const { fromColumn, toColumn, taskId } = action.payload;
      const taskIndex = state.columns[fromColumn].findIndex((task) => task.id === taskId);
      const [task] = state.columns[fromColumn].splice(taskIndex, 1);
      state.columns[toColumn].push(task);
    },
  },
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
