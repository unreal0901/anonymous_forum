import { configureStore } from "@reduxjs/toolkit";

// API
import { threadApi } from "../services/api/ThreadApi";
import { boardApi } from "../services/api/BoardApi";

// Reducers
import threadReducer from "../features/Threads/ThreadSlice";
import boardReucer from "../features/Boards/BoardSlice";
export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
    boardState: boardReucer,
    threadState: threadReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      threadApi.middleware,
      boardApi.middleware,
    ]),
});
