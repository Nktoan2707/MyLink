import 'dart:async';
import 'package:dart_amqp/dart_amqp.dart';
import 'package:my_link_mobile_driver/models/domain/taxi_dispatch.dart';

class TaxiDispatchService {
  final _tripRequestController = StreamController<TaxiDispatch>();
  Client? _client;
  Channel? _listeningToTripRequestChannel;
  Channel? _publishingDriverInfoChannel;

  TaxiDispatchService() {
    openConnection();
  }

  void openConnection() async {
    _client = Client(
      settings: ConnectionSettings(
        host: "10.0.2.2",
        port: 5672,
      ),
    );
    // print("rabbitmq connected!");
  }

  void closeConnection() {
    _client?.close();
    _client = null;
  }

  Future<void> openListeningToTripRequestChannel() async {
    _listeningToTripRequestChannel = await _client!.channel();
    _listeningToTripRequestChannel!
        .exchange("coordinating_car_booking", ExchangeType.FANOUT,
            durable: false)
        .then(
      (Exchange exchange) {
        return exchange.bindPrivateQueueConsumer(null).then(
          (Consumer consumer) {
            consumer.listen((AmqpMessage event) {
              print("Received ${event.payloadAsJson}");
              _tripRequestController
                  .add(TaxiDispatch.fromJson(event.payloadAsString));
            });
          },
        );
      },
    );
  }

  void closeListeningToTripRequestChannel() {
    _listeningToTripRequestChannel?.close();
    _listeningToTripRequestChannel = null;
  }

  Future<void> openPublishingDriverInfoChannel() async {
    _publishingDriverInfoChannel = await _client!.channel();
  }

  void closePublishingDriverInfoChannel() {
    _publishingDriverInfoChannel?.close();
    _publishingDriverInfoChannel = null;
  }

  void publishDriverInfo(TaxiDispatch taxiDispatch) {
    _publishingDriverInfoChannel!
        .exchange("tracing", ExchangeType.DIRECT, durable: false)
        .then((Exchange exchange) {
      exchange.publish({
        "id": taxiDispatch.id.toString(),
        "driverId": taxiDispatch.driverId,
        "longitude": "10.12",
        "latitude": "10.12",
      }, "tracing");
    });
  }

  Stream<TaxiDispatch> get tripRequestStream async* {
    yield* _tripRequestController.stream;
  }

  void dispose() {
    _tripRequestController.close();
    closeConnection();
  }
}
