import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { defData } from './types/types';

interface initialState {
  data: defData[];
  searchKey: string;
}

const dataSilce = createSlice({
  name: 'data',
  initialState: { data: [], searchKey: '' } as initialState,
  reducers: {
    dataSet: (state, action: PayloadAction<defData[]>) => {
      state.data = action.payload;
    },
    searchKeySet: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
  },
});

const dataSelector = (state: RootState) => state.data.data;
const searchKeySelector = (state: RootState) => state.data.searchKey;

export const selectData = createSelector(
  dataSelector,
  searchKeySelector,
  (data, key) => {
    if (key) {
      return data.filter((item) => item.addr.includes(key));
    } else {
      return data;
    }
  }
);

export const { dataSet, searchKeySet } = dataSilce.actions;
export default dataSilce.reducer;
