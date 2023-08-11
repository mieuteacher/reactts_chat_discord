import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from './slices/chat.slice';

// Kết hợp reducer
const rootReducer = combineReducers({
  chatStore: chatReducer,
});

// Xuất ra type của RootStore
export type RootStore = ReturnType<typeof rootReducer>;

// tạo ra store
const store = configureStore({
  reducer: rootReducer,
});

export default store;