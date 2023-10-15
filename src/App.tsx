import { Button } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskBoard } from "./components/TaskBoard";
import { columns } from "./constants/columns";
import { IRootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, getAllColumns } from "./redux/columns/reducer";
import { addTask, getAllTasks } from "./redux/tasks/reducer";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector((state: IRootState) => state.task.task);
  const column = useSelector((state: IRootState) => state.column.column);

  // below part is the example code beforehand without react-redux but only useState

  // const [tasks, setTasks] = useState<CardInfo[]>(
  //   JSON.parse(localStorage.getItem("tasks") || "[]")
  // );

  // const [column, setColumn] = useState<string[]>(() => {
  //   const saved = localStorage.getItem("columns");
  //   if (!saved) {
  //     return columns;
  //   } else {
  //     return JSON.parse(saved);
  //   }
  // });

  useEffect(() => {
    const saved = localStorage.getItem("columns");
    dispatch(getAllColumns(saved ? JSON.parse(saved) : columns));
    dispatch(getAllTasks(JSON.parse(localStorage.getItem("tasks") || "[]")));
  }, [dispatch]);

  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const onSubmit = (values: {
    title: string;
    category: string;
    dueDate: string;
    column: string;
  }) => {
    dispatch(
      addTask({
        id: Date.now(),
        text: values.title,
        ...values,
      })
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...tasks,
        { id: Date.now(), text: values.title, ...values },
      ])
    );
    setShowCreateTaskModal(false);
  };

  const onColumnFormSubmit = (values: { name: string }) => {
    dispatch(
      addColumn({ ...values, id: column.length, columnOrder: column.length })
    );
    localStorage.setItem(
      "columns",
      JSON.stringify([
        ...column,
        { ...values, id: column.length, columnOrder: column.length },
      ])
    );
  };

  return (
    <div className="task-manager">
      <div className="d-flex justify-content-end mb-4">
        <Button
          onClick={() => {
            setShowCreateTaskModal(true);
          }}
          variant="success"
        >
          Add
        </Button>
      </div>
      {showCreateTaskModal && (
        <TaskForm
          onSubmit={onSubmit}
          onColumnFormSubmit={onColumnFormSubmit}
          show={showCreateTaskModal}
          handleClose={() => setShowCreateTaskModal(false)}
          columns={column.map((col) => col.name)}
        />
      )}
      <TaskBoard />
    </div>
  );
}

export default App;
