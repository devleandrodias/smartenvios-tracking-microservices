import { registry } from "../../../../lib/kafka/schemaRegistry";
import { EKafkaTopics, kafka } from "../../../../lib/kafka/kafka";
import { UpdateTrackingEventUseCase } from "./updateTrackingEvent.useCase";

export class UpdateTrackingEventConsumer {
  async consume() {
    const consumer = kafka.consumer({ groupId: "carrier-group" });

    await consumer.connect();

    await consumer.subscribe({
      topic: EKafkaTopics.TRACKING_UPDATE,
    });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const decodedMessage = {
          ...message,
          value: await registry.decode(message.value as Buffer),
        };

        const { trackingCode, shippingCompany, events } = decodedMessage.value;

        await new UpdateTrackingEventUseCase().execute({
          events,
          trackingCode,
          shippingCompany,
        });
      },
    });
  }
}
