import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: {
    todo: { id: 'todo', title: 'To Do', tasks: ['Task 1', 'Task 2'] },
    inProgress: { id: 'inProgress', title: 'In Progress', tasks: ['Task 3'] },
    done: { id: 'done', title: 'Done', tasks: ['Task 4', 'Task 5'] },
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, taskName } = action.payload;
      state.columns[columnId].tasks.push(taskName);
    },
    moveTask: (state, action) => {
      const { taskId, sourceColumnId, targetColumnId } = action.payload;

      state.columns[sourceColumnId].tasks = state.columns[sourceColumnId].tasks.filter(
        (task) => task !== taskId
      );

      state.columns[targetColumnId].tasks.push(taskId);
    },
  },
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
