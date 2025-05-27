import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'node-consumer',
    brokers: ['localhost:9092']
});


const topic = 'orgChangeTopic';
const consumer = kafka.consumer({groupId: 'node-group'});

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({topic, fromBeginning: true});

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic, partition,
                ofsset: message.offset,
                value: message.value?.toString(),
            })
        }
    });

    console.log(`Escuchando mensajes del topic ${topic}`);
};

run().catch(console.error);