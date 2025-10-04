import React, { DragEvent } from "react";
import { panelList } from "../panelList";
import TermsIcon from "../Icons/TermsIcon";
import AboutIcon from "../Icons/AboutIcon";
import FruitViewIcon from "../Icons/FruitViewIcon";

type Props = {
  dragNavPanelKey: string | null;
  setDragNavPanelKey: (key: string | null) => void;
};

const Navigation: React.FC<Props> = ({ dragNavPanelKey, setDragNavPanelKey }) => {
  const onNavDragStart = (key: string) => (e: DragEvent<HTMLLIElement>) => {
    setDragNavPanelKey(key);
    e.dataTransfer.setData("panelKey", key);
  };

  return (
    <nav
      style={{
        width: 90,
        background: "#232b3e",
        padding: "0.5rem 0.25rem",
        borderRight: "1px solid #3e4a6b",
      }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {panelList.map((panel) => (
          <li
            key={panel.key}
            draggable
            onDragStart={onNavDragStart(panel.key)}
            onDragEnd={() => setDragNavPanelKey(null)}
            style={{
              marginBottom: 16,
              cursor: "grab",
              background: dragNavPanelKey === panel.key ? "#353b4a" : undefined,
              padding: 8,
              borderRadius: 10,
              textAlign: "center",
              color: "#e0e0e0",
            }}>
            <div style={{ marginBottom: 4 }}>
              {panel.key === "fruitbook" ? (
                <TermsIcon />
              ) : panel.key === "fruitview" ? (
                <FruitViewIcon />
              ) : (
                <AboutIcon />
              )}
            </div>
            <div>{panel.title}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
