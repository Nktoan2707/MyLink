import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_link_mobile_driver/features/home/view/request_list_view.dart';

import '../bloc/home_bloc.dart';

class RequestListPage extends StatelessWidget {
  // static const String pageId = "/request_list";

  const RequestListPage({super.key});

  static Route<void> route() {
    return MaterialPageRoute<void>(
        builder: (context) => const RequestListPage());
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<HomeBloc, HomeState>(
      listener: (context, state) {
        if (state is HomeAcceptRequestSuccess){
          Navigator.pop(context);
          return;
        }
      },
      child: Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(
            color: Colors.black, //change your color here
          ),
          title: const Text("All Requests"),
          centerTitle: true,
        ),
        body: const RequestListView(),
      ),
    );
  }
}
