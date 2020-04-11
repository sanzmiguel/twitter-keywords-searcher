const { Kafka } = require('kafkajs');

const logger = require('./logger');

let kafka;

async function connect () {
  logger.info('Creating kafka connection');
  kafka = new Kafka({
    clientId: 'twitter-keywords-searcher',
    brokers: ['localhost:9092']
  });
  await _createTopic();
}

async function _createTopic () {
  const admin = kafka.admin();
  const topicName = 'twitter-keywords';

  await admin.createTopics({
    topics: [{
      topic: topicName,
      numPartitions: 3,
      replicationFactor: 1
    }]
  });
  logger.info(`Created topic with the name ${topicName}`);
}

module.exports = {
  connect
};
