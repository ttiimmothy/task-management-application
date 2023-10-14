import { useDrop } from "react-dnd";
import { Card } from "./Card";

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
    accept: "CARD",
    drop: (item: { id: number }) => onDropCard(item.id, title),
  });

  return (
    <div ref={drop} className="column">
      <h2>{title}</h2>
      {cards.length === 0 && (
        <p className="no-cards">No tasks in this category</p>
      )}
      {cards.length > 0 &&
        cards.map((card) => (
          <Card key={card.id} {...card} removeCard={removeCard} />
        ))}
    </div>
  );
}
