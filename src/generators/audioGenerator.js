import * as Tone from "tone";
import { createRNG } from "../utils/rng";

let activeSynth = null;
let scheduledEventIds = [];
let isCurrentlyPlaying = false;

export const generateMelody = (seed) => {
  const rng = createRNG(seed);
  const scales = {
    major: ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
    minor: ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "Bb4", "C5"],
    pentatonic: ["C4", "D4", "E4", "G4", "A4", "C5"],
  };

  const scaleTypes = ["major", "minor", "pentatonic"];
  const selectedScale =
    scales[scaleTypes[Math.floor(rng() * scaleTypes.length)]];
  const noteCount = 120 + Math.floor(rng() * 61);
  const notes = [];
  let currentTime = 0;

  for (let i = 0; i < noteCount; i++) {
    const note = selectedScale[Math.floor(rng() * selectedScale.length)];
    const durations = ["8n", "8n", "4n", "4n", "2n"];
    const duration = durations[Math.floor(rng() * durations.length)];
    const timeIncrement =
      duration === "8n" ? 0.25 : duration === "4n" ? 0.5 : 1.0;
    notes.push({ note, duration, time: currentTime });
    currentTime += timeIncrement;
  }

  return { notes, totalDuration: currentTime };
};

export const playMelody = async (seed) => {
  stopAudio();
  await Tone.start();
  isCurrentlyPlaying = true;

  activeSynth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 0.5 },
  }).toDestination();

  const { notes, totalDuration } = generateMelody(seed);

  Tone.Transport.cancel();
  Tone.Transport.stop();
  Tone.Transport.position = 0;
  Tone.Transport.bpm.value = 120;

  notes.forEach((note) => {
    const eventId = Tone.Transport.schedule((time) => {
      if (isCurrentlyPlaying && activeSynth) {
        activeSynth.triggerAttackRelease(note.note, note.duration, time);
      }
    }, note.time);
    scheduledEventIds.push(eventId);
  });

  Tone.Transport.start();
  return totalDuration;
};

export const pauseAudio = () => {
  if (isCurrentlyPlaying) {
    isCurrentlyPlaying = false;
    Tone.Transport.pause();
  }
};

export const resumeAudio = async () => {
  await Tone.start();
  isCurrentlyPlaying = true;
  Tone.Transport.start();
};

export const stopAudio = () => {
  isCurrentlyPlaying = false;
  Tone.Transport.stop();
  Tone.Transport.cancel();
  Tone.Transport.position = 0;
  scheduledEventIds.forEach((id) => Tone.Transport.clear(id));
  scheduledEventIds = [];
  if (activeSynth) {
    try {
      activeSynth.releaseAll();
      activeSynth.disconnect();
      activeSynth.dispose();
    } catch (e) {}
    activeSynth = null;
  }
};

export const isPlaying = () => isCurrentlyPlaying;
