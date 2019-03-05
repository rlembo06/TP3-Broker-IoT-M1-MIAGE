const functions = require('firebase-functions');
const mqtt = require('mqtt');
const { 
    broker: { url },
    topics: { 
        temperatures, 
        brightnesses, 
        notificationWeb,
    } 
} = require('./constants/mqtt');
const { addTemperature } = require('./models/temperatures.model');
const { addBrightness } = require('./models/brightnesses.model');

exports.api = functions.https.onRequest((request, response) => {
    
    const client = mqtt.connect(url);

    client.on('connect', () => {
        client.subscribe(temperatures);
        client.subscribe(brightnesses);
        console.log('client connected');
    });
  
    client.on('error', (err) => {
      console.error(err);
    });

    client.on('message', async (topic, message) => {
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
        response.send("[Success] - topic: " + topic + " - data: " + data);
        client.end();
    });
  
});