import { Button } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskBoard } from "./components/TaskBoard";
import { Task } from "./interfaces/Task";

function App() {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const items = localStorage.getItem("tasks");
    if (items) {
      return JSON.parse(items);
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const onSubmit = (values: {
    title: string;
    category: string;
    dueDate: string;
    column: string;
  }) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...values,
      },
    ]);
    setShowCreateTaskModal(false);
  };

  return (
    <div className="task-manager">
      <div className="d-flex justify-content-between mb-4">
        <span></span>
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
          show={showCreateTaskModal}
          handleClose={() => setShowCreateTaskModal(false)}
        />
      )}
      <TaskBoard cards={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
