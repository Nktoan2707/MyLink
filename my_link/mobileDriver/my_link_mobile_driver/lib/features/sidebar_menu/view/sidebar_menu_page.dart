import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_link_mobile_driver/features/authentication/authentication.dart';
import 'package:my_link_mobile_driver/features/login/bloc/login_bloc.dart';
import 'package:my_link_mobile_driver/features/sidebar_menu/view/sidebar_menu_view.dart';

class SidebarMenuPage extends StatelessWidget {
  const SidebarMenuPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const SidebarMenuView();
  }
}
