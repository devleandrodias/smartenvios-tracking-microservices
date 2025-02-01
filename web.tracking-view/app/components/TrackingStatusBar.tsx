"use client"

import { Package, Plane, Truck, CheckCircle } from "lucide-react"

interface TrackingStatusBarProps {
    currentStatus: "picked" | "started" | "delivery" | "completed"
    originLocation: string
    destinationLocation: string
    dates: {
        pickupDate: string
        estimatedDelivery: string
    }
}

export function TrackingStatusBar({
    currentStatus,
    originLocation,
    destinationLocation,
    dates,
}: TrackingStatusBarProps) {
    const steps = [
        { id: "picked", icon: Package, label: "Coletado" },
        { id: "started", icon: Plane, label: "Em Trânsito" },
        { id: "delivery", icon: Truck, label: "Em Entrega" },
        { id: "completed", icon: CheckCircle, label: "Entregue" },
    ]

    const getCurrentStepIndex = () => {
        return steps.findIndex((step) => step.id === currentStatus)
    }

    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 w-full">
            {/* Origem e Destino */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-400 text-xs md:text-sm">De</p>
                    <p className="text-white font-medium text-sm md:text-base">{originLocation}</p>
                    <p className="text-xs md:text-sm text-gray-300">{dates.pickupDate}</p>
                </div>
                <div className="md:text-right">
                    <p className="text-gray-400 text-xs md:text-sm">Para</p>
                    <p className="text-white font-medium text-sm md:text-base">{destinationLocation}</p>
                    <p className="text-xs md:text-sm text-gray-300">{dates.estimatedDelivery}</p>
                </div>
            </div>

            {/* Barra de Status */}
            <div className="relative px-4 md:px-8">
                {/* Linha de Progresso */}
                <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-700">
                    <div
                        className="h-full bg-gradient-to-r from-violet-600 to-orange-500"
                        style={{
                            width: `${(getCurrentStepIndex() / (steps.length - 1)) * 100}%`,
                            transition: "width 0.5s ease-in-out",
                        }}
                    />
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const isActive = getCurrentStepIndex() >= index
                        const Icon = step.icon

                        return (
                            <div key={step.id} className="flex flex-col items-center" style={{ width: "20%" }}>
                                <div
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-200 ${isActive ? (index === getCurrentStepIndex() ? "bg-orange-500" : "bg-violet-600") : "bg-gray-700"
                                        }`}
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <p className={`mt-2 text-center text-[10px] md:text-sm ${isActive ? "text-white" : "text-gray-400"}`}>
                                    {step.label}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

