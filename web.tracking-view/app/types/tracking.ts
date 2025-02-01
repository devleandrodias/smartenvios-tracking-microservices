export interface TrackingEvent {
    status: string
    date: string
    location: string
    icon: "package" | "truck" | "home" | "check"
}

export interface SavedTracking {
    id: string
    trackingNumber: string
    description: string
    lastStatus?: string
    lastUpdate?: string
}

