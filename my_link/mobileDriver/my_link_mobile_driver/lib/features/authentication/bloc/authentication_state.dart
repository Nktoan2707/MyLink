part of 'authentication_bloc.dart';

abstract class AuthenticationState extends Equatable {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class AuthenticationUnknown extends AuthenticationState {

}


class AuthenticationAuthenticateSuccess extends AuthenticationState {
  final User user;

  AuthenticationAuthenticateSuccess(this.user);

  @override
  // TODO: implement props
  List<Object?> get props => [user];

  @override
  String toString() {
    // TODO: implement toString
    return super.toString();
  }
}

class AuthenticationAuthenticateFailure extends AuthenticationState {
  @override
  String toString() {
    // TODO: implement toString
    return super.toString();
  }
}


