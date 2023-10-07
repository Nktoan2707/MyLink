import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_link_mobile_driver/features/home/bloc/home_bloc.dart';
import 'package:my_link_mobile_driver/features/home/view/home_view_offline.dart';
import 'package:my_link_mobile_driver/features/home/view/home_view_online.dart';
import 'package:my_link_mobile_driver/features/sidebar_menu/view/sidebar_menu_page.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(builder: (_) => const HomeView());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: BlocBuilder<HomeBloc, HomeState>(
          buildWhen: (previous, current) =>
              _isSwitchingActiveStatus(previous, current),
          builder: (context, state) {
            final bool isOnline = state is HomeChangeToOnlineSuccess;
            return Text(
              isOnline ? 'Online' : "Offline",
              style: const TextStyle(fontSize: 30, color: Colors.black),
            );
          },
        ),
        centerTitle: true,
        backgroundColor: Colors.yellow,
        iconTheme: const IconThemeData(color: Colors.black),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25),
            child: BlocBuilder<HomeBloc, HomeState>(
              buildWhen: (previous, current) =>
                  _isSwitchingActiveStatus(previous, current),
              builder: (context, state) {
                final bool isOnline = state is HomeChangeToOnlineSuccess;
                return Switch(
                  value: isOnline,
                  onChanged: (bool value) {
                    context
                        .read<HomeBloc>()
                        .add(HomeActiveStatusSwitchPressed(isOnline));
                  },
                );
              },
            ),
          ),
        ],
      ),
      drawer: const SidebarMenuPage(),
      body: BlocBuilder<HomeBloc, HomeState>(
        buildWhen: (previous, current) =>
            _isSwitchingActiveStatus(previous, current),
        builder: (context, state) {
          final bool isOnline = state is HomeChangeToOnlineSuccess;
          return isOnline ? const HomeViewOnline() : const HomeViewOffline();
        },
      ),
    );
  }

  _isSwitchingActiveStatus(HomeState previous, HomeState current) {
    if (current is HomeChangeToOfflineSuccess || current is HomeChangeToOnlineSuccess) {
      return true;
    }
    return false;
  }
}
