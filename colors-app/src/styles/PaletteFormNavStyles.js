import { DRAWER_WIDTH } from "../constants";
import sizes from "./sizes";

const drawerWidth = DRAWER_WIDTH;

export default (theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navBtns: {
    marginRight: "0.5rem",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
    },
    [sizes.down("xs")]: {
      marginRight: "0",
    },
  },
  button: {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      marginRight: "0 0.5rem",
      padding: "0.3rem",
    },
  },
  validatorInput: {
    display: "flex",
    alignItems: "center",
  },
});
