import 'dart:async';

import '../../common/enums.dart';



class AuthenticationRepository {
  final _controller = StreamController<AuthenticationStatus>();

  Stream<AuthenticationStatus> get status async* {
    await Future<void>.delayed(const Duration(seconds: 1));
    yield AuthenticationStatus.unauthenticated;
    yield* _controller.stream;
  }

  Future<void> logIn({
    required String username,
    required String password,
  }) async {
    // throw Exception("login failed");
    await Future.delayed(
      const Duration(milliseconds: 300),
      () => _controller.add(AuthenticationStatus.authenticated),
    );
  }

  void logOut() {
    //thuc hien log out voi backend

    //
    _controller.add(AuthenticationStatus.unauthenticated);
  }

  Future<void> signup() async {
    throw Exception("register failed");

    // doing register with backend
    await Future.delayed(
      const Duration(milliseconds: 300),
          () {}
    );
  }

  void dispose() => _controller.close();
}
