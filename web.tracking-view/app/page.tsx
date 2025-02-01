"use client";

import { useTracking } from "./hooks/useTrackings";
import { TrackingList } from "./components/TrackingList";
import { AddTrackingDialog } from "./components/TrackingDialog";

export default function HomePage() {
  const { savedTrackings, saveTracking, removeTracking } = useTracking();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Meus Rastreios</h1>
          <AddTrackingDialog onSave={saveTracking} />
        </div>
        <TrackingList trackings={savedTrackings} onRemove={removeTracking} />
      </div>
    </div>
  );
}
