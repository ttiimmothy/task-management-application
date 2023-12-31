import { useDrag } from "react-dnd";

type TaskCardProps = {
  id: number;
  text: string;
  category: string;
  dueDate: string;
  removeCard: (id: number) => void;
};

export function TaskCard({
  id,
  text,
  category,
  dueDate,
  removeCard,
}: TaskCardProps): JSX.Element {
  const [{ isDragging }, drag] = useDrag({
    type: "Card",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {text}
      <div className="category">{category}</div>
      <div className="due-date">Due Date: {dueDate}</div>
      <button
        className="close-button"
        onClick={() => removeCard(id)}
        aria-label="Close button"
      >
        <i className="gg-close" />
      </button>
    </div>
  );
}
