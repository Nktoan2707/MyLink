import 'dart:async';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import 'package:lottie/lottie.dart' as lottie;
import 'package:material_dialogs/material_dialogs.dart';
import 'package:material_dialogs/shared/types.dart';
import 'package:material_dialogs/widgets/buttons/icon_button.dart';
import 'package:my_link_mobile_driver/common/constants.dart';
import 'package:my_link_mobile_driver/features/home/bloc/home_bloc.dart';
import 'package:my_link_mobile_driver/features/home/view/request_list_page.dart';
import 'package:my_link_mobile_driver/models/domain/taxi_dispatch.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';
import 'package:image/image.dart' as IMG;

class HomeViewOnline extends StatefulWidget {
  const HomeViewOnline({super.key});

  @override
  State<HomeViewOnline> createState() => _HomeViewOnlineState();
}

class _HomeViewOnlineState extends State<HomeViewOnline> {
  final ScrollController scrollController = ScrollController();
  final PanelController panelController = PanelController();

  final Completer<GoogleMapController> _googleMapController = Completer();
  static const double fabHeightClosed = 100;
  double fabHeight = fabHeightClosed;

  // List<LatLng> polylineCoordinates = [];
  // LocationData? _currentLocation;
  //
  // void getCurrentLocation() async {
  //   Location location = Location();
  //
  //   location.getLocation().then((location) {
  //     _currentLocation = location;
  //     getPolylinePoints();
  //   });
  //
  //   GoogleMapController googleMapController = await _googleMapController.future;
  //   location.onLocationChanged.listen((newLocation) {
  //     _currentLocation = newLocation;
  //
  //     googleMapController.animateCamera(
  //       CameraUpdate.newCameraPosition(
  //         CameraPosition(
  //           zoom: 13.5,
  //           target: LatLng(
  //             newLocation.latitude!,
  //             newLocation.longitude!,
  //           ),
  //         ),
  //       ),
  //     );
  //     setState(() {});
  //   });
  // }
  //
  // void getPolylinePoints() async {
  //   PolylinePoints polylinePoints = PolylinePoints();
  //
  //   PolylineResult polylineResult =
  //       await polylinePoints.getRouteBetweenCoordinates(
  //     GOOGLE_API_KEY,
  //     PointLatLng(_currentLocation!.latitude!, _currentLocation!.latitude!),
  //     PointLatLng(_pickupLocation.latitude, _pickupLocation.longitude),
  //   );
  //
  //   if (polylineResult.points.isNotEmpty) {
  //     for (var point in polylineResult.points) {
  //       polylineCoordinates.add(
  //         LatLng(point.latitude, point.longitude),
  //       );
  //     }
  //
  //     setState(() {});
  //   }
  // }

  BitmapDescriptor driverMarkerIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor customerMarkerIcon = BitmapDescriptor.defaultMarker;

  Uint8List? resizeImage(Uint8List data, width, height) {
    Uint8List? resizedData = data;
    IMG.Image? img = IMG.decodeImage(data);
    IMG.Image resized = IMG.copyResize(img!, width: width, height: height);
    resizedData = Uint8List.fromList(IMG.encodePng(resized));
    return resizedData;
  }

  void setCustomMarkerIcon() async {
    // BitmapDescriptor.fromAssetImage(
    //         ImageConfiguration(size: Size(10, 10)), "assets/images/customer_marker_icon.png")
    //     .then((icon) => customerMarkerIcon = icon);
    // BitmapDescriptor.fromAssetImage(
    //     ImageConfiguration(size: Size(5, 5), devicePixelRatio: 0.2), "assets/images/driver_marker_icon.jpg")
    //     .then((icon) => driverMarkerIcon = icon);

    String imgurl = "https://www.fluttercampus.com/img/car.png";
    Uint8List bytes = (await NetworkAssetBundle(Uri.parse(imgurl)).load(imgurl))
        .buffer
        .asUint8List();
    Uint8List? smallimg = resizeImage(bytes, 200, 200);
    driverMarkerIcon = BitmapDescriptor.fromBytes(smallimg!);

    imgurl =
        "https://icon-library.com/images/current-location-icon-png/current-location-icon-png-29.jpg";
    bytes = (await NetworkAssetBundle(Uri.parse(imgurl)).load(imgurl))
        .buffer
        .asUint8List();
    smallimg = resizeImage(bytes, 200, 200);
    customerMarkerIcon = BitmapDescriptor.fromBytes(smallimg!);
    setState(() {});
  }

