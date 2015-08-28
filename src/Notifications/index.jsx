import postoffice from "postal";
import Notification from "./views/Notification.jsx";
import css from "./views/NotificationCSS.css";

export default class PostOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  componentDidMount() {
    postoffice.subscribe({
      channel: "notification",
      topic: "test",
      callback: (data) => {
        data.className = css.arrive;
        this._publishMessage(data);
      },
    });

    postoffice.subscribe({
      channel: "notification",
      topic: "empty",
      callback: () => { this.setState({ messages: [] }); },
    });
  }
  _publishMessage(message) {
    message.received_at = moment();
    message.visible_until = moment().add(message.expires || 5, "seconds");
    let messages = this.state.messages;
    messages.push(message);
    this.setState({ messages: messages });
  }
  render() {
    return this.state.messages.length ? (<Notification {...this.state} />) : (<div></div>);
  }
}
