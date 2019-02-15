const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://192.168.1.25');

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