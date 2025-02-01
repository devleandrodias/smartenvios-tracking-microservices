import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { producer } from "../../src/shared/lib/kafka/kafka";
import { registry } from "../../src/shared/lib/kafka/schemaRegistry";
import { EKafkaTopics } from "../../src/shared/enuns/EKafkaTopics";
import { ticketSchema } from "../../src/shared/schemas/TicketSchema";
import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { IGenerateTicketInput } from "../../src/modules/ticket/useCases/generateTicket/generateTicket.dtos";
import { GenerateTicketUseCase } from "../../src/modules/ticket/useCases/generateTicket/generateTicket.useCase";

describe("[GenerateTicketUseCase]", () => {
  let generateTicketUseCase: GenerateTicketUseCase;
  let registerSpy: jest.SpyInstance;
  let encodeSpy: jest.SpyInstance;
  let producerSendSpy: jest.SpyInstance;
  let producerConnectSpy: jest.SpyInstance;
  let producerDisconnectSpy: jest.SpyInstance;

  beforeAll(() => {
    generateTicketUseCase = new GenerateTicketUseCase();
    registerSpy = jest.spyOn(registry, "register");
    encodeSpy = jest.spyOn(registry, "encode");
    producerSendSpy = jest.spyOn(producer, "send");
    producerConnectSpy = jest.spyOn(producer, "connect");
    producerDisconnectSpy = jest.spyOn(producer, "disconnect");
  });

  it("should generate a ticket", async () => {
    const registerId = "dceda484-e7af-409c-9cc8-ec2eeaa9510b";

    encodeSpy.mockResolvedValue("U21hcnRFbnZpb3MK");
    registerSpy.mockResolvedValue({ id: registerId });

    producerSendSpy.mockResolvedValue(null);
    producerConnectSpy.mockResolvedValue(null);
    producerDisconnectSpy.mockResolvedValue(null);

    const input: IGenerateTicketInput = {
      orderId: "3ec0a17c-e649-4a39-9e77-99a76de4d58b",
      shippingCompany: EShippingCompany.CARRIERS,
      trackingCode: "SM82886187440BM",
    };

    await generateTicketUseCase.execute(input);

    expect(registerSpy).toHaveBeenCalledWith({
      type: SchemaType.AVRO,
      schema: ticketSchema,
    });

    expect(encodeSpy).toHaveBeenCalledWith(registerId, {
      orderId: input.orderId,
      trackingCode: input.trackingCode,
      shippingCompany: input.shippingCompany,
    });

    expect(producerSendSpy).toHaveBeenCalledWith({
      topic: EKafkaTopics.TICKET_CREATED,
      messages: [
        {
          key: "ticket",
          value: "U21hcnRFbnZpb3MK",
        },
      ],
    });

    expect(encodeSpy).toHaveBeenCalledTimes(1);
    expect(registerSpy).toHaveBeenCalledTimes(1);
    expect(producerSendSpy).toHaveBeenCalledTimes(1);
    expect(producerConnectSpy).toHaveBeenCalledTimes(1);
    expect(producerDisconnectSpy).toHaveBeenCalledTimes(1);
  });
});
