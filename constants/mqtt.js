module.exports = {
    broker: {
        url: "mqtt://broker.hivemq.com",
        port: 1883,
    },
    topics: {
        temperatures: "m1/miage/iot/temperatures",
        brightnesses: "m1/miage/iot/brightnesses",
        notificationWeb: "m1/miage/iot/notificationWeb",
    }
}