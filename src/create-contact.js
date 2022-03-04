import axios from "axios";
import React, { Component } from "react";

class CreateContact extends Component {

    currentId = '';
    state = {};
    currentContact = {};

    constructor(props) {
        super(props);
        this.state = { currentContact: this.props.currentContact };
        this.currentContact = this.props.currentContact;
        if (this.props.currentContact && this.props.currentContact.id) this.currentId = this.props.currentContact.id;
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                "currentContact": nextProps.currentContact
            });
            this.currentContact = nextProps.currentContact
            this.currentId = nextProps.currentContact.id;
        }
    }

    //Function to to trigger function to 
    handleContactUpdate() {
        this.props.onAddContact();
    }

    onSubmitForm(event) {
        //checking form validity if any
        if (!event.target.checkValidity()) {
            return;
        }
        this.saveContact();
        event.target.reset();
        this.setState({ currentContact: {} })
        this.currentContact = {};
    }

    //Function to update/create the contact
    saveContact() {
        //api to save
        let url = "http://localhost:3000/contacts"
        let apiMethod = 'POST'
        //The if condition is to use the PUT method to update the record using the id
        if (this.currentId !== "") {
            url += '/' + this.currentId
            apiMethod = 'PUT'
        }
        fetch(url,
            {
                method: apiMethod,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.currentContact)
            })
            .then(() => { this.handleContactUpdate(); });
    }

    //This onChange function is tobind the changes from the form to the variable
    onFormChange(event) {
        if (event.target.name === "firstname") {
            this.setState({ currentContact: { firstName: event.target.value } });
            this.currentContact.firstName = event.target.value;
        }
        if (event.target.name === "lastname") {
            this.setState({ currentContact: { lastName: event.target.value } });
            this.currentContact.lastName = event.target.value;
        }
        if (event.target.name === "email") {
            this.setState({ currentContact: { emailId: event.target.value } });
            this.currentContact.emailId = event.target.value;
        }
    }


    render() {
        return (
            <div>
                <h1 className="mt-5">Add a new contact</h1>
                <form onSubmit={(e) => this.onSubmitForm(e)}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input name="firstname" type="text" className="form-control"
                            onChange={this.onFormChange} placeholder="Enter first name" defaultValue={this.currentContact.firstName} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input name="lastname" type="text" className="form-control"
                            onChange={this.onFormChange} placeholder="Enter last name" defaultValue={this.currentContact.lastName} required />
                    </div>
                    <div className="form-group">
                        <label>Email ID</label>
                        <input name="email" className="form-control" defaultValue={this.currentContact.emailId}
                            onChange={this.onFormChange} placeholder="email@test.com" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Save contact</button>
                </form>
            </div>
        )
    }

}

export default CreateContact;