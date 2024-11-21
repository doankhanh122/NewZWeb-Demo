import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    columns: {
      assignWork: {
        id: "assignWork",
        title: "Giao việc",
        color: "green",
        tasks: [
          { id: 1, title: "ThuyTTT", label: "" },
          { id: 2, title: "QuanhND", label: "" },
          { id: 3, title: "KhoaMPN", label: "" },
        ],
      },
      myWork: {
        id: "myWork",
        title: "Việc của tôi",
        color: "orange",
        tasks: [
          { id: 4, title: "To-do", label: "" },
          { id: 5, title: "In Progress", label: "" },
          { id: 6, title: "Done", label: "" },
        ],
      },
      feedback: {
        id: "feedback",
        title: "Xin ý kiến",
        color: "red",
        tasks: [
          { id: 7, title: "Trình Giám Đốc", label: "" },
          { id: 8, title: "Phòng DVKH", label: "" },
          { id: 9, title: "Phòng Đối Đác Tháng", label: "" },
        ],
      },
    },
  },
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      state.columns[columnId].tasks.push(task);
    },
    moveTask: (state, action) => {
      const { fromColumnId, toColumnId, taskId } = action.payload;
      const fromColumn = state.columns[fromColumnId];
      const toColumn = state.columns[toColumnId];

      const taskIndex = fromColumn.tasks.findIndex((task) => task.id === taskId);
      const [movedTask] = fromColumn.tasks.splice(taskIndex, 1);
      toColumn.tasks.push(movedTask);
    },
  },
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
