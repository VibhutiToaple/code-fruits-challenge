import React from "react";
import { NAV_BAR_HEIGHT } from "../utils/constants";

type Props = {
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  children: React.ReactNode;
};

const TopBar: React.FC<Props> = ({ navOpen, setNavOpen, children }) => (
  <div
    style={{
      width: "100%",
      background: "#2b3556",
      color: "#fff",
      padding: "0.5rem 1.5rem",
      display: "flex",
      alignItems: "center",
      minHeight: NAV_BAR_HEIGHT,
    }}>
    <button
      onClick={() => setNavOpen(!navOpen)}
      style={{
        background: "transparent",
        border: "none",
        color: "#fff",
        fontSize: 26,
        cursor: "pointer",
        marginRight: 20,
      }}>
      {navOpen ? "✖" : "☰"}
    </button>
    <span
      style={{
        fontFamily: "monospace",
        fontWeight: 700,
        fontSize: 22,
        textTransform: "uppercase",
      }}>
      fruteria
    </span>
    <div style={{ flex: 1 }} />
    {children}
  </div>
);

export default TopBar;
