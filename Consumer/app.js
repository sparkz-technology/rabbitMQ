const amqp = require("amqplib");
// consumer code
connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1:5672"); //connect to rabbitmq server
    const channel = await connection.createChannel(); //create channel
    const queue = "message"; //queue name
    await channel.assertQueue(queue, { durable: false }); //assert queue to make sure it exists
    channel.consume(queue, (message) => {
      //consume message from queue and log it
      const input = JSON.parse(message.content.toString());
      console.log(`Received message: ${input.name}`);
      channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
}
