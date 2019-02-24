const mqtt = require('mqtt')
const { 
    broker: { url }, 
    topics: { temperatures, brightnesses } 
} = require('../constants/mqtt');
const client  = mqtt.connect(url);
const { addTemperature } = require('../models/temperatures.model')

module.exports = {
    subscribe: topic => client.on('connect', () => {
        client.subscribe(topic)
    }),
    
    /* getMessages: () => client.on('message', (topic, message) => {
        context = message.toString();
        console.log(context)
    }) */

    getMessages: () => client.on('message', (topic, message) => {
        data = message.toString();
        if(!!data & topic === temperatures) {
            addTemperature(JSON.parse(data));
        }
        console.log('TOPIC : ',topic, 'data: ', data)
    })
}