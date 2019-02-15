const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://192.168.1.25');
const { topics: { test: topicTest } } = require('../constants/mqtt')

module.exports = {
    publish: message => client.on('connect', () => {
        client.publish(topicTest, message);
        console.log('[MQTT MESSAGE]', 'topic: ', topic, 'message: ', message);
    }),
    
    publishTest: () => client.on('connect', () => {
        setInterval(() => {
            client.publish('tp3MIAGE', 'Hello mqtt');
            console.log('Message Sent');
        }, 5000);
    })
}