  @override
  void initState() {
    // getCurrentLocation();
    // getPolylinePoints
    setCustomMarkerIcon();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final panelHeightOpen = MediaQuery.of(context).size.height * 0.6;
    final panelHeightClosed = MediaQuery.of(context).size.height * 0.1;
    return BlocConsumer<HomeBloc, HomeState>(
      listener: (context, state) {
        if (state is HomeFinishTripSuccess) {
          Dialogs.materialDialog(
            color: Colors.white,
            msg: 'Congratulations, you earned 100\$ from this trip',
            msgAlign: TextAlign.center,
            title: 'Congratulations',
            lottieBuilder: lottie.Lottie.asset(
              'assets/animation/cong_example.json',
              fit: BoxFit.contain,
            ),
            barrierDismissible: false,
            context: context,
            actions: [
              IconsButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                text: 'Claim',
                iconData: Icons.done,
                color: Colors.blue,
                textStyle: TextStyle(color: Colors.white),
                iconColor: Colors.white,
              ),
            ],
          );
        } else if (state is HomeCancelTripSuccess) {
          Dialogs.materialDialog(
            color: Colors.white,
            msg:
                'You have canceled trip with ID: ${state.ongoingTaxiDispatch?.id}',
            msgAlign: TextAlign.center,
            title: 'Taxi Dispatch Canceled By Driver',
            barrierDismissible: false,
            // customView: Text("alo"),
            // customViewPosition: CustomViewPosition.BEFORE_ANIMATION,
            context: context,
            actions: [
              IconsButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                text: 'Confirm',
                iconData: Icons.done,
                color: Colors.blue,
                textStyle: TextStyle(color: Colors.white),
                iconColor: Colors.white,
              ),
            ],
          );
        }
      },
      builder: (context, state) {
        LatLng? _pickupLocation;
        LatLng? _dropOffLocation;
        LatLng? _currentLocation = LatLng(10.77, 106.682717);
        if (state is HomeAcceptRequestSuccess) {
          _pickupLocation = LatLng(10.762541, 106.682633);
          // _pickupLocation = state.ongoingTaxiDispatch?.pickupLocation;
        } else if (state is HomePickUpClientSuccess ||
            state is HomeStartTripSuccess) {
          _dropOffLocation = LatLng(10.766359, 106.682717);
          // _dropOffLocation = state.ongoingTaxiDispatch?.destinationLocation;
        }

        Set<Marker> markerSet = {};
        if (_currentLocation != null) {
          markerSet.add(
            Marker(
              markerId: MarkerId("current"),
              icon: driverMarkerIcon,
              position: _currentLocation,
            ),
          );
        }

        if (_pickupLocation != null) {
          markerSet.add(
            Marker(
              markerId: MarkerId("pickup"),
              icon: customerMarkerIcon,
              position: _pickupLocation,
            ),
          );
        }

        if (_dropOffLocation != null) {
          markerSet.add(
            Marker(
              markerId: MarkerId("dropOff"),
              icon: BitmapDescriptor.defaultMarker,
              position: _dropOffLocation,
            ),
          );
        }

        return Stack(
          alignment: Alignment.topCenter,
          children: <Widget>[
            SlidingUpPanel(
              minHeight: panelHeightClosed,
              maxHeight: panelHeightOpen,
              parallaxEnabled: true,
              parallaxOffset: 0.5,
              renderPanelSheet: false,
              controller: panelController,
              panelBuilder: (scrollController) => _RequestFloatingPanel(
                scrollController: scrollController,
                panelController: panelController,
              ),
              collapsed: buildCollapsedPanel(),
              body:
                  // _currentLocation != null
                  //     ? const Center(
                  //         child: Text("Loading"),
                  //       )
                  //     :
                  GoogleMap(
                initialCameraPosition: CameraPosition(
                    // target: LatLng(_currentLocation!.latitude!,
                    //     _currentLocation!.longitude!),
                    target: _currentLocation ?? LatLng(10.762541, 106.682633),
                    zoom: 13.5,
                    tilt: 0,
                    bearing: 0),
                markers: markerSet,
                // polylines: {
                //   Polyline(
                //     polylineId: PolylineId("pickupRoute"),
                //     points: polylineCoordinates,
                //     color: Colors.purple,
                //     width: 6,
                //   ),
                // },
                onMapCreated: (mapController) {
                  _googleMapController.complete(mapController);
                },
              ),
              onPanelSlide: (position) {
                setState(
                  () {
                    final panelMaxScrollExtent =
                        panelHeightOpen - panelHeightClosed;
                    fabHeight =
                        position * panelMaxScrollExtent + fabHeightClosed;
                  },
                );
              },
            ),
            Positioned(
              bottom: fabHeight,
              right: 22,
              child: FloatingActionButton(
                backgroundColor: Colors.white,
                onPressed: () async {
                  GoogleMapController controller =
                      await _googleMapController.future;
                  controller.animateCamera(
                    CameraUpdate.newCameraPosition(
                      CameraPosition(target: _currentLocation, zoom: 14),
                    ),
                  );
                  setState(() {});
                },
                child: const Icon(
                  Icons.gps_fixed,
                  color: Colors.black,
                  size: 35,
                ),
              ),
            )
          ],
        );
      },
    );
  }

  Widget buildCollapsedPanel() => GestureDetector(
        child: Container(
          decoration: const BoxDecoration(
            color: Colors.blueGrey,
            borderRadius: BorderRadius.only(
                topLeft: Radius.circular(24.0),
                topRight: Radius.circular(24.0)),
          ),
          margin: const EdgeInsets.fromLTRB(12.0, 12.0, 12.0, 0.0),
          child: BlocBuilder<HomeBloc, HomeState>(
            builder: (context, state) {
              return Center(
                child: Text(
                  "You have (${state.taxiDispatchList?.length.toString()}) request",
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
              );
            },
          ),
        ),
        onTap: () {
          panelController.isPanelOpen
              ? panelController.close()
              : panelController.open();
        },
      );
}

