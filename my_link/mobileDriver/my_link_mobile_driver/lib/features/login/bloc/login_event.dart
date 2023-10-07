part of 'login_bloc.dart';


abstract class LoginEvent extends Equatable {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class LoginUsernameChanged extends LoginEvent {
  final String username;

  LoginUsernameChanged(this.username);


  @override
  // TODO: implement props
  List<Object?> get props => [username];

  @override
  String toString() => "LoginUsernameChanged {username: $username}";
}

class LoginPasswordChanged  extends LoginEvent {
  final String password;
  LoginPasswordChanged(this.password);

  @override
  // TODO: implement props
  List<Object?> get props => [password];

  @override
  String toString() => "LoginPasswordChanged {password: $password}";
}

class LoginFormSubmitted extends LoginEvent {
  @override
  String toString() {
    // TODO: implement toString
    return "LoginSubmitted {}";
  }
}