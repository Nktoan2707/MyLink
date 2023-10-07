import 'dart:async';

import 'package:my_link_mobile_driver/data/data_providers/taxi_dispatch_provider.dart';
import 'package:my_link_mobile_driver/models/domain/taxi_dispatch.dart';
import 'package:my_link_mobile_driver/services/taxi_dispatch_service.dart';

class TaxiDispatchRepository {
  List<TaxiDispatch> localList = List.empty(growable: true);
  TaxiDispatch? ongoingTaxiDispatch;

  final _tripRequestController = StreamController<List<TaxiDispatch>>();

  final TaxiDispatchService _taxiDispatchService;
  late StreamSubscription _tripRequestSubscription;

  TaxiDispatchRepository({required taxiDispatchService})
      : _taxiDispatchService = taxiDispatchService {
    _tripRequestSubscription = _taxiDispatchService.tripRequestStream
        .listen((TaxiDispatch taxiDispatch) {
      if (taxiDispatch.id == ongoingTaxiDispatch?.id ||
          taxiDispatch.driverId == "27") {
        return;
      }

      for (var element in localList) {
        if (element.id == taxiDispatch.id) {
          localList.remove(element);
          _tripRequestController.add(localList);
          return;
        }
      }

      if (taxiDispatch.status == TaxiDispatchStatus.pending) {
        localList.add(taxiDispatch);
        _tripRequestController.add(localList);
      }
    });
  }

  Stream<List<TaxiDispatch>> get tripRequestStream async* {
    yield* _tripRequestController.stream;
  }

  void startListeningToTripRequest() {
    _taxiDispatchService.openListeningToTripRequestChannel();
  }

  void stopListeningToTripRequest() {
    localList.clear();
    _taxiDispatchService.closeListeningToTripRequestChannel();
  }

  void startPublishingDriverInfo() {
    _taxiDispatchService.openPublishingDriverInfoChannel();
  }

  void stopPublishingDriverInfo() {
    localList.clear();
    _taxiDispatchService.closePublishingDriverInfoChannel();
  }

  void publishDriverInfo(TaxiDispatch taxiDispatch) {
    _taxiDispatchService.publishDriverInfo(taxiDispatch);
  }

  bool isOngoingTaxiDispatch() {
    return ongoingTaxiDispatch != null;
  }

  TaxiDispatch findById(String id) {
    return localList.firstWhere((element) => element.id == id);
  }

  void add(TaxiDispatch taxiDispatch) {
    localList.add(taxiDispatch);
  }

  void remove(String id) {
    localList.removeAt(localList.indexWhere((element) => element.id == id));
  }

  Future<String> putTrip() async {
    TaxiDispatchProvider taxiDispatchProvider = new TaxiDispatchProvider();
    return taxiDispatchProvider.putTrip(ongoingTaxiDispatch!);
  }

  dispose() {
    _tripRequestSubscription.cancel();
    _tripRequestController.close();
    _taxiDispatchService.dispose();
  }
}
