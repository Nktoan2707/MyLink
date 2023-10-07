import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_link_mobile_driver/data/repositories/taxi_dispatch_repository.dart';
import 'package:my_link_mobile_driver/features/signup/signup.dart';
import 'package:my_link_mobile_driver/router/app_router.dart';
import 'package:my_link_mobile_driver/services/taxi_dispatch_service.dart';

import 'package:my_link_mobile_driver/widgets/splash_page.dart';

import 'data/repositories/authentication_repository.dart';
import 'data/repositories/user_repository.dart';
import 'features/authentication/bloc/authentication_bloc.dart';
import 'features/home/view/home_page.dart';
import 'features/login/view/login_page.dart';

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  late final AuthenticationRepository _authenticationRepository;
  late final UserRepository _userRepository;
  late final TaxiDispatchRepository _taxiDispatchRepository;

  @override
  void initState() {
    super.initState();
    _authenticationRepository = AuthenticationRepository();
    _userRepository = UserRepository();
    _taxiDispatchRepository = TaxiDispatchRepository(taxiDispatchService: TaxiDispatchService());
  }

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider.value(
          value: _authenticationRepository,
        ),
        RepositoryProvider.value(
          value: _userRepository,
        ),
        RepositoryProvider.value(
          value: _taxiDispatchRepository,
        ),
      ],
      child: BlocProvider(
        create: (_) => AuthenticationBloc(
          authenticationRepository: _authenticationRepository,
          userRepository: _userRepository,
        ),
        child: const AppView(),
      ),
    );
  }

  @override
  void dispose() {
    _authenticationRepository.dispose();
    _taxiDispatchRepository.dispose();
    super.dispose();
  }
}

class AppView extends StatefulWidget {
  const AppView({super.key});

  @override
  State<AppView> createState() => _AppViewState();
}

class _AppViewState extends State<AppView> {
  final AppRouter _appRouter = AppRouter();

  final _navigatorKey = GlobalKey<NavigatorState>();

  NavigatorState get _navigator => _navigatorKey.currentState!;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: _navigatorKey,
      theme: ThemeData.from(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromRGBO(32, 63, 129, 1.0),
        ),
      ),
      builder: (context, child) {
        return BlocListener<AuthenticationBloc, AuthenticationState>(
          listener: (_, state) {
            if (state is AuthenticationAuthenticateSuccess) {
              _navigator.pushNamedAndRemoveUntil<void>(
                HomePage.pageId,
                (route) => false,
              );
            } else if (state is AuthenticationAuthenticateFailure) {
              _navigator.pushNamedAndRemoveUntil<void>(
                LoginPage.pageId,
                (route) => false,
              );
            } else if (state is AuthenticationUnknown) {
              return;
            }
          },
          child: child,
        );
      },
      initialRoute: SplashPage.pageId,
      onGenerateRoute: _appRouter.onGenerateRoute,
    );
  }
}
