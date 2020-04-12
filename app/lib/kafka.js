const { Kafka, CompressionTypes } = require('kafkajs');

const logger = require('./logger');
const { tweetsConsumer } = require('../consumers');
const AppError = require('./app-error');
const { errors: errorsList } = require('../config');

let kafka;

async function connect () {
  logger.info('Creating kafka connection');
  kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_HOST]
  });
  await _createTopic();
  await _createConsumer();
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

async function _createConsumer () {
  const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });
  await consumer.connect();

  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC_NAME });

  await consumer.run({
    eachMessage: tweetsConsumer
  });

  process.on('SIGTERM', async () => {
    await consumer.disconnect();
  });
}

async function sendToTopic (messages) {
  try {
    const producer = kafka.producer();
    await producer.connect();

    await producer.send({
      topic: process.env.KAFKA_TOPIC_NAME,
      messages,
      compression: CompressionTypes.GZIP
    });
  } catch (error) {
    const { message, code, status } = errorsList.INTERNAL_SERVER_ERROR;
    throw new AppError(message, code, status, { error });
  }
}

module.exports = {
  connect,
  sendToTopic
};
