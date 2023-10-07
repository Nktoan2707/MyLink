import { useEffect, useState } from "react";
import { Container, Header, Sidebar, Sidenav, Content, Nav } from "rsuite";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { createUseStyles } from "react-jss";
import "./container.less";
import NavToggle from "./components/NavToggle";
import Booking from "../Booking/Booking";
import MyProfile from "../MyProfile/MyProfile";
import { useDispatch, useSelector } from "react-redux";
import * as userAction from "../../redux/user/actions";
const IndexPage = () => {
  const [expand, setExpand] = useState(true);
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const user = useSelector((state) => state.user);
  console.log("🚀 ~ file: MyProfile.js:23 ~ MyProfile ~ user:", user);
  const dispatch = useDispatch();
  const { id } = user;
  const idUser = localStorage.getItem("idUser");
  console.log("🚀 ~ file: IndexPage.js:23 ~ IndexPage ~ idUser:", idUser);
  const indexTabs = [
    {
      name: "Booking",
      icon: <DashboardIcon />,
    },
    {
      name: "My Profile",
      icon: <GroupIcon />,
    },
  ];

  const listPages = [
    {
      index: 0,
      content: <Booking />,
    },
    {
      index: 1,
      content: <MyProfile />,
    },
  ];

  const handleOnClickTab = (index) => {
    setActiveTab(index);
  };
  useEffect(() => {
    dispatch(userAction.getUser(id || idUser));
  }, []);
  console.log("aaaaaa");
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0 }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div className={classes.headerStyles}>
              <span style={{ marginLeft: 12 }}> My Link</span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={["1"]} appearance="subtle">
            <Sidenav.Body>
              <Nav>
                {indexTabs.map((indextab, i) => {
                  return (
                    <Nav.Item
                      eventKey={i}
                      active={i === activeTab}
                      icon={indextab.icon}
                      onClick={() => handleOnClickTab(i)}
                    >
                      {indextab.name}
                    </Nav.Item>
                  );
                })}
                {/* <Nav.Menu eventKey="3" trigger="hover" title="Advanced" icon={<MagicIcon />} placement="rightStart">
                  <Nav.Item eventKey="3-1">Geo</Nav.Item>
                  <Nav.Item eventKey="3-2">Devices</Nav.Item>
                  <Nav.Item eventKey="3-3">Brand</Nav.Item>
                  <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                  <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="4"
                  trigger="hover"
                  title="Settings"
                  icon={<GearCircleIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="4-1">Applications</Nav.Item>
                  <Nav.Item eventKey="4-2">Websites</Nav.Item>
                  <Nav.Item eventKey="4-3">Channels</Nav.Item>
                  <Nav.Item eventKey="4-4">Tags</Nav.Item>
                  <Nav.Item eventKey="4-5">Versions</Nav.Item>
                </Nav.Menu> */}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container style={{ position: "absolute", right: 0, left: expand ? 260 : 56 }}>
          {listPages[activeTab].content}
        </Container>
      </Container>
    </div>
  );
};

const useStyles = createUseStyles({
  headerStyles: {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: "#34c3ff",
    color: " #fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});

export default IndexPage;
