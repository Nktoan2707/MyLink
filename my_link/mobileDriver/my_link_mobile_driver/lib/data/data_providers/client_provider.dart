import 'package:my_link_mobile_driver/models/domain/client.dart';
import 'package:http/http.dart' as http;

class ClientProvider {
  Future<Client> getClient() async {
    final uri = Uri.parse("https://jsonplaceholder.typicode.com/users/1");
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      return Client.fromJson(response.body);
    } else {
      throw Exception("Failed to get client");
    }
  }

  Future<Client> postTrip() async {
    Client client = new Client(id: "1");
    String request = client.toJson();

    final uri = Uri.parse("https://jsonplaceholder.typicode.com/users/1");
    final response = await http.post(uri, body: request);

    if (response.statusCode == 201) {
      return Client.fromJson(response.body);
    } else {
      throw Exception("Failed to post trip");
    }
  }

  Future<Client> putTrip() async {
    Client client = new Client(id: "1");
    String request = client.toJson();

    final uri = Uri.parse("https://jsonplaceholder.typicode.com/users/1");
    final response = await http.put(uri, body: request);

    if (response.statusCode == 200) {
      return Client.fromJson(response.body);
    } else {
      throw Exception("Failed to put trip");
    }
  }

  Future<Client?>? deleteTrip() async {
    Client client = new Client(id: "1");
    String request = client.toJson();

    final uri = Uri.parse("https://jsonplaceholder.typicode.com/users/1");
    final response = await http.delete(uri, body: request);

    if (response.statusCode == 200) {
      return null;
    } else {
      throw Exception("Failed to delete trip");
    }
  }
}