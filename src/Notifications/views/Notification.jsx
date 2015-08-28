import postoffice from "postal";
import styles from "./NotificationStyles";
import css from "./NotificationCSS.css";

export default class NotificationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], updated_at: moment().toISOString() };

    this._onDismissClick = this._onDismissClick.bind(this)
  }
  componentDidMount() {
    this.setState({ messages: this.props.messages });
    let checkMessages = window.setInterval(() => {
      this.state.messages.forEach((message, i) => {
        if (moment().isAfter(message.visible_until)) {
          this._expireMessage(message);
        }
      });

      if (!this.state.messages.length) {
        postoffice.publish({
          channel: "notification",
          topic: "empty",
        });

        window.clearInterval(checkMessages);
      }
    }, 500);
  }
  componentDidUnmount() {
    console.log("unmount");
  }
  _onDismissClick(e) {
    const idx = e.currentTarget.getAttribute("data-idx");
    const message = this.state.messages[idx];
    message.visible_until = moment();

    this._expireMessage(message);
  }
  _expireMessage(message) {
    let messages = this.state.messages;
    if (message.className) {
      _.pull(messages, message);
    }
    message.className = css.expire;
    this.setState({ messages: messages, updated_at: moment().toISOString() });
  }
  render() {
    let notificationStyles = (message) => {
      switch (message.level) {
        case "info":
          return styles.notificationWrapperBlue;
        case "success":
          return styles.notificationWrapperGreen;
        case "warning":
          return styles.notificationWrapperAmber;
        case "error":
          return styles.notificationWrapperRed;
        default:
          return styles.notificationWrapperBlue;
      }
    };
    return (<ul style={styles.wrapper}>
      {this.state.messages.map((message, i) => {
        return (
          <li key={i} style={notificationStyles(message)} className={message.className}>
            <div style={styles.close} data-idx={i} onClick={this._onDismissClick}><i className="material-icons">close</i></div>
            <div style={styles.title}>{message.title}</div>
            <div style={styles.message}>{message.message}</div>
          </li>
        );
      })}
    </ul>);
  }
}
