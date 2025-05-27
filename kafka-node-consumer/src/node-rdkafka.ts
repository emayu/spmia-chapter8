import  Kafka  from 'node-rdkafka';

const consumer = new Kafka.KafkaConsumer({
    "group.id": 'node-consumer',
    "metadata.broker.list": 'localhost:9092',
    "enable.auto.commit": true
}, {});


const topic = 'orgChangeTopic';
consumer.on('ready', () => {
    console.log('Conected to Kafka, subcribing to topic...');
    consumer.subscribe([topic]);
    consumer.consume();
}).on('data', (data) => {
    console.log(`Message received: ${data.value}`);
    console.log(`Topic: ${data.topic}, Partition: ${data.partition}, Offset: ${data.offset}`);

}).on('event.error', (err) => {
    console.error('Error on cosumer:', err);
});

consumer.connect();