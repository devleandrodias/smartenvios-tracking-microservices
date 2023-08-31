import { CreateOrderTrackingUseCase } from "../../src/modules/tracking/useCase/createOrderTracking/createOrderTracking.useCase";

describe("[CreateOrderTrackingUseCase]", () => {
  let createOrderTrackingUseCase: CreateOrderTrackingUseCase;

  beforeAll(() => {
    createOrderTrackingUseCase = new CreateOrderTrackingUseCase();
  });

  it("should be defined", () => {
    expect(createOrderTrackingUseCase).toBeDefined();
  });
});
