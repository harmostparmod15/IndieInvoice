// store/clientSlice.js
import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
  },
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    clearClients: (state) => {
      state.clients = [];
    },
  },
});

export const { setClients, addClient, clearClients } = clientSlice.actions;

export default clientSlice.reducer;
