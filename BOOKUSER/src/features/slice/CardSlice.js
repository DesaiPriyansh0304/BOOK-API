import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card", 
  initialState: {
    cards: [], 
  },
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload); 
    },
    removeCard: (state, action) => {
      const id = action.payload;
      state.cards = state.cards.filter((item) => item._id !== id);
    },
    incrementQty: (state, action) => {
      const item = state.cards.find((item) => item._id === action.payload._id);
      if (item) {
        item.qty += 1;
      }
    },

    decrementQty: (state, action) => {
      const item = state.cards.find((item) => item._id === action.payload._id);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
  },
});

export const { addCard, removeCard, incrementQty, decrementQty } =
  cardSlice.actions;

export default cardSlice.reducer;
