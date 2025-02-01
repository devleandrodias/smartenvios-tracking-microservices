import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { ESmartEnviosStatus } from "../../src/shared/enuns/ESmartEnviosStatus";
import { TrackingRepository } from "../../src/modules/tracking/infra/mongoose/repositories/tracking.repository";
import { IUpdateTrackingEventInput } from "../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.interfaces";
import { UpdateTrackingEventUseCase } from "../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

describe("[UpdateTrackingEventUseCase]", () => {
  let updateTrackingEventUseCase: UpdateTrackingEventUseCase;
  let addTrackingEventSpy: jest.SpyInstance;

  beforeAll(() => {
    updateTrackingEventUseCase = new UpdateTrackingEventUseCase();
    addTrackingEventSpy = jest.spyOn(
      TrackingRepository.prototype,
      "addTrackingEvent"
    );
  });

  it("should add a tracking event on tracking", async () => {
    addTrackingEventSpy.mockResolvedValueOnce(null);

    const input: IUpdateTrackingEventInput = {
      trackingCode: "SM82886187440BM",
      shippingCompany: EShippingCompany.CARRIERS,
      events: [
        {
          observation: "Coletado no CD",
          status: ESmartEnviosStatus.COLETADO,
          trackingId: "3d2bcadc-e706-47c0-aa64-92d356c5efee",
        },
      ],
    };

    await updateTrackingEventUseCase.execute(input);

    expect(addTrackingEventSpy).toHaveBeenCalledTimes(1);
    expect(addTrackingEventSpy).toHaveBeenCalledWith(
      input.trackingCode,
      input.events
    );
  });
});
