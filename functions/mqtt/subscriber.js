const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://192.168.1.25');
const { topic } = require('../constants/mqtt')

module.exports = {
    subscribe: () => client.on('connect', () => {
        client.subscribe(topic)
    }),
    
    getMessages: () => client.on('message', (topic, message) => {
        context = message.toString();
        console.log(context)
    })
}