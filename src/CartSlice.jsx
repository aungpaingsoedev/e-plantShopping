/* eslint-disable react-refresh/only-export-components -- Redux slice module, not a component */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        return;
      }
      state.items.push({ name, image, cost, quantity: 1 });
    },
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((entry) => entry.name === name);
      if (!item) {
        return;
      }
      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.name !== name);
        return;
      }
      item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
