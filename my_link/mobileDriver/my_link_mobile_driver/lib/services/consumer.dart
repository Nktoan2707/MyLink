import "dart:convert";

import "package:dart_amqp/dart_amqp.dart";

void main(List<String> arguments) {
  ConnectionSettings settings = new ConnectionSettings(host: "localhost");

  Client client = new Client(settings: settings);

  client.channel().then((Channel channel) =>
      channel.exchange("tracing", ExchangeType.DIRECT, durable: false).then(
        (Exchange exchange) {
          return exchange.bindQueueConsumer("taxi_dispatch_tracing", ["tracing"]).then(
            (Consumer consumer) {
              consumer.listen((AmqpMessage event) {
                print("Received ${event.payloadAsJson}");
              });
            },
          );
        },
      ));
}
