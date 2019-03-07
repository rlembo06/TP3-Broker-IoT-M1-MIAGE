const mqtt = require("mqtt");
const express = require("express");
const http = require("http");
const {
  broker: { url },
  topics: { temperatures, brightnesses, notificationWeb }
} = require("./constants/mqtt");
const { addTemperature } = require("./models/temperatures.model");
const { addBrightness } = require("./models/brightnesses.model");

const app = express();
const port = process.env.PORT || 8080;
const server = http.Server(app);

const mqttApi = () => {
  const client = mqtt.connect(url);

  client.on("connect", () => {
    client.subscribe(temperatures);
    client.subscribe(brightnesses);
    console.log("client connected");
  });

  client.on("error", err => {
    console.error(err);
  });

  client.on("message", async (topic, message) => {
    data = message.toString();
    if (!!data) {
      if (topic === temperatures) {
        await addTemperature(JSON.parse(data));
      }
      if (topic === brightnesses) {
        await addBrightness(JSON.parse(data));
      }
      await client.publish(notificationWeb, topic);
    }
  });
};

mqttApi();

server.listen(port, () => {
  console.log(`Listening on port:${port}/`);
});

setInterval(() => {
  console.log("Don't stop Dynos Heroku");
}, 30000);
