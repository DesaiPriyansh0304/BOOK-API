import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../features/slice/CardSlice";

export default configureStore({
  reducer: {
    cards: cardReducer,
  },
});
