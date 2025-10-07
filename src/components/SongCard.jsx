import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { generateAlbumCover } from "../generators/coverGenerator";
import { cn } from "../utils/cn";

const SongCard = ({ song, onClick }) => {
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    const cover = generateAlbumCover(song.seed, song.title, song.artist);
    setCoverUrl(cover);
  }, [song]);

  return (
    <div
      onClick={() => onClick(song)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
    >
      <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={coverUrl}
          alt={`${song.title} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {song.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {song.artist}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {song.genre}
          </span>
          <div className="flex items-center gap-1">
            <Heart
              className="w-4 h-4 text-red-500"
              fill={song.likes > 0 ? "currentColor" : "none"}
            />
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {song.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
