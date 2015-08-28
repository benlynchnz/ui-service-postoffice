import postal from "postal";
import Notifications from "./Notifications/index.jsx";

React.render(<Notifications/>, document.getElementById("post-office"));

window.POST_OFFICE = postal;
