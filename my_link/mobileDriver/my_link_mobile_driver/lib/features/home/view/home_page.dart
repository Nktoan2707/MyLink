import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_link_mobile_driver/data/repositories/taxi_dispatch_repository.dart';
import 'package:my_link_mobile_driver/features/home/bloc/home_bloc.dart';
import 'package:my_link_mobile_driver/features/home/view/home_view.dart';

class HomePage extends StatelessWidget {
  static const String pageId = "/home";

  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider<HomeBloc>(
      create: (context) {
        return HomeBloc(
            taxiDispatchRepository:
                RepositoryProvider.of<TaxiDispatchRepository>(context))
          ..add(HomeUserSettingsLoaded());
      },
      child: const HomeView(),
    );
  }
}
