import { useEffect, useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { generateAlbumCover } from "../generators/coverGenerator";
import { generateReview } from "../generators/reviewGenerator";
import {
  playMelody,
  pauseAudio,
  resumeAudio,
  stopAudio,
} from "../generators/audioGenerator";
import useSeedifyStore from "../store/useSeedifyStore";

const SongDetails = ({ song }) => {
  const { language } = useSeedifyStore();
  const [coverUrl, setCoverUrl] = useState("");
  const [review, setReview] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  useEffect(() => {
    // Generate cover and review
    const cover = generateAlbumCover(song.seed, song.title, song.artist);
    const rev = generateReview(parseInt(song.seed.replace(/-/g, "")), language);

    setCoverUrl(cover);
    setReview(rev);

    // Cleanup audio on unmount
    return () => {
      stopAudio();
      setIsPlaying(false);
      setHasStarted(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [song, language]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      // Pause
      pauseAudio();
      setIsPlaying(false);
      pausedTimeRef.current = currentTime;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      if (!hasStarted) {
        // First time playing - start from beginning
        const totalDuration = await playMelody(song.seed);
        setDuration(totalDuration);
        setIsPlaying(true);
        setHasStarted(true);
        setCurrentTime(0);
        startTimeRef.current = Date.now();
        pausedTimeRef.current = 0;

        // Update progress bar
        intervalRef.current = setInterval(() => {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          if (elapsed >= totalDuration) {
            setCurrentTime(totalDuration);
            setIsPlaying(false);
            setHasStarted(false);
            clearInterval(intervalRef.current);
          } else {
            setCurrentTime(elapsed);
          }
        }, 100);
      } else {
        // Resume from pause
        await resumeAudio();
        setIsPlaying(true);
        startTimeRef.current = Date.now() - pausedTimeRef.current * 1000;

        // Update progress bar
        intervalRef.current = setInterval(() => {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          if (elapsed >= duration) {
            setCurrentTime(duration);
            setIsPlaying(false);
            setHasStarted(false);
            clearInterval(intervalRef.current);
          } else {
            setCurrentTime(elapsed);
          }
        }, 100);
      }
    }
  };

  // Format duration in MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Album Cover */}
        <div className="flex-shrink-0">
          <img
            src={coverUrl}
            alt={`${song.title} cover`}
            className="w-64 h-64 rounded-lg shadow-lg"
          />

          {/* Audio Player */}
          <div className="mt-4 w-64 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="absolute h-full bg-blue-500 rounded-full transition-all"
                  style={{
                    width:
                      duration > 0
                        ? `${(currentTime / duration) * 100}%`
                        : "0%",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{formatDuration(currentTime)}</span>
                <span>{duration > 0 ? formatDuration(duration) : "--:--"}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Song Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {song.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
            by {song.artist}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-500 mb-4">
            from <em>{song.album}</em> • {song.genre}{" "}
            {duration > 0 && `• ${formatDuration(duration)}`}
          </p>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Review
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {review}
            </p>
          </div>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            <p>Apple Records, 2019</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
