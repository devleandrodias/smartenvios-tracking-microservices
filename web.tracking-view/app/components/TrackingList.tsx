import { Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { SavedTracking } from "../types/tracking";
import Link from "next/link";
import { ConfirmDeleteDialog } from "./TrackingDialogRemove";

interface TrackingListProps {
  trackings: SavedTracking[];
  onRemove: (id: string) => void;
}

export function TrackingList({ trackings, onRemove }: TrackingListProps) {
  if (trackings.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        <p>Nenhum rastreio salvo ainda</p>
        <p className="text-sm">Adicione um código de rastreio para começar</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-8">
      {trackings.map((tracking) => (
        <Card
          key={tracking.id}
          className="bg-gray-800 border-gray-700 p-4 hover:bg-gray-750 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <Link
                href={`/tracking/${tracking.trackingNumber}`}
                className="block"
              >
                <p className="font-medium text-white">{tracking.description}</p>
                <p className="text-sm text-gray-300">
                  {tracking.trackingNumber}
                </p>
                {tracking.lastStatus && (
                  <p className="text-sm text-gray-400 mt-1">
                    {tracking.lastStatus} - {tracking.lastUpdate}
                  </p>
                )}
              </Link>
            </div>
            <ConfirmDeleteDialog
              onConfirm={() => onRemove(tracking.id)}
              trackingNumber={tracking.trackingNumber}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
