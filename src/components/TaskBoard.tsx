import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../store";
import { ColumnPlaceholder } from "./ColumnPlaceholder";

export function TaskBoard(): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const columns = useSelector((state: IRootState) => state.column.column);

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
        <div className="drop-board">
          <button
            className="left-button"
            onClick={scrollLeft}
            aria-label="Left button"
          >
            <i className="gg-arrow-left" />
          </button>
          {[...columns]
            .sort((a, b) => a.columnOrder - b.columnOrder)
            .map((col) => {
              return <ColumnPlaceholder key={col.id} order={col.id} />;
            })}
          <button
            className="right-button"
            onClick={scrollRight}
            aria-label="Right button"
          >
            <i className="gg-arrow-right" />
          </button>
        </div>
      </div>
    </DndProvider>
  );
}
