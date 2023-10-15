import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Column } from "./Column";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTaskColumn } from "../redux/tasks/reducer";
import { IRootState } from "../store";

export function TaskBoard(): JSX.Element {
  const dispatch = useDispatch();

  const cards = useSelector((state: IRootState) => state.task.task);
  const columns = useSelector((state: IRootState) => state.column.column);

  const moveCard = (id: number, column: string) => {
    const newTasks = cards.map((task) =>
      task.id === id ? { ...task, column } : task
    );
    dispatch(updateTaskColumn({ id, column }));
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const removeCard = (id: number) => {
    const newTasks = cards.filter((task) => task.id !== id);
    dispatch(deleteTask(id));
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: -500,
        behavior: "smooth", // Add smooth scrolling
      });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board" ref={scrollContainerRef}>
        <button
          className="left-button"
          onClick={scrollLeft}
          aria-label="Left button"
        >
          <i className="gg-arrow-left" />
        </button>
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            cards={cards.filter((card) => card.column === col)}
            onDropCard={moveCard}
            removeCard={removeCard}
          />
        ))}
        <button
          className="right-button"
          onClick={scrollRight}
          aria-label="Right button"
        >
          <i className="gg-arrow-right" />
        </button>
      </div>
    </DndProvider>
  );
}
