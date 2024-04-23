// step 1 : connect to rabbitmq server
// step 1 : create a new channel on that connection
// step 1 : connect the exchange
// step 1 : Publish the message to the exchange with routing key

const amqp = require("amqplib");
const config = require("./config");

class Producer {
  channel;

  async createChanael() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }
  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChanael();
    }

    //Step 3
    await this.channel.assertExchange(config.rabbitMQ.exchange, "direct");

    //Step 4
    // Here we are publishing a message to this message exchange with a routing key
    await this.channel.publish(
      config.rabbitMQ.exchange,
      routingKey,
      Buffer.from(
        JSON.stringify({
          logType: routingKey,
          message: message,
          dateTime: new Date(),
        })
      )
    );

    console.log(
      `The message ${message} is sent to exchange ${config.rabbitMQ.exchange}`
    );
  }
}

module.exports = Producer;
