import postoffice from "postal";
import styles from "./NotificationStyles";
import css from "./NotificationCSS.css";

export default class NotificationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: props.messages, updated_at: moment().toISOString() };
    this._onDismissClick = this._onDismissClick.bind(this);
  }
  componentDidMount() {
    let checkMessages = window.setInterval(() => {
      this.state.messages.forEach((message, i) => {
        if (moment().isAfter(message.visible_until)) {
          this._expireMessage(message);
        }

        if (message.className === css.arrive) {
          message.className = css.show;
          this._showMessage(message);
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
  _onDismissClick(e) {
    const idx = e.currentTarget.getAttribute("data-idx");
    const message = this.state.messages[idx];
    if (!message.can_dismiss) {
      return;
    }
    message.visible_until = moment();
    this._expireMessage(message);
  }
  _showMessage(message) {
    let messages = this.state.messages;
    let idx = _.findIndex(messages, message);
    messages[idx] = message;
    this.setState({ messages: messages, updated_at: moment().toISOString() });
  }
  _expireMessage(message) {
    let messages = this.state.messages;
    if (message.expired) {
      _.pull(messages, message);
    }
    message.expired = true;
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
    return (<ul style={this.props.style} className={css.wrapper}>
      {this.state.messages.map((message, i) => {
        return (
          <li
            key={i}
            style={styles.messageWrapper}
            className={message.className}
            data-idx={i}
            onClick={this._onDismissClick}>
            <div style={notificationStyles(message)}>
              {message.can_dismiss ? (<div style={styles.close}><i className="material-icons">close</i></div>) : null}
              {message.title ? (<div style={styles.title}>{message.title}</div>) : null}
              <div style={styles.message}>{message.message}</div>
            </div>
          </li>
        );
      })}
    </ul>);
  }
}
