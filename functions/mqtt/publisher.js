const mqtt = require('mqtt');
const { broker: { url } } = require('../constants/mqtt');
const client  = mqtt.connect(url);

module.exports = {
    publish: (topic, message) => client.on('connect', () => {
        client.publish(topic, message);
        console.log('[MQTT MESSAGE]', 'topic: ', topic, 'message: ', message);
    }),
    
    publishTest: () => client.on('connect', () => {
        setInterval(() => {
            client.publish('tp3MIAGE', 'Hello mqtt');
            console.log('Message Sent');
        }, 5000);
    })
}