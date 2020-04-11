const { Kafka } = require('kafkajs');

const logger = require('./logger');

let kafka;

async function connect () {
  logger.info('Creating kafka connection');
  kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_HOST]
  });
  await _createTopic();
}

async function _createTopic () {
  const admin = kafka.admin();
  const topicName = process.env.KAFKA_TOPIC_NAME;

  await admin.createTopics({
    topics: [{
      topic: topicName,
      numPartitions: process.env.KAFKA_NUM_PARTITIONS,
      replicationFactor: process.env.KAFKA_REPLICATION_FACTOR
    }]
  });
  logger.info(`Created topic with the name ${topicName}`);
}

async function sendToTopic (message, key) {
  const producer = kafka.producer();
  await producer.connect();

  try {
    await producer.send({
      topic: process.env.KAFKA_TOPIC_NAME,
      messages: [{ key, value: JSON.stringify(message) }]
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connect,
  sendToTopic
};
