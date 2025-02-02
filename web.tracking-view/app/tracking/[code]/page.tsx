"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Package, Truck, Home, CheckCircle, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTrackingEvents } from "@/app/services/tracking.service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TrackingDetailPage() {
  const router = useRouter();
  const params = useParams();

  const { isPending, isError, data } = useQuery({
    retry: 2,
    queryKey: ["trackingData", params.code],
    queryFn: async () => {
      return getTrackingEvents(String(params.code));
    },
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ENTREGA REALIZADA":
        return <Package className="w-5 h-5 md:w-6 md:h-6" />;
      case "RECEBIDO NA BASE":
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

        {isPending ? (
          <div className="text-center py-8">
            <p>Carregando informações...</p>
          </div>
        ) : isError ? (
          <Alert
            variant="destructive"
            className="bg-red-900 border-red-800 text-white"
          >
            <AlertTitle>Erro ao rastrear</AlertTitle>
            <AlertDescription>
              Não foi possível encontrar seu pedido para código de rastreio{" "}
              {params.code}
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-4">
              {data.events.map((event) => (
                <div key={event._id} className="relative">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-violet-600 flex items-center justify-center">
                        {getIcon(event.status)}
                      </div>
                      {/* {index !== events.length - 1 && (
                        <div className="w-0.5 h-14 md:h-16 bg-gray-700 mt-2" />
                      )} */}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm md:text-base">
                        {event.status}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        {event.location}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
                        {event.timestamp}
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