class _RequestFloatingPanel extends StatefulWidget {
  final ScrollController scrollController;
  final PanelController panelController;

  const _RequestFloatingPanel(
      {super.key,
      required this.scrollController,
      required this.panelController});

  @override
  State<_RequestFloatingPanel> createState() => _RequestFloatingPanelState();
}

class _RequestFloatingPanelState extends State<_RequestFloatingPanel> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        elevation: 0,
        margin: const EdgeInsets.all(12.0),
        child: BlocBuilder<HomeBloc, HomeState>(
          builder: (context, state) {
            return Column(
              children: [
                Builder(builder: (_) {
                  if (state.ongoingTaxiDispatch != null) {
                    return _OngoingTaxiDispatchCard(state: state);
                  } else if (state.taxiDispatchList!.isNotEmpty) {
                    return _RequestCard();
                  } else {
                    return const Expanded(
                      child: Center(
                        child: Text(
                          "There is currently no request!",
                          style: TextStyle(fontSize: 20),
                        ),
                      ),
                    );
                  }
                }),
                Builder(
                  builder: (_) {
                    if (state is HomeChangeToOnlineSuccess ||
                        state is HomeFinishTripSuccess) {
                      return TextButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => MultiBlocProvider(
                                providers: [
                                  BlocProvider.value(
                                      value: context.read<HomeBloc>()),
                                ],
                                child: RequestListPage(),
                              ),
                            ),
                          );
                        },
                        child: const Text(
                          "View All Requests",
                          style: TextStyle(fontSize: 20),
                        ),
                      );
                    } else if (state is HomeChangeToOnlineSuccess) {
                      return const Center(child: SizedBox.shrink());
                    } else if (state is HomeAcceptRequestSuccess) {
                      return const Center(
                        child: Text(
                          "Pickup Mode: going to the customer's pickup location...",
                          style: TextStyle(fontSize: 16),
                          textAlign: TextAlign.center,
                        ),
                      );
                    } else if (state is HomePickUpClientSuccess) {
                      return const Center(
                        child: Text(
                          "Pickup Success: please start trip when you're ready",
                          style: TextStyle(fontSize: 16),
                          textAlign: TextAlign.center,
                        ),
                      );
                    } else if (state is HomeStartTripSuccess) {
                      return const Center(
                        child: Text(
                          "Trip Mode: going to the customer's drop off destination...",
                          style: TextStyle(fontSize: 16),
                          textAlign: TextAlign.center,
                        ),
                      );
                    } else if (state is HomeFinishTripSuccess) {
                      return const Center(child: SizedBox.shrink());
                    }
                    return const Center(child: SizedBox.shrink());
                  },
                )
              ],
            );
          },
        ),
      ),
    );
  }
}

