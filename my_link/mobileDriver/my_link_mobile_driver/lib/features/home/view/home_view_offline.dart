import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';

class HomeViewOffline extends StatefulWidget {
  const HomeViewOffline({super.key});

  @override
  State<HomeViewOffline> createState() => _HomeViewOfflineState();
}

class _HomeViewOfflineState extends State<HomeViewOffline> {
  final ScrollController scrollController = ScrollController();
  final PanelController panelController = PanelController();

  static const LatLng _kMapCenter = LatLng(10.758449, 106.6645122);
  static const CameraPosition _kInitialPosition =
      CameraPosition(target: _kMapCenter, zoom: 11.0, tilt: 0, bearing: 0);

  static const double fabHeightClosed = 100;
  double fabHeight = fabHeightClosed;

  @override
  Widget build(BuildContext context) {
    final panelHeightOpen = MediaQuery.of(context).size.height * 0.4;
    final panelHeightClosed = MediaQuery.of(context).size.height * 0.1;

    return Container(
      color: Colors.grey,
      child: Stack(
        alignment: Alignment.topCenter,
        children: <Widget>[
          SlidingUpPanel(
            minHeight: panelHeightClosed,
            maxHeight: panelHeightOpen,
            parallaxEnabled: true,
            parallaxOffset: 0.5,
            renderPanelSheet: false,
            controller: panelController,
            panelBuilder: (scrollController) =>
                const _DriverSummaryFloatingPanel(),
            backdropEnabled: false,
            defaultPanelState: PanelState.OPEN,
            isDraggable: false,
          ),
          Positioned(
            child: Container(
              decoration: const BoxDecoration(color: Colors.orange),
              child: const ListTile(
                leading: Icon(
                  Icons.nights_stay,
                  size: 35,
                ),
                title: Text(
                  "You are Offline",
                  style: TextStyle(fontSize: 25),
                ),
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 30, vertical: 10),
              ),
            ),
          )
        ],
      ),
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
          child: const Center(
            child: Text(
              "You have (0) request",
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
          ),
        ),
        onTap: () {
          panelController.isPanelOpen
              ? panelController.close()
              : panelController.open();
        },
      );
}

class _DriverSummaryFloatingPanel extends StatelessWidget {
  const _DriverSummaryFloatingPanel({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      // shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      elevation: 0,
      // margin: const EdgeInsets.all(12.0),
      child: Column(
        children: [
          const SizedBox(
            height: 10,
          ),
          buildDragHandle(),
          const SizedBox(
            height: 10,
          ),
          Container(
            // color: Colors.grey,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(15, 0, 0, 0),
              child: Row(
                children: [
                  ClipRect(
                    child: Image.network(
                      'https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
                      fit: BoxFit.cover,
                      width: 90,
                      height: 90,
                    ),
                  ),
                  const Expanded(
                    child: ListTile(
                      contentPadding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 0),
                      title: Text(
                        'Esther Berry',
                        style: TextStyle(fontSize: 20),
                      ),
                      trailing: Text(
                        '\$325.00',
                        style: TextStyle(fontSize: 20),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const Divider(
            height: 10,
            indent: 120,
            endIndent: 20,
            color: Colors.black,
            thickness: 1.0,
          ),
          Container(
            decoration: BoxDecoration(
                color: Colors.yellow, borderRadius: BorderRadius.circular(10)),
            margin: const EdgeInsets.all(20),
            child: const Padding(
              padding: EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.access_time_outlined,
                        size: 35,
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        '10.2',
                        style: TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        'HOURS ONLINE',
                        style: TextStyle(
                            fontSize: 13, fontWeight: FontWeight.normal),
                      ),
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.speed,
                        size: 35,
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        '30 KM',
                        style: TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        'TOTAL DISTANCE',
                        style: TextStyle(
                            fontSize: 13, fontWeight: FontWeight.normal),
                      ),
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.accessibility,
                        size: 35,
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        '20',
                        style: TextStyle(
                            fontSize: 25, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Text(
                        'TOTAL JOBS',
                        style: TextStyle(
                            fontSize: 13, fontWeight: FontWeight.normal),
                      ),
                    ],
                  )
                ],
              ),
            ),
          )
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
        onTap: () {
          // panelController.isPanelOpen
          //     ? panelController.close()
          //     : panelController.open();
        },
      );
}
