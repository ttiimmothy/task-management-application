import { useDispatch, useSelector } from "react-redux";
import { Column } from "./Column";
import { deleteTask, updateTaskColumn } from "../redux/tasks/reducer";
import { IRootState } from "../store";
import { useDrop } from "react-dnd";
import { updateColumnOrder } from "../redux/columns/reducer";

type ColumnPlaceholderProps = {
  order: number;
  columnOrder?: number;
};

export function ColumnPlaceholder({
  order,
}: ColumnPlaceholderProps): JSX.Element {
  const cards = useSelector((state: IRootState) => state.task.task);
  const columns = useSelector((state: IRootState) => state.column.column);

  const dispatch = useDispatch();

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

  const moveColumn = (name: string, order: number) => {
    const stored = columns.find((col) => col.name === name);
    const anotherStored = columns.find((col) => col.id === order);

    if (stored && anotherStored) {
      const updatedColumns = columns.map((col) => {
        if (col.id === order) {
          return { ...col, columnOrder: stored.columnOrder };
        } else if (col.name === name) {
          return { ...col, columnOrder: anotherStored.columnOrder };
        }
        return col;
      });

      localStorage.setItem("columns", JSON.stringify(updatedColumns));
      dispatch(updateColumnOrder(updatedColumns));
    }
  };

  const [, dropBoard] = useDrop({
    accept: "Status",
    drop: (item: { name: string }) => moveColumn(item.name, order),
  });

  return (
    <div ref={dropBoard}>
      {columns
        .filter((col) => col.id === order)
        .map((column) => {
          return (
            <Column
              key={column.id}
              title={column.name}
              cards={cards.filter((card) => card.column === column.name)}
              onDropCard={moveCard}
              removeCard={removeCard}
            />
          );
        })}
    </div>
  );
}
