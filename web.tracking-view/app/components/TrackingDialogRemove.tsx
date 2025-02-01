"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteDialogProps {
  onConfirm: () => void;
  trackingNumber: string;
}

export function ConfirmDeleteDialog({
  onConfirm,
  trackingNumber,
}: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Confirmar Remoção</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-300">
            Tem certeza que deseja remover o rastreio{" "}
            <span className="font-semibold">{trackingNumber}</span>?
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Esta ação não pode ser desfeita.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Remover
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
