import { consumer } from "./kafka";
import { registry } from "./schemaRegistry";
import { EKafkaTopics } from "../../shared/enuns/EKafkaTopics";
import { CreateOrderTrackingUseCase } from "../../modules/tracking/useCase/createOrderTracking/createOrderTracking.useCase";
import { UpdateTrackingEventUseCase } from "../../modules/tracking/useCase/updateTrackingEvent/updateTrackingEvent.useCase";

export class KafkaConsumer {
  async consume() {
    await consumer.connect();

    await consumer.subscribe({
      topics: [EKafkaTopics.TICKET_CREATED, EKafkaTopics.TRACKING_EVENT],
    });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const decodedMessage = {
          ...message,
          value: await registry.decode(message.value as Buffer),
        };

        switch (topic) {
          case EKafkaTopics.TICKET_CREATED:
            await new CreateOrderTrackingUseCase().execute({
              orderId: decodedMessage.value.orderId,
              trackingCode: decodedMessage.value.trackingCode,
              shippingCompany: decodedMessage.value.shippingCompany,
            });
            break;
          case EKafkaTopics.TRACKING_EVENT:
            await new UpdateTrackingEventUseCase().execute({
              trackingCode: decodedMessage.value.trackingCode,
            });
            break;
        }
      },
    });
  }
}
