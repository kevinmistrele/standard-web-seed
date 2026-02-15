import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isInitialized: boolean;
}

const initialState: AppState = {
  isInitialized: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Reducers vazios por enquanto, apenas para satisfazer o Store
  },
});

export default appSlice.reducer;
