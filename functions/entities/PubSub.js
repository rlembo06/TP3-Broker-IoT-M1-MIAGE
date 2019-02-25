const { 
    topics: { temperatures, brightnesses, notificationWeb } 
} = require('../constants/mqtt');
const { addTemperature } = require('../models/temperatures.model');
const { addBrightness } = require('../models/brightnesses.model');

module.exports = client => {

    subscribe: topic => client.on('connect', () => {
        client.subscribe(topic)
    });

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
    });
    
}