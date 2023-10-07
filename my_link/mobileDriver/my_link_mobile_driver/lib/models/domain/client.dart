import 'dart:convert';

import 'package:equatable/equatable.dart';

class Client extends Equatable {
  final String id;

  const Client({required this.id});

  @override
  // TODO: implement props
  List<Object?> get props => [id];

  Map<String, dynamic> toMap() {
    return {
      'id': this.id,
    };
  }

  factory Client.fromMap(Map<String, dynamic> map) {
    return Client(
      id: map['id'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory Client.fromJson(String source) => Client.fromMap(json.decode(source));
}
