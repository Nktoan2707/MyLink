

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../data/repositories/authentication_repository.dart';
import '../bloc/signup_bloc.dart';
import 'signup_form.dart';

class SignupPage extends StatelessWidget {
  static const String pageId = "/signup";

  const SignupPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.primaryContainer,
      body: BlocProvider(
        create: (context) {
          return SignupBloc(
            authenticationRepository:
            RepositoryProvider.of<AuthenticationRepository>(context),
          );
        },
        child: const SignupForm(),
      ),
    );
  }
}
