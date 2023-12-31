import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget {
  static const String pageId = "/loading";

  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}