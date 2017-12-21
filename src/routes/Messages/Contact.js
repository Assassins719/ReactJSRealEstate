import React from 'react';
import * as firebase from 'firebase';
import './Contact.css';
class Contact extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            contacts: [],
            indexSelected : -1
        }
    }
    componentDidMount() {
        console.log("componentDidMount");
        firebase.database().ref('contact/').on('value', (snapshot) => {
            const contact_List = snapshot.val()
            if (contact_List != null) {
                this.setState({
                    contacts: contact_List
                })
            }
        })
    }
    selectContact(index) {
        console.log(this.state.contacts[index]);
        this.setState({
            indexSelected: index
        })
    }
    render() {
        return (
            <div className="history_div" id="customscrolbar">
                {
                    this.state.contacts.map((contact, i) => {
                        if (i == this.state.indexSelected) {
                            return (<div className={'active'} key={i} onClick={this.selectContact.bind(this,i)}>
                                <img className={`img-circle`} />
                                <span className={'contactname'}>{contact.name}</span>
                            </div>)
                        } else {
                            return (<div className={'contact'} key={i} onClick={this.selectContact.bind(this,i)}>
                                <img className={`img-circle`} />
                                <span className={'contactname'}>{contact.name}</span>
                            </div>)
                        }
                    })
                }
            </div>
        )
    }
}
export default Contact