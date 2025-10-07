import { useEffect } from "react";
import useSeedifyStore from "./store/useSeedifyStore";
import Toolbar from "./components/Toolbar";
import SongTable from "./components/SongTable";
import SongGallery from "./components/SongGallery";

const App = () => {
  const { viewMode, initialize } = useSeedifyStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toolbar />
      {viewMode === "table" ? <SongTable /> : <SongGallery />}
    </div>
  );
};

export default App;
