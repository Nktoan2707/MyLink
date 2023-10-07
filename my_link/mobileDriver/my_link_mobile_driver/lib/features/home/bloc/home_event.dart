part of 'home_bloc.dart';

abstract class HomeEvent extends Equatable {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class HomeUserSettingsLoaded extends HomeEvent {}

class HomeActiveStatusSwitchPressed extends HomeEvent {
  final bool isOnline;

  HomeActiveStatusSwitchPressed(this.isOnline);

  @override
  // TODO: implement props
  List<Object?> get props => [isOnline];

  @override
  String toString() {
    // TODO: implement toString
    return "HomeActiveStatusSwitchPressed: {isOnline: $isOnline}";
  }
}

class HomeRequestAccepted extends HomeEvent {
  final String taxiDispatchId;

  HomeRequestAccepted(this.taxiDispatchId);

  @override
  // TODO: implement props
  List<Object?> get props => [taxiDispatchId];

  @override
  String toString() {
    // TODO: implement toString
    return "HomeRequestAccepted: {clientId: $taxiDispatchId}";
  }
}

class HomePickUpButtonPressed extends HomeEvent {
  final String taxiDispatchId;

  HomePickUpButtonPressed(this.taxiDispatchId);
}

class HomeStartTripButtonPressed extends HomeEvent {
  final String taxiDispatchId;

  HomeStartTripButtonPressed(this.taxiDispatchId);
}

class HomeFinishTripButtonPressed extends HomeEvent {
  final String taxiDispatchId;

  HomeFinishTripButtonPressed(this.taxiDispatchId);
}

class HomeCancelTripButtonPressed extends HomeEvent {
  final String taxiDispatchId;

  HomeCancelTripButtonPressed(this.taxiDispatchId);
}

class HomeIgnoreTripButtonPressed extends HomeEvent {
  final String taxiDispatchId;

  HomeIgnoreTripButtonPressed(this.taxiDispatchId);
}

class _HomeNewTripRequestFound extends HomeEvent {}
