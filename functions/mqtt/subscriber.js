const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://192.168.1.25');
const { topics: { test: topicTest } } = require('../constants/mqtt')

module.exports = {
    subscribe: () => client.on('connect', () => {
        client.subscribe(topicTest)
    }),
    
    getMessages: () => client.on('message', (topic, message) => {
        context = message.toString();
        console.log(context)
    })
}