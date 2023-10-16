import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Column } from "../../types/Column";

export interface IColumnState {
  column: Column[];
}

const initialState: IColumnState = {
  column: [],
};

const columnReducer = createSlice({
  name: "column",
  initialState,
  reducers: {
    getAllColumns: (state: IColumnState, action: PayloadAction<Column[]>) => {
      state.column = action.payload;
    },

    addColumn: (state: IColumnState, action: PayloadAction<Column>) => {
      state.column.push(action.payload);
    },

    updateColumnOrder: (
      state: IColumnState,
      action: PayloadAction<Column[]>
    ) => {
      state.column = action.payload;
    },
  },
});

export const { getAllColumns, addColumn, updateColumnOrder } =
  columnReducer.actions;
export default columnReducer.reducer;
