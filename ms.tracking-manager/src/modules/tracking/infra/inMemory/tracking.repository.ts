import { ESmartEnviosStatus, ITracking } from "../../entities/ITracking";
import { ITrackingRepository } from "../../repositories/ITrackingRepository";

export class TrackingRepositoryInMemory implements ITrackingRepository {
  private readonly trackings: ITracking[] = [
    {
      id: "5fdb7268-0219-4e1b-98d5-2016df774282",
      orderId: "129e5c4a-8e68-4f99-9952-947bd0248739",
      shippingCompany: "Carriers",
      trackingCode: "SM82886187440BM",
      events: [
        {
          observation: "Na filial distribuidora",
          status: ESmartEnviosStatus.COLETADO,
        },
        {
          observation: "Em rota de entrega",
          status: ESmartEnviosStatus.EM_ROTA_ENTREGA,
        },
        {
          observation: "Entregue",
          status: ESmartEnviosStatus.ENTREGA,
        },
      ],
    },
  ];

  async getTrackingByCode(
    trackingCode: string
  ): Promise<ITracking | undefined> {
    return this.trackings.find(
      (tracking) => tracking.trackingCode === trackingCode
    );
  }

  async saveOrderTracking(): Promise<void> {
    this.trackings.push({
      id: "",
      events: [],
      orderId: "",
      shippingCompany: "",
      trackingCode: "",
    });
  }

  async addTrackingEvent(): Promise<ITracking> {
    const tracking = await this.getTrackingByCode("");

    if (!tracking) {
      throw new Error("Tracking not found!");
    }

    tracking.events.push({
      observation: "",
      status: ESmartEnviosStatus.COLETADO,
    });

    return tracking;
  }
}
