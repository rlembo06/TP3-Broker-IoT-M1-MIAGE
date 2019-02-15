const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://192.168.1.25');

/* module.exports = client.on('connect', () => {
    setInterval(() => {
        client.publish('myTopic', 'Hello mqtt');
        console.log('Message Sent');
    }, 5000);
}); */

module.exports = {
    publish: (topic, message) => client.on('connect', () => {
        setInterval(() => {
            client.publish(topic, message);
        }, 5000);
    }),
    
    publishTest: () => client.on('connect', () => {
        setInterval(() => {
            client.publish('testTopic', 'Hello mqtt');
            console.log('Message Sent');
        }, 5000);
    })
}