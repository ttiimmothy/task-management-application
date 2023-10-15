import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IColumnState {
  column: string[];
}

const initialState: IColumnState = {
  column: [],
};

const columnReducer = createSlice({
  name: "column",
  initialState,
  reducers: {
    getAllColumns: (state: IColumnState, action: PayloadAction<string[]>) => {
      state.column = action.payload;
    },

    addColumn: (state: IColumnState, action: PayloadAction<string>) => {
      state.column.push(action.payload);
    },
  },
});

export const { getAllColumns, addColumn } = columnReducer.actions;
export default columnReducer.reducer;
