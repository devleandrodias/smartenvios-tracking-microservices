import { UpdateTrackingEventUseCase } from "../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

describe("[UpdateTrackingEventUseCase]", () => {
  let updateTrackingEventUseCase: UpdateTrackingEventUseCase;

  beforeAll(() => {
    updateTrackingEventUseCase = new UpdateTrackingEventUseCase();
  });

  it("should be defined", () => {
    expect(updateTrackingEventUseCase).toBeDefined();
  });
});
