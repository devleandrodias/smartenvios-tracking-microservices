import { GetTrackingByCodeUseCase } from "../../src/modules/tracking/useCase/getTrackingByCode/getTrackingByCode.useCase";

describe("[GetTrackingByCodeUseCase]", () => {
  let getTrackingByCodeUseCase: GetTrackingByCodeUseCase;

  beforeAll(() => {
    getTrackingByCodeUseCase = new GetTrackingByCodeUseCase();
  });

  it("should be defined", () => {
    expect(getTrackingByCodeUseCase).toBeDefined();
  });
});
