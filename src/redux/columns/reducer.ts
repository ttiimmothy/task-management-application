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
      action: PayloadAction<{ name: string; order: number }>
    ) => {
      const { name, order } = action.payload;
      const stored = state.column.find((col) => col.name === name);
      if (stored) {
        state.column.filter((col) => col.id === order)[0].columnOrder =
          stored.columnOrder;
        state.column.filter((col) => col.name === name)[0].columnOrder = order;
      }
    },
  },
});

export const { getAllColumns, addColumn, updateColumnOrder } =
  columnReducer.actions;
export default columnReducer.reducer;
