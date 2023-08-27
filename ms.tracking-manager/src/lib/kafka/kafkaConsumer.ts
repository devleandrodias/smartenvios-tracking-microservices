import { registry } from "./schemaRegistry";
import { EKafkaTopics, consumer, kafka } from "./kafka";
import { CreateOrderTrackingUseCase } from "../../modules/tracking/useCase/createOrderTracking/createOrderTracking.useCase";
import { EachMessagePayload } from "kafkajs";

async function createTricket({ message }: EachMessagePayload) {
  const decodedMessage = {
    ...message,
    value: await registry.decode(message.value as Buffer),
  };

  const { orderId, shippingCompany, trackingCode } = decodedMessage.value;

  console.log({ orderId, shippingCompany, trackingCode });

  await new CreateOrderTrackingUseCase().execute({
    orderId,
    trackingCode,
    shippingCompany,
  });
}

async function updateTrackingEvent({ message }: EachMessagePayload) {
  const decodedMessage = {
    ...message,
    value: await registry.decode(message.value as Buffer),
  };

  console.log("VALORES RECEBIDOS PELA TRANSPORTADORA", decodedMessage.value);
}

export class KafkaConsumer {
  async consume() {
    await consumer.connect();

    await consumer.subscribe({
      topics: [EKafkaTopics.TICKET_CREATED, EKafkaTopics.TRACKING_EVENT],
    });

    await consumer.run({
      eachMessage: async (payload) => {
        switch (payload.topic) {
          case EKafkaTopics.TICKET_CREATED:
            createTricket(payload);
            break;
          case EKafkaTopics.TRACKING_EVENT:
            updateTrackingEvent(payload);
            break;
        }
      },
    });
  }
}
