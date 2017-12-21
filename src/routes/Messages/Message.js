import React from 'react';
import * as firebase from 'firebase';
import './Messages.css';
class Message extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            messages: []
        }
    }
    componentDidMount() {
        console.log("componentDidMount");
        firebase.database().ref('messages/').on('value', (snapshot) => {
            const realtime_messages = snapshot.val()
            if (realtime_messages != null) {
                this.setState({
                    messages: realtime_messages
                })
            }
        })
    }
    render() {
        const realtimeMessages = this.state.messages.map((message, i) => {
            let messageClass = "client";
            let arrowClass = "";
            if (message.id % 2 == 0) {
                messageClass = "mine";
                arrowClass = "arrowright"
            }
            return (
                <div className={`eachmessage ${arrowClass}`} key={i}>
                    <img className={`img-circle`} />
                    <div className={`message ${messageClass}`}>{message.text}</div>
                </div>
            )
        })
        return (
            <div className="history_div" id="customscrolbar">
                {realtimeMessages}
            </div>
        )
    }
}
export default Message