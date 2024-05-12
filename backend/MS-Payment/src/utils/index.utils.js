const amqplib = require("amqplib");
const {
  MSG_QUEUE_URL,
  EXCHANGE_NAME,
  PAYMENT_ROUTING_KEY,
} = require("../config/index.config");

//? Create a channel
const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect();
    const channel = await connection.createChannel(MSG_QUEUE_URL);
    await channel.assertExchange(EXCHANGE_NAME, "direct", {
      durable: true,
    });
    console.log("Channel created");
    return channel;
  } catch (err) {
    console.log("Error createing channel: ", err);
  }
};

//? Publish message to queue
const PublishMessage = (channel, routingKey, msg) => {
  channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(msg));
  console.log(`${msg} sent: ${routingKey} service`);
};

////////////////////////////////////////////////////////////////////////////////

//? Consume message from queue
const SubscribeMessages = async (channel, service) => {
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

  //!Create queue
  const q = await channel.assertQueue("PaymentQueue");

  //!Bind Queue
  // This consumer will concume messages from Notification Only
  channel.bindQueue(q.queue, EXCHANGE_NAME, PAYMENT_ROUTING_KEY);

  //!consume messages from queue
  channel.consume(q.queue, (msg) => {
    if (msg.content) {
      service.SubscribeEvents(msg.content.toString());
    }
    channel.ack(msg);
  });
};

module.exports = {
  CreateChannel,
  PublishMessage,
  SubscribeMessages,
};
