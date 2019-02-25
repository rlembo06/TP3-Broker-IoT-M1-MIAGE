module.exports = {
    broker: {
        url: "mqtt://broker.hivemq.com",
        urlMock: "mqtt://192.168.1.25",
    },
    topics: {
        temperatures: "m1/miage/iot/temperatures",
        brightnesses: "m1/miage/iot/brightnesses",
        notificationWeb: "m1/miage/iot/notificationWeb",
    }
}