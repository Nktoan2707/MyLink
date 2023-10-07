import 'package:flutter/material.dart';

import '../features/home/view/home_page.dart';
import '../features/login/view/login_page.dart';
import '../features/signup/view/signup_page.dart';
import '../widgets/splash_page.dart';

class AppRouter {


  Route? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case SplashPage.pageId:
        return MaterialPageRoute(builder: (context) => const SplashPage());

      case LoginPage.pageId:
        return MaterialPageRoute(builder: (context) => const LoginPage());

      case SignupPage.pageId:
        return MaterialPageRoute(builder: (context) => const SignupPage());

      case HomePage.pageId:
        return MaterialPageRoute(builder: (context) => const HomePage());

      default:
        return null;
    }
  }
}
