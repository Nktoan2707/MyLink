part of 'home_bloc.dart';

abstract class HomeState {
  final List<TaxiDispatch>? taxiDispatchList;
  final TaxiDispatch? ongoingTaxiDispatch;

  const HomeState(
      {required this.taxiDispatchList, required this.ongoingTaxiDispatch});

  HomeState copyWith({
    List<TaxiDispatch>? taxiDispatchList,
  });
}

class HomeInitial extends HomeState {
  const HomeInitial()
      : super(taxiDispatchList: null, ongoingTaxiDispatch: null);

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return const HomeInitial();
  }
}

class HomeChangeToOfflineSuccess extends HomeState {
  const HomeChangeToOfflineSuccess()
      : super(taxiDispatchList: null, ongoingTaxiDispatch: null);

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return const HomeChangeToOfflineSuccess();
  }
}

class HomeChangeToOnlineSuccess extends HomeState {
  const HomeChangeToOnlineSuccess(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeChangeToOnlineSuccess(taxiDispatchList: taxiDispatchList);
  }
}

class HomeAcceptRequestInProgress extends HomeState {
  const HomeAcceptRequestInProgress(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeAcceptRequestInProgress(taxiDispatchList: taxiDispatchList);
  }
}

class HomeAcceptRequestSuccess extends HomeState {
  const HomeAcceptRequestSuccess(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeAcceptRequestSuccess(taxiDispatchList: taxiDispatchList);
  }
}

class HomeAcceptRequestFailure extends HomeState {
  const HomeAcceptRequestFailure(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeAcceptRequestFailure(taxiDispatchList: taxiDispatchList);
  }
}

class HomePickUpClientInProgress extends HomeState {
  const HomePickUpClientInProgress(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomePickUpClientInProgress(taxiDispatchList: taxiDispatchList);
  }
}

class HomePickUpClientSuccess extends HomeState {
  const HomePickUpClientSuccess(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomePickUpClientSuccess(taxiDispatchList: taxiDispatchList);
  }
}

class HomePickUpClientFailure extends HomeState {
  const HomePickUpClientFailure(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomePickUpClientFailure(taxiDispatchList: taxiDispatchList);
  }
}

class HomeStartTripInProgress extends HomeState {
  const HomeStartTripInProgress(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeStartTripInProgress(taxiDispatchList: taxiDispatchList);
  }
}

class HomeStartTripSuccess extends HomeState {
  const HomeStartTripSuccess(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeStartTripSuccess(taxiDispatchList: taxiDispatchList);
  }
}

class HomeStartTripFailure extends HomeState {
  const HomeStartTripFailure(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeStartTripFailure(taxiDispatchList: taxiDispatchList);
  }
}

class HomeFinishTripInProgress extends HomeState {
  const HomeFinishTripInProgress(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeFinishTripInProgress(taxiDispatchList: taxiDispatchList);
  }
}

class HomeFinishTripSuccess extends HomeState {
  const HomeFinishTripSuccess(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeFinishTripSuccess(taxiDispatchList: taxiDispatchList);
  }
}

class HomeFinishTripFailure extends HomeState {
  const HomeFinishTripFailure(
      {super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeFinishTripFailure(taxiDispatchList: taxiDispatchList);
  }
}

class HomeCancelTripInProgress extends HomeState {
  HomeCancelTripInProgress({super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeCancelTripInProgress(taxiDispatchList: taxiDispatchList);
  }
}

class HomeCancelTripSuccess extends HomeState {
  HomeCancelTripSuccess({super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeCancelTripSuccess(taxiDispatchList: taxiDispatchList);
  }
}

class HomeCancelTripFailure extends HomeState {
  HomeCancelTripFailure({super.taxiDispatchList, super.ongoingTaxiDispatch});

  @override
  HomeState copyWith({List<TaxiDispatch>? taxiDispatchList}) {
    return HomeCancelTripFailure(taxiDispatchList: taxiDispatchList);
  }
}
