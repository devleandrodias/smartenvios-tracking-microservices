"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Package, Truck, Home, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrackingEvent } from "@/app/types/tracking";
import { TrackingStatusBar } from "@/app/components/TrackingStatusBar";

export default function TrackingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      setIsLoading(true);
      setError(null);

      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate a random success/error response
      if (Math.random() > 0.5) {
        setEvents([
          {
            status: "Entrega realizada",
            date: "2024-02-01 14:30",
            location: "São Paulo, SP",
            icon: "check",
          },
          {
            status: "Em rota de entrega",
            date: "2024-02-01 09:15",
            location: "São Paulo, SP",
            icon: "truck",
          },
          {
            status: "Chegou ao centro de distribuição",
            date: "2024-01-31 18:20",
            location: "Guarulhos, SP",
            icon: "home",
          },
          {
            status: "Pedido registrado",
            date: "2024-01-30 10:00",
            location: "Curitiba, PR",
            icon: "package",
          },
        ]);
      } else {
        setError(
          "Código de rastreio não encontrado. Verifique se o código está correto e tente novamente."
        );
      }

      setIsLoading(false);
    };

    fetchTracking();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "package":
        return <Package className="w-5 h-5 md:w-6 md:h-6" />;
      case "truck":
        return <Truck className="w-5 h-5 md:w-6 md:h-6" />;
      case "home":
        return <Home className="w-5 h-5 md:w-6 md:h-6" />;
      case "check":
        return <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />;
      default:
        return <Package className="w-5 h-5 md:w-6 md:h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-2 md:p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center mb-4 md:mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <h1 className="text-lg md:text-xl font-semibold ml-2">
            Detalhes do Rastreio
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Carregando informações...</p>
          </div>
        ) : error ? (
          <Alert
            variant="destructive"
            className="bg-red-900 border-red-800 text-white"
          >
            <AlertTitle>Erro ao rastrear</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="mb-6 md:mb-8">
              <TrackingStatusBar
                currentStatus="delivery"
                originLocation="Curitiba, PR"
                destinationLocation="São Paulo, SP"
                dates={{
                  pickupDate: "30 Jan 2024",
                  estimatedDelivery: "02 Fev 2024",
                }}
              />
            </div>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-violet-600 flex items-center justify-center">
                        {getIcon(event.icon)}
                      </div>
                      {index !== events.length - 1 && (
                        <div className="w-0.5 h-14 md:h-16 bg-gray-700 mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm md:text-base">
                        {event.status}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        {event.location}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
                        {event.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
