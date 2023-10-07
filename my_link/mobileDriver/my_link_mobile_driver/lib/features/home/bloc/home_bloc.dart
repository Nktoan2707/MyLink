import 'dart:async';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:my_link_mobile_driver/data/repositories/taxi_dispatch_repository.dart';
import 'package:my_link_mobile_driver/models/domain/taxi_dispatch.dart';
import 'package:my_link_mobile_driver/services/taxi_dispatch_service.dart';

part 'home_event.dart';

part 'home_state.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final TaxiDispatchRepository _taxiDispatchRepository;
  late StreamSubscription _tripRequestSubscription;

  HomeBloc({required TaxiDispatchRepository taxiDispatchRepository})
      : _taxiDispatchRepository = taxiDispatchRepository,
        super(HomeInitial()) {
    on<HomeUserSettingsLoaded>(_onHomeUserSettingsLoaded);
    on<HomeActiveStatusSwitchPressed>(_onHomeActiveStatusSwitchPressed);
    on<HomeRequestAccepted>(_onHomeRequestAccepted);
    on<HomePickUpButtonPressed>(_onHomePickUpButtonPressed);
    on<HomeStartTripButtonPressed>(_onHomeStartTripButtonPressed);
    on<HomeFinishTripButtonPressed>(_onHomeFinishTripButtonPressed);
    on<_HomeNewTripRequestFound>(_onHomeNewTripRequestFound);
    on<HomeIgnoreTripButtonPressed>(_onHomeIgnoreTripButtonPressed);
    on<HomeCancelTripButtonPressed>(_onHomeCancelTripButtonPressed);

    _tripRequestSubscription = _taxiDispatchRepository.tripRequestStream
        .listen((List<TaxiDispatch> taxiDispatchList) {
      add(_HomeNewTripRequestFound());
    });
  }

  //Normal functions
  Timer? publishDriverInfoTimer;

  void startPublishDriverInfoTimer() {
    publishDriverInfoTimer =
        Timer.periodic(const Duration(seconds: 2), (timer) {
      if (!_taxiDispatchRepository.isOngoingTaxiDispatch()) {
        publishDriverInfoTimer?.cancel();
        publishDriverInfoTimer = null;
      } else {
        _taxiDispatchRepository
            .publishDriverInfo(_taxiDispatchRepository.ongoingTaxiDispatch!);
      }
    });
  }

  //handle event functions
  FutureOr<void> _onHomeNewTripRequestFound(
      _HomeNewTripRequestFound event, Emitter<HomeState> emit) {
    emit(state.copyWith(taxiDispatchList: _taxiDispatchRepository.localList));
  }

  FutureOr<void> _onHomeUserSettingsLoaded(
      HomeUserSettingsLoaded event, Emitter<HomeState> emit) {
    _taxiDispatchRepository.stopListeningToTripRequest();
    emit(HomeChangeToOfflineSuccess());
  }

  FutureOr<void> _onHomeActiveStatusSwitchPressed(
      HomeActiveStatusSwitchPressed event, Emitter<HomeState> emit) {
    if (_taxiDispatchRepository.isOngoingTaxiDispatch()) {
      return Future(() => null);
    }

    if (!event.isOnline) {
      _taxiDispatchRepository.startListeningToTripRequest();
      emit(HomeChangeToOnlineSuccess(
          taxiDispatchList: _taxiDispatchRepository.localList));
    } else {
      _taxiDispatchRepository.stopListeningToTripRequest();
      emit(HomeChangeToOfflineSuccess());
    }
  }

  FutureOr<void> _onHomeRequestAccepted(
      HomeRequestAccepted event, Emitter<HomeState> emit) async {
    emit(HomeAcceptRequestInProgress(
        taxiDispatchList: _taxiDispatchRepository.localList));
    _taxiDispatchRepository.ongoingTaxiDispatch = _taxiDispatchRepository
        .findById(event.taxiDispatchId)
        .copyWith(status: TaxiDispatchStatus.accepted, driverId: "27");
    if (await _taxiDispatchRepository.putTrip() != "update success") {
      return;
    }

    _taxiDispatchRepository.remove(event.taxiDispatchId);
    _taxiDispatchRepository.stopListeningToTripRequest();
    _taxiDispatchRepository.startPublishingDriverInfo();
    startPublishDriverInfoTimer();
    emit(HomeAcceptRequestSuccess(
        taxiDispatchList: _taxiDispatchRepository.localList,
        ongoingTaxiDispatch: _taxiDispatchRepository.ongoingTaxiDispatch));
  }

  FutureOr<void> _onHomePickUpButtonPressed(
      HomePickUpButtonPressed event, Emitter<HomeState> emit) async {
    emit(HomePickUpClientInProgress(
        ongoingTaxiDispatch: _taxiDispatchRepository.ongoingTaxiDispatch));

    //TODO: await response from backend
    _taxiDispatchRepository.ongoingTaxiDispatch!
      ..status = TaxiDispatchStatus.pickedUp
      ..driverId = "27";
    if (await _taxiDispatchRepository.putTrip() != "update success") {
      return;
    }

    emit(HomePickUpClientSuccess(
        taxiDispatchList: _taxiDispatchRepository.localList,
        ongoingTaxiDispatch: _taxiDispatchRepository.ongoingTaxiDispatch));
  }

  FutureOr<void> _onHomeStartTripButtonPressed(
      HomeStartTripButtonPressed event, Emitter<HomeState> emit) async {
    emit(HomeStartTripInProgress(
        taxiDispatchList: _taxiDispatchRepository.localList,
        ongoingTaxiDispatch: _taxiDispatchRepository.ongoingTaxiDispatch));

    await Future.delayed(Duration(seconds: 1), () {});

    emit(HomeStartTripSuccess(
        taxiDispatchList: _taxiDispatchRepository.localList,
        ongoingTaxiDispatch: _taxiDispatchRepository.ongoingTaxiDispatch));
  }

  FutureOr<void> _onHomeFinishTripButtonPressed(
      HomeFinishTripButtonPressed event, Emitter<HomeState> emit) async {
    //TODO: await response from backend
    _taxiDispatchRepository.ongoingTaxiDispatch!
      ..status = TaxiDispatchStatus.pickedUp
      ..driverId = "27";
    if (await _taxiDispatchRepository.putTrip() != "update success") {
      return;
    }

    _taxiDispatchRepository.startListeningToTripRequest();
    _taxiDispatchRepository.stopPublishingDriverInfo();
    emit(HomeFinishTripSuccess(
        ongoingTaxiDispatch: _taxiDispatchRepository.ongoingTaxiDispatch));
    _taxiDispatchRepository.ongoingTaxiDispatch = null;
    emit(HomeChangeToOnlineSuccess(
        taxiDispatchList: _taxiDispatchRepository.localList));
  }

  FutureOr<void> _onHomeIgnoreTripButtonPressed(
      HomeIgnoreTripButtonPressed event, Emitter<HomeState> emit) {
    _taxiDispatchRepository.remove(event.taxiDispatchId);
    emit(state.copyWith(taxiDispatchList: _taxiDispatchRepository.localList));
  }

  FutureOr<void> _onHomeCancelTripButtonPressed(
      HomeCancelTripButtonPressed event, Emitter<HomeState> emit) {
    emit(HomeCancelTripInProgress());
    //TODO: wait for api result
    _taxiDispatchRepository.startListeningToTripRequest();
    _taxiDispatchRepository.stopPublishingDriverInfo();
    emit(HomeCancelTripSuccess(
        ongoingTaxiDispatch:
            _taxiDispatchRepository.ongoingTaxiDispatch!.copyWith()));
    _taxiDispatchRepository.ongoingTaxiDispatch = null;
    emit(HomeChangeToOnlineSuccess(
        taxiDispatchList: _taxiDispatchRepository.localList));
  }

  @override
  Future<void> close() {
    _tripRequestSubscription.cancel();
    return super.close();
  }
}
