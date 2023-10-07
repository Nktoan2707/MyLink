part of 'authentication_bloc.dart';

abstract class AuthenticationEvent extends Equatable {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class _AuthenticationStatusChanged extends AuthenticationEvent {
  final AuthenticationStatus status;

  _AuthenticationStatusChanged(this.status);

  @override
  String toString() => "AuthenticationStatusChanged {}";
}

class AuthenticationLogoutRequested extends AuthenticationEvent {
  @override
  // TODO: implement props
  List<Object?> get props => [];

  @override
  String toString() => "AuthenticationLogoutRequested {}";
}
