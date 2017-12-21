import React from 'react';
import * as firebaseTemp from 'firebase';
import './Messages.css';
import Message from './Message';
import Contact from './Contact';
class Messages extends React.Component {
    constructor(props, context) {
        super(props, context)
        // firebaseTemp.initializeApp(config);
        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            message: "",
            idIndex: 0
        }

    }
    updateMessage(event) {
        this.setState({
            message: event.target.value
        })
    }
    sendMessage(event) {
        console.log("sendMessage" + this.state.message);
        if (this.state.message != "") {
            this.state.idIndex++;
            const nextMessage = {
                id: this.state.idIndex,
                text: this.state.message
            }
            firebaseTemp.database().ref('messages/' + nextMessage.id).set(nextMessage)
            this.refs.message.value = '';
        }
    }
    
    render() {
        return (
            <div className="messages">
                <h1>Real Time Chat</h1>
                <hr />
                <div className="contactComponent">
                    <Contact />
                </div>
                <div className="messageComponent">
                    <Message />
                    <hr />
                    <div className="inputdiv">
                        <input className="input" ref="message" onChange={this.updateMessage} type="text" placeholder="Message Here" />
                        <button className="sendbtn" onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Messages