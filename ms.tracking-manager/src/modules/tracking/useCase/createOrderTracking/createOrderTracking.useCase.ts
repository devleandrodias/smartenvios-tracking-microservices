import { inject, injectable } from "tsyringe";

import { ICreateOrderTrackingInput } from "./createOrderTracking.interfaces";
import { ITrackingRepository } from "../../repositories/ITrackingRepository";

@injectable()
export class CreateOrderTrackingUseCase {
  constructor(
    @inject("TrackingRepository") private repository: ITrackingRepository
  ) {}

  async execute(input: ICreateOrderTrackingInput): Promise<void> {
    console.log(
      `[${input.trackingCode}] - Executando criação do rastreio para um novo pedido`
    );

    await this.repository.saveOrderTracking({
      orderId: input.orderId,
      carrier: input.carrier,
      trackingCode: input.trackingCode,
    });
  }
}
