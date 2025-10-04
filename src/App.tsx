import React, { useState, useEffect, DragEvent } from "react";
import { MainWorkspace } from "./components/MainWorkspace";
import ResizableDraggablePanel from "./components/ResizableDraggablePanel";
import UserProfile from "./components/UserProfile";
import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";
import { panelList } from "./panelList";
import { getGridCellPosition } from "./utils/grid";
import { getInitialTheme, THEME_KEY } from "./utils/theme";
import { NAV_BAR_HEIGHT, GRID_COLS, GRID_ROWS, INACTIVITY_LIMIT } from "./utils/constants";

type OpenPanel = {
  id: string;
  key: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
};

function App() {
  const [openPanels, setOpenPanels] = useState<OpenPanel[]>([]);
  const [dragNavPanelKey, setDragNavPanelKey] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [dropCell, setDropCell] = useState<{ row: number; col: number } | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme());

  /** Handle inactivity logout */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("isLoggedIn");
        window.dispatchEvent(new Event("login-success"));
      }, INACTIVITY_LIMIT);
    };
    ["mousemove", "keydown", "mousedown", "touchstart"].forEach((event) =>
      window.addEventListener(event, resetTimer)
    );
    resetTimer();
    return () => clearTimeout(timer);
  }, []);

  /** Apply theme to body */
  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  /** Toggle theme */
  const handleThemeToggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  };

  /** Handle grid info update */
  const handleGridDropInfo = (info: {
    cell: { row: number; col: number } | null;
    size: { width: number; height: number };
  }) => {
    setDropCell(info.cell);
    setContainerSize(info.size);
  };

  /** Handle drop from nav */
  const onMainDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const key = e.dataTransfer.getData("panelKey");
    if (!key) return;

    const panelDef = panelList.find((p) => p.key === key);
    if (!panelDef) return;

    const id = `${key}-${Date.now()}`;
    let { x, y, width, height } = { x: 60, y: NAV_BAR_HEIGHT + 10, width: 700, height: 420 };

    if (dropCell && containerSize.width && containerSize.height) {
      const availableHeight = containerSize.height - NAV_BAR_HEIGHT;
      const pos = getGridCellPosition(
        dropCell.row,
        dropCell.col,
        containerSize.width,
        availableHeight,
        NAV_BAR_HEIGHT
      );
      width = Math.min(pos.width, containerSize.width);
      height = Math.min(pos.height, availableHeight);
      x = pos.x;
      y = pos.y;
    }

    setOpenPanels([
      ...openPanels,
      {
        id,
        key: panelDef.key,
        title: panelDef.title,
        content: panelDef.content,
        x,
        y,
        width,
        height,
      },
    ]);
    setDragNavPanelKey(null);
  };

  return (
    <div className={`app-root theme-${theme}`} style={{ display: "flex", height: "100vh" }}>
      {navOpen && (
        <Navigation dragNavPanelKey={dragNavPanelKey} setDragNavPanelKey={setDragNavPanelKey} />
      )}
      <MainWorkspace
        onDrop={onMainDrop}
        onDragOver={(e) => e.preventDefault()}
        onGridDropInfo={handleGridDropInfo}
        gridRows={GRID_ROWS}
        gridCols={GRID_COLS}>
        <main style={{ flex: 1, position: "relative", background: "#232b3e", overflow: "hidden" }}>
          <TopBar navOpen={navOpen} setNavOpen={setNavOpen}>
            <UserProfile
              onLogout={() => {
                localStorage.removeItem("isLoggedIn");
                window.dispatchEvent(new Event("login-success"));
              }}
              onThemeToggle={handleThemeToggle}
              theme={theme}
            />
          </TopBar>
          {openPanels.length === 0 ? (
            <div style={{ color: "#888", textAlign: "center", marginTop: "2rem" }}>
              No panels open.
              <br />
              Drag one from the navigation bar.
            </div>
          ) : (
            openPanels.map((panel) => (
              <ResizableDraggablePanel
                key={panel.id}
                {...{ ...panel, key: undefined }}
                onClose={() => setOpenPanels(openPanels.filter((p) => p.id !== panel.id))}
                onMove={(dx: number, dy: number) =>
                  setOpenPanels((panels) =>
                    panels.map((p) => (p.id === panel.id ? { ...p, x: p.x + dx, y: p.y + dy } : p))
                  )
                }
                onResize={(dw: number, dh: number) =>
                  setOpenPanels((panels) =>
                    panels.map((p) =>
                      p.id === panel.id
                        ? {
                            ...p,
                            width: Math.max(200, p.width + dw),
                            height: Math.max(100, p.height + dh),
                          }
                        : p
                    )
                  )
                }
              />
            ))
          )}
        </main>
      </MainWorkspace>
    </div>
  );
}

export default App;
