import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:my_link_mobile_driver/models/domain/taxi_dispatch.dart';

import '../bloc/home_bloc.dart';

class RequestListView extends StatelessWidget {
  const RequestListView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scrollbar(
      thickness: 10,
      interactive: true,
      thumbVisibility: true,
      trackVisibility: true,
      child: Container(
        color: Colors.grey,
        child: ListView(
          scrollDirection: Axis.vertical,
          children: [
            Container(
              color: Colors.yellow,
              child: Padding(
                padding: EdgeInsets.all(20.0),
                child: Center(
                  child: BlocBuilder<HomeBloc, HomeState>(
                    builder: (context, state) {
                      return Text(
                        "You have (${state.taxiDispatchList!.length}) new requests.",
                        style: TextStyle(fontSize: 25),
                      );
                    },
                  ),
                ),
              ),
            ),
            BlocBuilder<HomeBloc, HomeState>(
              builder: (context, state) {
                List<Widget> tripRequestWidgetList =
                    List<Widget>.empty(growable: true);
                state.taxiDispatchList?.forEach((element) {
                  tripRequestWidgetList
                      .add(_RequestCard(taxiDispatch: element));
                });
                return Column(
                  children: tripRequestWidgetList,
                );
              },
            )
          ],
        ),
      ),
    );
  }
}

class _RequestCard extends StatelessWidget {
  final TaxiDispatch taxiDispatch;

  const _RequestCard({super.key, required this.taxiDispatch});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      margin: const EdgeInsets.fromLTRB(0, 0, 0, 15),
      child: Column(
        children: [
          const SizedBox(
            height: 10,
          ),
          Container(
            // color: Colors.grey,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(15, 0, 0, 10),
              child: Row(
                children: [
                  ClipRect(
                    child: Image.network(
                      'https://oflutter.com/wp-content/uploads/2021/02/girl-profile.png',
                      fit: BoxFit.cover,
                      width: 60,
                      height: 90,
                    ),
                  ),
                  Expanded(
                    child: ListTile(
                      title: Text(
                        taxiDispatch.clientId.toString(),
                        style: TextStyle(fontSize: 20),
                      ),
                      subtitle: SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        padding: EdgeInsets.zero,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: false
                              ? [const Text("No coupon applied")]
                              : [
                                  FilterChip(
                                    label: const Text("Apple Pay"),
                                    onSelected: (bool) {},
                                    backgroundColor: Colors.yellow,
                                  ),
                                  FilterChip(
                                    label: const Text("Discount"),
                                    onSelected: (bool) {},
                                    backgroundColor: Colors.yellow,
                                  ),
                                  FilterChip(
                                    label: const Text("Coupon 1"),
                                    onSelected: (bool) {},
                                    backgroundColor: Colors.yellow,
                                  ),
                                  FilterChip(
                                    label: const Text("Coupon 2"),
                                    onSelected: (bool) {},
                                    backgroundColor: Colors.yellow,
                                  ),
                                ],
                        ),
                      ),
                      trailing: const Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Text(
                            "25.00\$",
                            style: TextStyle(fontSize: 16),
                          ),
                          Text(
                            "2.2 KM",
                            style: TextStyle(fontSize: 16),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const Divider(
            height: 10,
            indent: 20,
            endIndent: 20,
            color: Colors.black,
            thickness: 1.0,
          ),
          ListTile(
            title: Text(
              'PICK UP',
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            subtitle: Text(
              taxiDispatch.pickupName.toString(),
              style: TextStyle(fontSize: 20, color: Colors.black),
            ),
          ),
          const Divider(
            height: 10,
            indent: 20,
            endIndent: 20,
            color: Colors.black,
            thickness: 1.0,
          ),
          ListTile(
            title: Text(
              'DROP OFF',
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            subtitle: Text(
              taxiDispatch.destinationName.toString(),
              style: TextStyle(fontSize: 20, color: Colors.black),
            ),
          ),
          const Divider(
            height: 10,
            indent: 20,
            endIndent: 20,
            color: Colors.black,
            thickness: 1.0,
          ),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () {
                    context
                        .read<HomeBloc>()
                        .add(HomeIgnoreTripButtonPressed(taxiDispatch.id));
                  },
                  style: TextButton.styleFrom(
                      backgroundColor: Colors.red,
                      minimumSize: const Size(100, 56)),
                  child: const Text(
                    'IGNORE',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 10),
                  child: TextButton(
                    onPressed: () {
                      BlocProvider.of<HomeBloc>(context)
                          .add(HomeRequestAccepted(taxiDispatch.id));
                    },
                    style: TextButton.styleFrom(
                        backgroundColor: Colors.green,
                        minimumSize: const Size(100, 56)),
                    child: const Text(
                      'ACCEPT',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget buildDragHandle() => GestureDetector(
        child: Center(
          child: Container(
            width: 30,
            height: 5,
            decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(12)),
          ),
        ),
        onTap: () {},
      );
}
