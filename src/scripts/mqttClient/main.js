const mqtt = require("mqtt");

const [host, port, protocol, topic, msg] = process.argv.slice(2);
if (!host || !port || !protocol || !topic || !msg) {
  console.log(`参数格式 host port protocol topic msg`);
  process.exit(0);
}

const client = mqtt.connect(`${protocol}://${host}:${port}`);

client.on("connect", function () {
  console.log("Connected to MQTT server ✅");
  client.publish(topic, msg, () => {
    setTimeout(() => {
      console.log(`发送成功 ${topic} ${msg}`);
      process.exit(0);
    }, 800);
  });
});

client.on("message", (topic, data) => {
  console.log(topic, data.toString());
});
