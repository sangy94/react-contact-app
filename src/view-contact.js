import React, { Component } from "react";

class ContactView extends Component {

    currentContact = {};
    constructor(props) {
        super(props);
        this.currentContact = this.props.currentContact;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
            this.currentContact = nextProps.currentContact
        }
    }

    render(){
        return (
            <div>
                <h1 className="mt-5">View contact</h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col"><i className="fa fa-user"></i></th>
                        <th scope="col">{this.currentContact.firstName} &nbsp; {this.currentContact.lastName}</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Email ID</th>
                        <th colSpan="3">{this.currentContact.emailId}</th>
                    </tr>
                    {/* <tr>
                        <th colSpan="4">Notes</th>
                    </tr>
                    <tr>
                        <th colSpan="4">{this.currentContact.notes}</th>
                    </tr> */}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ContactView;