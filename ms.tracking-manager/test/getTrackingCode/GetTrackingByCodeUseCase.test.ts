import { ITracking } from "../../src/modules/tracking/entities/ITracking";
import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { TrackingRepository } from "../../src/modules/tracking/infra/mongoose/repositories/tracking.repository";
import { IGetTrackingByCodeInput } from "../../src/modules/tracking/useCase/getTrackingByCode/getTrackingByCode.dtos";
import { GetTrackingByCodeUseCase } from "../../src/modules/tracking/useCase/getTrackingByCode/getTrackingByCode.useCase";

describe("[GetTrackingByCodeUseCase]", () => {
  let getTrackingByCodeUseCase: GetTrackingByCodeUseCase;
  let getTrackingByCodeSpy: jest.SpyInstance;

  beforeAll(() => {
    getTrackingByCodeUseCase = new GetTrackingByCodeUseCase();
    getTrackingByCodeSpy = jest.spyOn(
      TrackingRepository.prototype,
      "getTrackingByCode"
    );
  });

  it("should return an error if tracking not found", async () => {
    getTrackingByCodeSpy.mockResolvedValueOnce(null);

    const input: IGetTrackingByCodeInput = {
      trackingCode: "SM82886187440BM",
    };

    const response = getTrackingByCodeUseCase.execute(input);

    expect(getTrackingByCodeSpy).toHaveBeenCalledTimes(1);
    expect(getTrackingByCodeSpy).toHaveBeenCalledWith(input.trackingCode);
    expect(response).rejects.toThrow(new Error("Tracking not found!"));
  });

  it("should return tracking", async () => {
    const input: IGetTrackingByCodeInput = {
      trackingCode: "SM82886187440BM",
    };

    const tracking: ITracking = {
      id: "9673e0bf-207f-41ee-bd2e-50412c3a3686",
      orderId: "59506fed-2ea3-40dd-9c1f-d2b7edeedda6",
      shippingCompany: EShippingCompany.CARRIERS,
      trackingCode: "SM82886187440BM",
      events: [],
    };

    getTrackingByCodeSpy.mockResolvedValueOnce(tracking);
    const response = await getTrackingByCodeUseCase.execute(input);

    expect(response).toEqual(tracking);
    expect(getTrackingByCodeSpy).toHaveBeenCalledTimes(1);
    expect(getTrackingByCodeSpy).toHaveBeenCalledWith(input.trackingCode);
  });
});
