import { useState, useEffect, useRef, useCallback } from "react";
import useSeedifyStore from "../store/useSeedifyStore";
import SongCard from "./SongCard";
import SongDetails from "./SongDetails";
import { X } from "lucide-react";

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : "";

const SongGallery = () => {
  const { seed, avgLikes, language } = useSeedifyStore();
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedSong, setSelectedSong] = useState(null);
  const observerRef = useRef();
  const lastSongRef = useRef();

  const cardsPerBatch = 20;

  useEffect(() => {
    setSongs([]);
    setPage(1);
    loadSongs(1);
  }, [seed, language]);

  useEffect(() => {
    if (songs.length > 0) {
      setSongs([]);
      setPage(1);
      loadSongs(1);
    }
  }, [avgLikes]);

  const loadSongs = useCallback(
    async (pageNum) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/songs?seed=${seed}&page=${pageNum}&songsPerPage=${cardsPerBatch}&avgLikes=${avgLikes}&language=${language}`
        );
        if (!response.ok) return;
        const data = await response.json();
        setSongs((prev) => [...prev, ...data.songs]);
      } catch (error) {
        console.error("Failed to load songs:", error);
      }
    },
    [seed, avgLikes, language]
  );

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            loadSongs(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.5 }
    );

    if (lastSongRef.current) {
      observerRef.current.observe(lastSongRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [songs, loadSongs]);

  const handleCardClick = (song) => {
    setSelectedSong(song);
  };

  const handleCloseModal = () => {
    setSelectedSong(null);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((song, index) => (
            <div
              key={song.id}
              ref={index === songs.length - 1 ? lastSongRef : null}
            >
              <SongCard song={song} onClick={handleCardClick} />
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center mt-8">
          <div className="animate-pulse text-gray-500 dark:text-gray-400">
            Loading more songs...
          </div>
        </div>
      </div>

      {/* Modal for Song Details */}
      {selectedSong && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full z-10"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="p-6">
              <SongDetails song={selectedSong} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SongGallery;
