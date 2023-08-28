import { ICreateOrderTrackingInput } from "./createOrderTracking.interfaces";
import { TrackingRepository } from "../../infra/typeorm/repositories/tracking.repository";

export class CreateOrderTrackingUseCase {
  async execute(input: ICreateOrderTrackingInput): Promise<void> {
    console.log("Executando criação do rastreio para um novo pedido");

    await new TrackingRepository().saveOrderTracking({
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
    });
  }
}
