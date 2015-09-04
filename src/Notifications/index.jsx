import postoffice from "postal";
import Notification from "./views/Notification.jsx";
import css from "./views/NotificationCSS.css";
import utils from "./utils";

export default class PostOffice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      style: {
        position: "fixed",
        top: 0,
      },
    };
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

    return utils.componentDidMount(this);
  }
  _updateState(props) {
    if (props.top) {
      let style = this.state.style;
      style.top = Number(props.top);
      this.setState({ style: style });
    }
  }
  _publishMessage(message) {
    let expiresAt = moment().add(5, "seconds");
    if (message.expires && message.expires < 0) {
      expiresAt = moment().add(1, "day");
    } else if (message.expires && !Number.isNaN(message.expires)) {
      expiresAt = moment().add(message.expires, "seconds");
    }
    if (message.can_dismiss === false) {
      message.can_dismiss = false;
      expiresAt = moment().add(1, "day");
    } else {
      message.can_dismiss = true;
    }
    delete message.expires;
    message.received_at = moment();
    message.visible_until = expiresAt;
    let messages = this.state.messages;
    messages.push(message);
    this.setState({ messages: messages });
  }
  render() {
    return this.state.messages.length ? (<Notification {...this.state} />) : (<div></div>);
  }
}
