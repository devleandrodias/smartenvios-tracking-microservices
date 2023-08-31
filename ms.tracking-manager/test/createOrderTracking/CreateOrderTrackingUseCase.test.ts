import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { TrackingRepository } from "../../src/modules/tracking/infra/typeorm/repositories/tracking.repository";
import { CreateOrderTrackingUseCase } from "../../src/modules/tracking/useCase/createOrderTracking/createOrderTracking.useCase";
import { ICreateOrderTrackingInput } from "../../src/modules/tracking/useCase/createOrderTracking/createOrderTracking.interfaces";

describe("[CreateOrderTrackingUseCase]", () => {
  let createOrderTrackingUseCase: CreateOrderTrackingUseCase;

  let saveOrderTrackingSpy: jest.SpyInstance;

  beforeAll(() => {
    createOrderTrackingUseCase = new CreateOrderTrackingUseCase();

    saveOrderTrackingSpy = jest.spyOn(
      TrackingRepository.prototype,
      "saveOrderTracking"
    );
  });

  it("should save a order tracking", async () => {
    saveOrderTrackingSpy.mockResolvedValueOnce(null);

    const input: ICreateOrderTrackingInput = {
      orderId: "ac9906a8-1913-4486-a45d-af92614e72e4",
      shippingCompany: EShippingCompany.CARRIERS,
      trackingCode: "SM82886187440BM",
    };

    await createOrderTrackingUseCase.execute(input);

    expect(saveOrderTrackingSpy).toHaveBeenCalledWith({
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
    });
  });
});
