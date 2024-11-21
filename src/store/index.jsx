import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice'; // Import reducer từ tasksSlice

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// export default store; // Đảm bảo bạn xuất `store` đúng


