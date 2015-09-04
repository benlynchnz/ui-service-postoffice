import postal from "postal";
import Notifications from "./Notifications/index.jsx";

let el = document.getElementsByTagName("ui-core-postoffice")[0];

React.render(<Notifications element={el}/>, el);

window.POST_OFFICE = postal;
