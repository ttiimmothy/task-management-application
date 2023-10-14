import { useDrag } from "react-dnd";

export type CardInfo = {
  id: number;
  text: string;
  column: string;
  category: string;
  dueDate: string;
};

type CardProps = {
  id: number;
  text: string;
  category: string;
  dueDate: string;
  removeCard: (id: number) => void;
};

export function Card({
  id,
  text,
  category,
  dueDate,
  removeCard,
}: CardProps): JSX.Element {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
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
      <button className="close-button" onClick={() => removeCard(id)}>
        <i className="gg-close"></i>
      </button>
    </div>
  );
}
