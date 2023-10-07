part of 'signup_bloc.dart';

final class SignupState extends Equatable {
  final FormzSubmissionStatus status;
  final Username username;
  final Password password;
  final Password confirmPassword;
  final bool isValid;

  const SignupState({
    this.status = FormzSubmissionStatus.initial,
    this.username = const Username.pure(),
    this.password = const Password.pure(),
    this.confirmPassword = const Password.pure(),
    this.isValid = false,
  });

  SignupState copyWith({
    FormzSubmissionStatus? status,
    Username? username,
    Password? password,
    Password? confirmPassword,
    bool? isValid,
  }) {
    return SignupState(
      status: status ?? this.status,
      username: username ?? this.username,
      password: password ?? this.password,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      isValid: isValid ?? this.isValid,
    );
  }

  @override
  // TODO: implement props
  List<Object?> get props => [status, username, password, confirmPassword, isValid];
}