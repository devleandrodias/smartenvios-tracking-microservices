import { consumer } from "./kafka";
import { registry } from "./schemaRegistry";
import { EKafkaTopics } from "../../shared/enuns/EKafkaTopics";
import { UpdateTrackingEventUseCase } from "../../modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

export class KafkaConsumer {
  async consume() {
    await consumer.connect();

    await consumer.subscribe({
      topics: [EKafkaTopics.TRACKING_UPDATE],
    });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const decodedMessage = {
          ...message,
          value: await registry.decode(message.value as Buffer),
        };

        switch (topic) {
          case EKafkaTopics.TRACKING_UPDATE:
            await new UpdateTrackingEventUseCase().execute({
              events: decodedMessage.value.decodedMessage,
              trackingCode: decodedMessage.value.trackingCode,
              shippingCompany: decodedMessage.value.shippingCompany,
            });
            break;
        }
      },
    });
  }
}
