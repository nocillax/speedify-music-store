import { Table2, LayoutGrid, Shuffle } from "lucide-react";
import useSeedifyStore from "../store/useSeedifyStore";
import { cn } from "../utils/cn";

const Toolbar = () => {
  const {
    seed,
    avgLikes,
    language,
    viewMode,
    setSeed,
    setAvgLikes,
    setLanguage,
    setViewMode,
    generateRandomSeed,
  } = useSeedifyStore();

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="language"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English (US)</option>
            <option value="de">German (Germany)</option>
          </select>
        </div>

        {/* Seed Input */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="seed"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seed
          </label>
          <input
            id="seed"
            type="number"
            value={seed}
            onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
            className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateRandomSeed}
            className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            title="Generate Random Seed"
          >
            <Shuffle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Likes Slider */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <label
            htmlFor="likes"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Likes
          </label>
          <input
            id="likes"
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={avgLikes}
            onChange={(e) => setAvgLikes(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3ch]">
            {avgLikes.toFixed(1)}
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setViewMode("table")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "table"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
            title="Table View"
          >
            <Table2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("gallery")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "gallery"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
            title="Gallery View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
