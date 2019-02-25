const functions = require('firebase-functions');
const mqtt = require('mqtt');
const PubSub = require('./entities/PubSub');
const { 
    topics: { 
        temperatures, 
        brightnesses, 
    } 
} = require('./constants/mqtt');

exports.api = functions.https.onRequest((request, response) => {

    const options = {
      port: functions.config().mqtt.server.port,
      host: functions.config().mqtt.server.host,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      encoding: 'utf8'
    };
  
    const client = mqtt.connect(functions.config().mqtt.server.host, options);

    client.on('connect', () => {
      console.log('client connected');
    });
  
    client.on('error', (err) => {
      console.error(err);
    });

    PubSub = new PubSub(client);
    PubSub.subscribe(temperatures);
    PubSub.subscribe(brightnesses);
    PubSub.getMessages();
  
});