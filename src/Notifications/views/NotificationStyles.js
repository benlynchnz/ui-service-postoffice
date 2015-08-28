const red = "#e60000";
const redOpaque = "rgba(230,0,0,0.05)";
const amber = "#f1c40f";
const amberOpaque = "rgba(241,196,15,0.05)";
const green = "#2ecc71";
const greenOpaque = "rgba(46,204,113,0.05)";
const blue = "#3498DB";
const blueOpaque = "rgba(52,152,219,0.05)";

const font = "'Roboto' sans-serif";

const styles = {
  wrapper: {
    width: 300,
    position: "fixed",
    top: 20,
    right: 20,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  notificationWrapperRed: {
    fontFamily: font,
    padding: 10,
    marginTop: 8,
    boxShadow: "0 2px 4px -1px rgba(0,0,0,0.2)",
    backgroundColor: redOpaque,
    borderTop: `5px solid ${red}`,
  },
  notificationWrapperAmber: {
    fontFamily: font,
    padding: 10,
    marginTop: 8,
    boxShadow: "0 2px 4px -1px rgba(0,0,0,0.2)",
    backgroundColor: amberOpaque,
    borderTop: `5px solid ${amber}`,
  },
  notificationWrapperGreen: {
    fontFamily: font,
    padding: 10,
    marginTop: 8,
    boxShadow: "0 2px 4px -1px rgba(0,0,0,0.2)",
    backgroundColor: greenOpaque,
    borderTop: `5px solid ${green}`,
  },
  notificationWrapperBlue: {
    fontFamily: font,
    padding: 10,
    marginTop: 8,
    boxShadow: "0 2px 4px -1px rgba(0,0,0,0.2)",
    backgroundColor: blueOpaque,
    borderTop: `5px solid ${blue}`,
  },
  close: {
    float: "right",
    color: "rgba(0,0,0,0.56)",
    cursor: "pointer",
  },
  title: {
    fontSize: 16,
    fontWeight: 400,
    color: "rgba(0,0,0,0.87)",
    paddingBottom: 8,
  },
  message: {
    fontSize: 12,
    fontWeight: 300,
    color: "rgba(0,0,0,0.87)",
  },
};

export default styles;
