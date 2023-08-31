import { UpdateTrackingEventProducer } from "../../../src/modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.producer";

describe("[UpdateTrackingEventProducer]", () => {
  let updateTrackingEventProducer: UpdateTrackingEventProducer;

  beforeAll(() => {
    updateTrackingEventProducer = new UpdateTrackingEventProducer();
  });

  it("should be defined", () => {
    expect(updateTrackingEventProducer).toBeDefined();
  });
});
