import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardInfo } from "../../types/CardInfo";

export interface ITaskState {
  task: CardInfo[];
}

const initialState: ITaskState = {
  task: [],
};

const taskReducer = createSlice({
  name: "Task",
  initialState,
  reducers: {
    getAllTasks: (state: ITaskState, action: PayloadAction<CardInfo[]>) => {
      state.task = action.payload;
    },

    addTask: (state: ITaskState, action: PayloadAction<CardInfo>) => {
      state.task.push(action.payload);
    },

    updateTaskColumn: (
      state: ITaskState,
      action: PayloadAction<{ id: number; column: string }>
    ) => {
      const { id, column } = action.payload;
      state.task.filter((item) => item.id === id)[0].column = column;
    },

    deleteTask: (state: ITaskState, action: PayloadAction<number>) => {
      const id = action.payload;
      // use filter don't because filter is generating a new array instead of mutating the original task array
      state.task.splice(
        state.task.findIndex((item) => item.id === id),
        1
      );
    },
  },
});

export const { getAllTasks, addTask, updateTaskColumn, deleteTask } =
  taskReducer.actions;
export default taskReducer.reducer;
