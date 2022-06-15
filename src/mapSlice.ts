import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface initialState {
  map: any;
  markers: any[][];
}

const mapSilce = createSlice({
  name: 'map',
  initialState: { map: null, markers: [] } as initialState,
  reducers: {
    setMap: (state, action: PayloadAction<any>) => {
      state.map = action.payload;
    },
    addMarker: (state, action: PayloadAction<any>) => {
      state.markers.push(action.payload);
    },
  },
});

export const mapSelector = (state: RootState) => state.map.map;

export const { setMap, addMarker } = mapSilce.actions;
export default mapSilce.reducer;
