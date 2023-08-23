import { kafka } from "../../../../lib/kafka";
import { UpdateTrackingMessage } from "../../../../types/UpdateTrackingMessage";

export class UpdateTrackingEventProducer {
  async produce(message: UpdateTrackingMessage) {
    const producer = kafka.producer();

    await producer.connect();

    await producer.send({
      topic: "test-topic",
      messages: [{ value: "Hello KafkaJS user!" }],
    });

    await producer.disconnect();
  }
}
