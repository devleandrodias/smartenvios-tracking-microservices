import { registry } from "../../../../lib/schemaRegistry";
import { EKafkaTopics, consumer, kafka } from "../../../../lib/kafka";

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

        console.log("DECODED", decodedMessage.value);
      },
    });
  }
}
