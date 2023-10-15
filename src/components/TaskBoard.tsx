import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Column } from "./Column";
import { CardInfo } from "./Card";

type TaskBoardProps = {
  cards: CardInfo[];
  setTasks: React.Dispatch<React.SetStateAction<CardInfo[]>>;
};

export function TaskBoard({ cards, setTasks }: TaskBoardProps): JSX.Element {
  const moveCard = (id: number, column: string) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, column } : card
    );
    localStorage.setItem("tasks", JSON.stringify(updatedCards));
    setTasks(updatedCards);
  };

  const removeCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedCards));
    setTasks(updatedCards);
  };

  const columns = ["To-Do", "In Progress", "Done"];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            cards={cards.filter((card) => card.column === col)}
            onDropCard={moveCard}
            removeCard={removeCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}
