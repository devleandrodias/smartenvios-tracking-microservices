import { SchemaType } from "@kafkajs/confluent-schema-registry";
import { producer } from "../../src/shared/lib/kafka/kafka";
import { registry } from "../../src/shared/lib/kafka/schemaRegistry";
import { TrackingRepository } from "../../src/modules/tracking/infra/mongoose/repositories/tracking.repository";
import { ScheduleUpdateTrackingsUseCase } from "../../src/modules/tracking/useCase/scheduleUpdateTrackings/scheduleUpdateTrackings.useCase";
import { trackingSchema } from "../../src/shared/schemas/TrackingSchema";
import { EKafkaTopics } from "../../src/shared/enuns/EKafkaTopics";
import { ITracking } from "../../src/modules/tracking/entities/ITracking";
import { EShippingCompany } from "../../src/shared/enuns/EShippingCompany";
import { ESmartEnviosStatus } from "../../src/shared/enuns/ESmartEnviosStatus";

describe("[ScheduleUpdateTrackingsUseCase]", () => {
  let scheduleUpdateTrackingsUseCase: ScheduleUpdateTrackingsUseCase;

  let registerSpy: jest.SpyInstance;
  let encodeSpy: jest.SpyInstance;
  let producerSendSpy: jest.SpyInstance;
  let producerConnectSpy: jest.SpyInstance;
  let producerDisconnectSpy: jest.SpyInstance;
  let getTrackingNeedUpdateSpy: jest.SpyInstance;

  beforeAll(() => {
    scheduleUpdateTrackingsUseCase = new ScheduleUpdateTrackingsUseCase();
    registerSpy = jest.spyOn(registry, "register");
    encodeSpy = jest.spyOn(registry, "encode");
    producerSendSpy = jest.spyOn(producer, "send");
    producerConnectSpy = jest.spyOn(producer, "connect");
    producerDisconnectSpy = jest.spyOn(producer, "disconnect");
    getTrackingNeedUpdateSpy = jest.spyOn(
      TrackingRepository.prototype,
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
      id: "9673e0bf-207f-41ee-bd2e-50412c3a3686",
      orderId: "59506fed-2ea3-40dd-9c1f-d2b7edeedda6",
      shippingCompany: EShippingCompany.CARRIERS,
      trackingCode: "SM82886187440BM",
      events: [
        {
          observation: "Coletado no CD",
          status: ESmartEnviosStatus.COLETADO,
          trackingId: "5af62b47-6369-42e2-b80e-deaedb8dedc0",
        },
      ],
    };

    getTrackingNeedUpdateSpy.mockResolvedValue([trackingNeedUpdate]);

    await scheduleUpdateTrackingsUseCase.execute();

    expect(registerSpy).toHaveBeenCalledWith({
      type: SchemaType.AVRO,
      schema: trackingSchema,
    });

    expect(encodeSpy).toHaveBeenCalledWith(registerId, {
      trackingCode: trackingNeedUpdate.trackingCode,
      shippingCompany: trackingNeedUpdate.shippingCompany,
      events: [
        {
          observation: "Coletado no CD",
          status: ESmartEnviosStatus.COLETADO,
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
