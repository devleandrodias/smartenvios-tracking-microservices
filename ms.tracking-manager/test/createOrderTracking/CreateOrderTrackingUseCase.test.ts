import "reflect-metadata";

import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { ITrackingRepository } from "../../src/modules/tracking/repositories/ITrackingRepository";
import { TrackingRepositoryInMemory } from "../../src/modules/tracking/infra/inMemory/repositories/tracking.repository";
import { CreateOrderTrackingUseCase } from "../../src/modules/tracking/useCase/createOrderTracking/createOrderTracking.useCase";
import { ICreateOrderTrackingInput } from "../../src/modules/tracking/useCase/createOrderTracking/createOrderTracking.interfaces";

describe("[CreateOrderTrackingUseCase]", () => {
  let trackingRepository: ITrackingRepository;
  let createOrderTrackingUseCase: CreateOrderTrackingUseCase;

  let saveOrderTrackingSpy: jest.SpyInstance;

  beforeAll(() => {
    trackingRepository = new TrackingRepositoryInMemory();

    createOrderTrackingUseCase = new CreateOrderTrackingUseCase(
      trackingRepository
    );

    saveOrderTrackingSpy = jest.spyOn(
      TrackingRepositoryInMemory.prototype,
      "saveOrderTracking"
    );
  });

  it("should save a order tracking", async () => {
    saveOrderTrackingSpy.mockResolvedValueOnce(null);

    const input: ICreateOrderTrackingInput = {
      orderId: "ac9906a8-1913-4486-a45d-af92614e72e4",
      carrier: EShippingCompany.CARRIERS,
      trackingCode: "SM82886187440BM",
    };

    await createOrderTrackingUseCase.execute(input);

    expect(saveOrderTrackingSpy).toHaveBeenCalledWith({
      orderId: input.orderId,
      carrier: input.carrier,
      trackingCode: input.trackingCode,
    });
  });
});
