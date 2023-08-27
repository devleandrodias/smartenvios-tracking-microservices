import { registry } from "../../../../lib/kafka/schemaRegistry";
import { EKafkaTopics, consumer, kafka } from "../../../../lib/kafka/kafka";
import { CreateOrderTrackingUseCase } from "./createOrderTracking.useCase";

export class CreateOrderTrackingConsumer {
  async consume() {
    await consumer.connect();

    await consumer.subscribe({
      topic: EKafkaTopics.TICKET_CREATED,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
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
      },
    });
  }
}