class _RequestCard extends StatelessWidget {
  const _RequestCard({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeBloc, HomeState>(
      builder: (context, state) {
        TaxiDispatch latestTripRequest = state.taxiDispatchList!.last;

        return Column(
          children: [
            const SizedBox(
              height: 12,
            ),
            buildDragHandle(),
            const SizedBox(
              height: 10,
            ),
            Padding(
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
                        latestTripRequest.clientId.toString(),
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
                // "7958 Swift Village",
                latestTripRequest.pickupName.toString(),
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
                // "105 William, US",
                latestTripRequest.destinationName.toString(),
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
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  TextButton(
                    onPressed: () {
                      context.read<HomeBloc>().add(
                          HomeIgnoreTripButtonPressed(latestTripRequest.id));
                    },
                    style: TextButton.styleFrom(
                        backgroundColor: Colors.red,
                        minimumSize: const Size(100, 56)),
                    child: const Text(
                      'IGNORE',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      BlocProvider.of<HomeBloc>(context)
                          .add(HomeRequestAccepted(latestTripRequest.id));
                    },
                    style: TextButton.styleFrom(
                        backgroundColor: Colors.green,
                        minimumSize: const Size(100, 56)),
                    child: const Text(
                      'ACCEPT',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      },
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

class _OngoingTaxiDispatchCard extends StatelessWidget {
  final HomeState state;

  const _OngoingTaxiDispatchCard({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    TaxiDispatch ongoingTaxiDispatch = state.ongoingTaxiDispatch!;

    return Column(
      children: [
        const SizedBox(
          height: 12,
        ),
        buildDragHandle(),
        const SizedBox(
          height: 10,
        ),
        Padding(
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
                    ongoingTaxiDispatch.clientId.toString(),
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
            // "7958 Swift Village",
            ongoingTaxiDispatch.pickupName.toString(),
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
            // "105 William, US",
            ongoingTaxiDispatch.destinationName.toString(),
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
          child: Builder(
            builder: (_) {
              if (state is HomeAcceptRequestSuccess) {
                return Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    TextButton(
                      onPressed: () {
                        context.read<HomeBloc>().add(
                            HomeCancelTripButtonPressed(
                                ongoingTaxiDispatch.id));
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: Colors.red,
                          minimumSize: const Size(100, 56)),
                      child: const Text(
                        'CANCEL TRIP',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        BlocProvider.of<HomeBloc>(context).add(
                            HomePickUpButtonPressed(ongoingTaxiDispatch.id));
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: Colors.green,
                          minimumSize: const Size(100, 56)),
                      child: const Text(
                        'CONFIRM PICKUP',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                );
              } else if (state is HomePickUpClientSuccess) {
                return Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    TextButton(
                      onPressed: () {
                        context.read<HomeBloc>().add(
                            HomeCancelTripButtonPressed(
                                ongoingTaxiDispatch.id));
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: Colors.red,
                          minimumSize: const Size(100, 56)),
                      child: const Text(
                        'CANCEL TRIP',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        BlocProvider.of<HomeBloc>(context).add(
                            HomeStartTripButtonPressed(ongoingTaxiDispatch.id));
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: Colors.green,
                          minimumSize: const Size(100, 56)),
                      child: const Text(
                        'START TRIP',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                );
              } else if (state is HomeStartTripSuccess) {
                return Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    TextButton(
                      onPressed: () {
                        context.read<HomeBloc>().add(
                            HomeCancelTripButtonPressed(
                                ongoingTaxiDispatch.id));
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: Colors.red,
                          minimumSize: const Size(100, 56)),
                      child: const Text(
                        'CANCEL TRIP',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        BlocProvider.of<HomeBloc>(context).add(
                            HomeFinishTripButtonPressed(
                                ongoingTaxiDispatch.id));
                      },
                      style: TextButton.styleFrom(
                          backgroundColor: Colors.green,
                          minimumSize: const Size(100, 56)),
                      child: const Text(
                        'FINISH TRIP',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                );
              } else if (state is HomeFinishTripSuccess) {}
              return Text(
                "IN PROGRESS",
                style: TextStyle(fontSize: 16),
                textAlign: TextAlign.center,
              );
            },
          ),
        ),
      ],
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
