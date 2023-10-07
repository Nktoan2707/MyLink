import 'dart:convert';

import 'package:google_maps_flutter/google_maps_flutter.dart';

enum TaxiDispatchStatus { pending, canceled, accepted, pickedUp, finished }

class TaxiDispatch {
  String id;
  TaxiDispatchStatus status;
  LatLng? currentDriverLocation;
  String? pickupName;
  LatLng? pickupLocation;
  String? destinationName;
  LatLng? destinationLocation;
  String? phone;
  String clientId;
  String? driverId;
  double? tripFare;
  double? distanceKm;

  TaxiDispatch(
      {required this.id,
      required this.status,
      this.currentDriverLocation,
      this.pickupName,
      this.pickupLocation,
      this.destinationName,
      this.destinationLocation,
      this.phone,
      required this.clientId,
      this.driverId,
      this.tripFare,
      this.distanceKm});

  Map<String, dynamic> toMap() {
    return {
      'id': this.id,
      'status': this.status.name.toString(),
      'currentDriverLocation': this.currentDriverLocation ?? "No info",
      'pickupName': this.pickupName ?? "No info",
      'pickupLocation': this.pickupLocation?.toJson() ?? "No info",
      'destinationName': this.destinationName ?? "No info",
      'destinationLocation': this.destinationLocation?.toJson() ?? "No info",
      'phone': this.phone ?? "No info",
      'clientId': this.clientId,
      'driverId': this.driverId ?? "No info",
      'tripFare': this.tripFare ?? 0,
      'distanceKm': this.distanceKm ?? 0,
    };
  }

  static TaxiDispatchStatus convert(int id) {
    switch (id) {
      case 1:
        return TaxiDispatchStatus.pending;
      case 2:
        return TaxiDispatchStatus.accepted;
      case 3:
        return TaxiDispatchStatus.pickedUp;
      case 4:
        return TaxiDispatchStatus.finished;
      case 5:
        return TaxiDispatchStatus.canceled;
    }

    return TaxiDispatchStatus.pending;
  }

  factory TaxiDispatch.fromMap(Map<String, dynamic> map) {
    return TaxiDispatch(
      id: (map['id'] as int).toString(),
      status: convert(map['status'] as int),
      currentDriverLocation: map['currentDriverLocation'] == null
          ? null
          : map['currentDriverLocation'] as LatLng,
      pickupName:
          map['pickupName'] == null ? null : map['pickupName'] as String,
      pickupLocation: map['pickupLocation'] == null
          ? null
          : LatLng(map['pickupLocation']['latitude'],
              map['pickupLocation']['longitude']),
      destinationName: map['destinationName'] == null
          ? null
          : map['destinationName'] as String,
      destinationLocation: map['destinationLocation'] == null
          ? null
          : LatLng(map['destinationLocation']['latitude'],
              map['destinationLocation']['longitude']),
      phone: map['phone'] == null ? null : map['phone'] as String,
      clientId: map['clientId'] as String,
      driverId: map['driverId'] == null ? null : map['driverId'] as String,
      tripFare: map['tripFare'] == null
          ? null
          : double.parse(map['tripFare'].toString()),
      distanceKm: map['distanceKm'] == null
          ? null
          : double.parse(map['distanceKm'].toString()),
    );
  }

  String toJson() => json.encode(toMap());

  factory TaxiDispatch.fromJson(String source) =>
      TaxiDispatch.fromMap(json.decode(source));

  TaxiDispatch copyWith({
    String? id,
    TaxiDispatchStatus? status,
    LatLng? currentDriverLocation,
    String? pickupName,
    LatLng? pickupLocation,
    String? destinationName,
    LatLng? destinationLocation,
    String? phone,
    String? clientId,
    String? driverId,
    double? tripFare,
    double? distanceKm,
  }) {
    return TaxiDispatch(
      id: id ?? this.id,
      status: status ?? this.status,
      currentDriverLocation:
          currentDriverLocation ?? this.currentDriverLocation,
      pickupName: pickupName ?? this.pickupName,
      pickupLocation: pickupLocation ?? this.pickupLocation,
      destinationName: destinationName ?? this.destinationName,
      destinationLocation: destinationLocation ?? this.destinationLocation,
      phone: phone ?? this.phone,
      clientId: clientId ?? this.clientId,
      driverId: driverId ?? this.driverId,
      tripFare: tripFare ?? this.tripFare,
      distanceKm: distanceKm ?? this.distanceKm,
    );
  }
}
