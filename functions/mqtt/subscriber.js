const mqtt = require('mqtt')
const { broker: { url } } = require('../constants/mqtt');
const client  = mqtt.connect(url);

module.exports = {
    subscribe: topic => client.on('connect', () => {
        client.subscribe(topic)
    }),
    
    getMessages: () => client.on('message', (topic, message) => {
        context = message.toString();
        console.log(context)
    })
}