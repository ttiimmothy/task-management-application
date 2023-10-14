import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Column } from "./Column";
import { CardInfo } from "./Card";
import { Task } from "../interfaces/Task";

type TaskBoardProps = {
  cards: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
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
  const cardInfo: CardInfo[] = cards.map((card) => ({
    text: card.title,
    ...card,
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-board">
        {columns.map((col) => (
          <Column
            key={col}
            title={col}
            cards={cardInfo.filter((card) => card.column === col)}
            onDropCard={moveCard}
            removeCard={removeCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}
