

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../data/repositories/authentication_repository.dart';
import '../bloc/login_bloc.dart';
import 'login_form.dart';

class LoginPage extends StatelessWidget {
  static const String pageId = "/login";

  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.primaryContainer,
      body: BlocProvider(
        create: (context) {
          return LoginBloc(
            authenticationRepository:
            RepositoryProvider.of<AuthenticationRepository>(context),
          );
        },
        child: const LoginForm(),
      ),
    );
  }
}
