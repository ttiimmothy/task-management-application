import { useDrag, useDrop } from "react-dnd";
import { TaskCard } from "./TaskCard";

type ColumnProps = {
  title: string;
  cards: {
    id: number;
    text: string;
    column: string;
    category: string;
    dueDate: string;
  }[];
  onDropCard: (id: number, column: string) => void;
  removeCard: (id: number) => void;
};

export function Column({
  title,
  cards,
  onDropCard,
  removeCard,
}: ColumnProps): JSX.Element {
  const [, drop] = useDrop({
    accept: "Card",
    drop: (item: { id: number }) => onDropCard(item.id, title),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Status",
    item: { name: title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(ele) => {
        drop(ele);
        drag(ele);
      }}
      className={`column ${isDragging ? "opacity-50" : "opacity-100"}`}
      // className="column"
    >
      <h2>{title}</h2>
      {cards.length === 0 && (
        <p className="no-cards">No tasks in this category</p>
      )}
      {cards.length > 0 &&
        cards.map((card) => (
          <TaskCard key={card.id} {...card} removeCard={removeCard} />
        ))}
    </div>
  );
}
