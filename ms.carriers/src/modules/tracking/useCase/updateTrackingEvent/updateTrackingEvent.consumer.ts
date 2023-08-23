import { kafka } from "../../../../lib/kafka";

export class UpdateTrackingEventConsumer {
  async consume() {
    const consumer = kafka.consumer({ groupId: "carrier-group" });

    await consumer.connect();

    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message?.value?.toString(),
        });
      },
    });
  }
}
