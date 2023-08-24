const ampq = require("amqplib");
// producer code
connect();
async function connect() {
  try {
    const connection = await ampq.connect("amqp://127.0.0.1:5672"); //connect to rabbitmq server
    const channel = await connection.createChannel(); //create channel
    const queue = "message"; //queue name
    await channel.purgeQueue(queue); //purge queue if exists to avoid duplicate messages
    await channel.assertQueue(queue, { durable: true }); //assert queue to make sure it exists
    const msg = { id: 1, name: "Hello World" }; //message to be sent
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg))); //send message to queue
    console.log("Message sent", msg); //log message sent
    setTimeout(() => {
      connection.close(); //close connection
      process.exit(0); //exit process
    }, 500);
  } catch (err) {
    console.log(err);
  }
}
