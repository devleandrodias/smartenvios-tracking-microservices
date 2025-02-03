import "reflect-metadata";

import { SchemaType } from "@kafkajs/confluent-schema-registry";

import { producer } from "../../src/shared/lib/kafka/kafka";
import { EKafkaTopics } from "../../src/shared/enuns/EKafkaTopics";
import { registry } from "../../src/shared/lib/kafka/schemaRegistry";
import { trackingSchema } from "../../src/shared/schemas/TrackingSchema";
import { ITracking } from "../../src/modules/tracking/entities/ITracking";
import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { ESmartEnviosStatus } from "../../src/shared/enuns/ESmartEnviosStatus";
import { ITrackingRepository } from "../../src/modules/tracking/repositories/ITrackingRepository";
import { TrackingRepositoryInMemory } from "../../src/modules/tracking/infra/inMemory/repositories/tracking.repository";
import { ScheduleUpdateTrackingsUseCase } from "../../src/modules/tracking/useCase/scheduleUpdateTrackings/scheduleUpdateTrackings.useCase";

describe("[ScheduleUpdateTrackingsUseCase]", () => {
  let trackingRepository: ITrackingRepository;
  let scheduleUpdateTrackingsUseCase: ScheduleUpdateTrackingsUseCase;

  let registerSpy: jest.SpyInstance;
  let encodeSpy: jest.SpyInstance;
  let producerSendSpy: jest.SpyInstance;
  let producerConnectSpy: jest.SpyInstance;
  let producerDisconnectSpy: jest.SpyInstance;
  let getTrackingNeedUpdateSpy: jest.SpyInstance;

  beforeAll(() => {
    trackingRepository = new TrackingRepositoryInMemory();

    scheduleUpdateTrackingsUseCase = new ScheduleUpdateTrackingsUseCase(
      trackingRepository
    );

    registerSpy = jest.spyOn(registry, "register");
    encodeSpy = jest.spyOn(registry, "encode");
    producerSendSpy = jest.spyOn(producer, "send");
    producerConnectSpy = jest.spyOn(producer, "connect");
    producerDisconnectSpy = jest.spyOn(producer, "disconnect");
    getTrackingNeedUpdateSpy = jest.spyOn(
      TrackingRepositoryInMemory.prototype,
      "getTrackingNeedUpdate"
    );
  });

  it("should schedule cron to update order tracking", async () => {
    const registerId = "dceda484-e7af-409c-9cc8-ec2eeaa9510b";

    encodeSpy.mockResolvedValue("U21hcnRFbnZpb3MK");
    registerSpy.mockResolvedValue({ id: registerId });

    producerSendSpy.mockResolvedValue(null);
    producerConnectSpy.mockResolvedValue(null);
    producerDisconnectSpy.mockResolvedValue(null);

    const trackingNeedUpdate: ITracking = {
      orderId: "59506fed-2ea3-40dd-9c1f-d2b7edeedda6",
      carrier: EShippingCompany.CARRIERS,
      trackingCode: "SM82886187440BM",
      events: [
        {
          location: "São Paulo",
          status: ESmartEnviosStatus.COLETADO,
          timestamp: "2025-01-01",
        },
      ],
    } as ITracking;

    getTrackingNeedUpdateSpy.mockResolvedValue([trackingNeedUpdate]);

    await scheduleUpdateTrackingsUseCase.execute();

    expect(registerSpy).toHaveBeenCalledWith({
      type: SchemaType.AVRO,
      schema: trackingSchema,
    });

    expect(encodeSpy).toHaveBeenCalledWith(registerId, {
      orderId: trackingNeedUpdate.orderId,
      carrier: trackingNeedUpdate.carrier,
      trackingCode: trackingNeedUpdate.trackingCode,
      events: [
        {
          location: "São Paulo",
          status: ESmartEnviosStatus.COLETADO,
          timestamp: "2025-01-01",
        },
      ],
    });

    expect(producerSendSpy).toHaveBeenCalledWith({
      topic: EKafkaTopics.TRACKING_UPDATE,
      messages: [
        {
          key: "tracking",
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
