import { GenerateTicketUseCase } from "../../src/modules/tracking/useCase/generateTicket/generateTicket.useCase";

describe("[GenerateTicketUseCase]", () => {
  let generateTicketUseCase: GenerateTicketUseCase;

  beforeAll(() => {
    generateTicketUseCase = new GenerateTicketUseCase();
  });

  it("should be defined", () => {
    expect(generateTicketUseCase).toBeDefined();
  });
});
