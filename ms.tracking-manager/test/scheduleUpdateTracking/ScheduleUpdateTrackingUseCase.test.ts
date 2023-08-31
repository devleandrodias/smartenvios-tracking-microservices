import { ScheduleUpdateTrackingsUseCase } from "../../src/modules/tracking/useCase/scheduleUpdateTrackings/scheduleUpdateTrackings.useCase";

describe("[ScheduleUpdateTrackingsUseCase]", () => {
  let scheduleUpdateTrackingsUseCase: ScheduleUpdateTrackingsUseCase;

  beforeAll(() => {
    scheduleUpdateTrackingsUseCase = new ScheduleUpdateTrackingsUseCase();
  });

  it("should be defined", () => {
    expect(scheduleUpdateTrackingsUseCase).toBeDefined();
  });
});
