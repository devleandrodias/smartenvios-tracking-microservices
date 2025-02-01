"use client";

import { useState, useEffect } from "react";

import type { SavedTracking } from "../types/tracking";

export function useTracking() {
  const [savedTrackings, setSavedTrackings] = useState<SavedTracking[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedTrackings");
    if (saved) {
      setSavedTrackings(JSON.parse(saved));
    }
  }, []);

  const saveTracking = (tracking: SavedTracking) => {
    const newTrackings = [...savedTrackings, tracking];
    setSavedTrackings(newTrackings);
    localStorage.setItem("savedTrackings", JSON.stringify(newTrackings));
  };

  const removeTracking = (id: string) => {
    const newTrackings = savedTrackings.filter((t) => t.id !== id);
    setSavedTrackings(newTrackings);
    localStorage.setItem("savedTrackings", JSON.stringify(newTrackings));
  };

  return {
    savedTrackings,
    saveTracking,
    removeTracking,
  };
}
