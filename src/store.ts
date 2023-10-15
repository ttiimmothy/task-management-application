import { combineReducers, configureStore } from "@reduxjs/toolkit/";
import columnReducer, { IColumnState } from "./redux/columns/reducer";
import taskReducer, { ITaskState } from "./redux/tasks/reducer";

export interface IRootState {
  column: IColumnState;
  task: ITaskState;
}

const reducer = combineReducers<IRootState>({
  column: columnReducer,
  task: taskReducer,
});

export default configureStore({
  reducer,
});
