import "dart:convert";

import "package:dart_amqp/dart_amqp.dart";

void main(List<String> arguments) {
  ConnectionSettings settings = new ConnectionSettings(host: "localhost");

  Client client = new Client(settings: settings);

  String msg = arguments.isEmpty ? "Hello World!" : arguments[0];

  // Map<String, String> taxi = {
  //   "id": '1',
  //   "driverId": '1',
  //   "status": "accepted",
  // };

  // client
  //     .channel()
  //     .then((Channel channel) =>
  //         channel.exchange("tracing", ExchangeType.DIRECT, durable: false))
  //     .then((Exchange exchange) {
  //   exchange.publish(json.encode(taxi), "tracing");
  //   print(json.encode(taxi));
  //   return client.close();
  // });

  Map<String, String> taxi = {
    "id": '1',
    "clientId": '2',
    "status": "1",
    "destinationName":
        "Hẻm 135 Trần Hưng Ðạo, Cau Ong Lanh Ward, District 1, Hồ Chí Minh City, 71010, Vietnam",
    "pickupName":
        "Hẻm 53 Hồ Hảo Hớn, Cô Giang, Co Giang Ward, District 1, Hồ Chí Minh City, 70200, Vietnam",
  };
  client
      .channel()
      .then((Channel channel) => channel.exchange(
          "coordinating_car_booking", ExchangeType.FANOUT,
          durable: false))
      .then((Exchange exchange) {
    exchange.publish(json.encode(taxi), null);
    print("Sent ${json.encode(taxi)}");
    return client.close();
  });
}
