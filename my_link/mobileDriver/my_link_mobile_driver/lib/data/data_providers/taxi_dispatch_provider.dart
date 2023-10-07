import 'package:http/http.dart' as http;
import 'package:my_link_mobile_driver/models/domain/taxi_dispatch.dart';

class TaxiDispatchProvider {
  // Future<TaxiDispatch> getClient() async {
  //   final uri = Uri.parse("https://jsonplaceholder.typicode.com/users/1");
  //   final response = await http.get(uri);
  //
  //   if (response.statusCode == 200) {
  //     return TaxiDispatch.fromJson(response.body);
  //   } else {
  //     throw Exception("Failed to get client");
  //   }
  // }
  //
  // Future<TaxiDispatch> postTrip() async {
  //   TaxiDispatch client = new TaxiDispatch(id: "1");
  //   String request = client.toJson();
  //
  //   final uri = Uri.parse("https://jsonplaceholder.typicode.com/users/1");
  //   final response = await http.post(uri, body: request);
  //
  //   if (response.statusCode == 201) {
  //     return TaxiDispatch.fromJson(response.body);
  //   } else {
  //     throw Exception("Failed to post trip");
  //   }
  // }

  static int convert(TaxiDispatchStatus taxiDispatchStatus) {
    switch (taxiDispatchStatus) {
      case TaxiDispatchStatus.pending:
        return 1;
      case TaxiDispatchStatus.accepted:
        return 2;
      case TaxiDispatchStatus.pickedUp:
        return 3;
      case TaxiDispatchStatus.finished:
        return 4;
      case TaxiDispatchStatus.canceled:
        return 5;
    }
  }

  Future<String> putTrip(TaxiDispatch taxiDispatch) async {
    // String request = taxiDispatch.toJson();

    final uri = Uri.parse(
        "http://10.0.2.2:8080/api/status/driver/${taxiDispatch.id.toString()}");
    final response = await http.put(
      uri,
      body: {
        "driverId": taxiDispatch.driverId.toString(),
        "status": convert(taxiDispatch.status).toString(),
      },
    );

    if (response.statusCode == 200) {
      return "update success";
    } else {
      throw Exception("Failed to put trip");
    }
  }

// Future<TaxiDispatch?>? deleteTrip() async {
//   Client client = new TaxiDispatch(id: "1");
//   String request = client.toJson();
//
//   final uri = Uri.parse("https://jsonplaceholder.typicode.com/users/1");
//   final response = await http.delete(uri, body: request);
//
//   if (response.statusCode == 200) {
//     return null;
//   } else {
//     throw Exception("Failed to delete trip");
//   }
// }
}
