"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import type { SavedTracking } from "../types/tracking";

interface AddTrackingDialogProps {
  onSave: (tracking: SavedTracking) => void;
}

export function AddTrackingDialog({ onSave }: AddTrackingDialogProps) {
  const [open, setOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!trackingNumber || !description) return;

    onSave({
      id: Math.random().toString(36).substr(2, 9),
      trackingNumber,
      description,
    });

    setTrackingNumber("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Rastreio
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            Adicionar Novo Rastreio
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="tracking" className="text-gray-200">
              Código de Rastreio
            </Label>
            <Input
              id="tracking"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-gray-200">
              Descrição
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Ex: Pedido Shopee"
            />
          </div>
        </div>
        <Button onClick={handleSave} disabled={!trackingNumber || !description}>
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
