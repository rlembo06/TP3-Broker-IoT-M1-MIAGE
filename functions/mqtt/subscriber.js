const mqtt = require('mqtt')
const { 
    broker: { url }, 
    topics: { temperatures, brightnesses, notificationWeb } 
} = require('../constants/mqtt');
const client  = mqtt.connect(url);
const { addTemperature } = require('../models/temperatures.model');
const { addBrightness } = require('../models/brightnesses.model');
const { publish } = require('./publisher');

module.exports = {
    subscribe: topic => client.on('connect', () => {
        client.subscribe(topic)
    }),

    getMessages: () => client.on('message', async (topic, message) => {
        data = message.toString();
        if(!!data) {
            if(topic === temperatures) {
                await addTemperature(JSON.parse(data));
            }
            if(topic === brightnesses) {
                await addBrightness(JSON.parse(data));
            }
            await client.publish(notificationWeb, topic);
        }
        console.log('TOPIC : ', topic, 'data: ', data)
    })
}