part of 'signup_bloc.dart';


abstract class SignupEvent extends Equatable {
  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class SignupUsernameChanged extends SignupEvent {
  final String username;

  SignupUsernameChanged(this.username);


  @override
  // TODO: implement props
  List<Object?> get props => [username];

  @override
  String toString() => "SignupUsernameChanged {username: $username}";
}

class SignupPasswordChanged  extends SignupEvent {
  final String password;
  SignupPasswordChanged(this.password);

  @override
  // TODO: implement props
  List<Object?> get props => [password];

  @override
  String toString() => "SignupPasswordChanged {password: $password}";
}

class SignupFormSubmitted extends SignupEvent {
  @override
  String toString() {
    // TODO: implement toString
    return "SignupSubmitted {}";
  }
}

class SignupSuccess extends SignupEvent {
  @override
  String toString() {
    // TODO: implement toString
    return "SignupSuccess {}";
  }
}