import "reflect-metadata";

import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { ESmartEnviosStatus } from "../../src/shared/enuns/ESmartEnviosStatus";
import { ITrackingRepository } from "../../src/modules/tracking/repositories/ITrackingRepository";
import { TrackingRepositoryInMemory } from "../../src/modules/tracking/infra/inMemory/repositories/tracking.repository";
import { IUpdateTrackingEventInput } from "../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.interfaces";
import { UpdateTrackingEventUseCase } from "../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

describe("[UpdateTrackingEventUseCase]", () => {
  let trackingRepository: ITrackingRepository;
  let updateTrackingEventUseCase: UpdateTrackingEventUseCase;
  let addTrackingEventSpy: jest.SpyInstance;

  beforeAll(() => {
    trackingRepository = new TrackingRepositoryInMemory();

    updateTrackingEventUseCase = new UpdateTrackingEventUseCase(
      trackingRepository
    );

    addTrackingEventSpy = jest.spyOn(
      TrackingRepositoryInMemory.prototype,
      "addTrackingEvent"
    );
  });

  it("should add a tracking event on tracking", async () => {
    addTrackingEventSpy.mockResolvedValueOnce(null);

    const input: IUpdateTrackingEventInput = {
      trackingCode: "SM82886187440BM",
      carrier: EShippingCompany.CARRIERS,
      events: [
        {
          location: "São Paulo",
          status: ESmartEnviosStatus.COLETADO,
          timestamp: new Date().toISOString(),
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
