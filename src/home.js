import React, { Component } from "react";

import Contacts from "./contacts.js";
import CreateContact from "./create-contact.js";
import ContactView from "./view-contact.js";

// The main parent component with component to list, add and edit contacts
class Home extends Component {

    contacts = [];

    currentContact = {};
    state = {
        currentContact: this.currentContact,
        isView: false,
        items: []
    };

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isView: false,
            currentContent: this.currentContact,
            refresh: false
        }

        this.onAddContact = this.onAddContact.bind(this);
        this.editContact = this.editContact.bind(this);
        this.viewContact = this.viewContact.bind(this);

        this.createContact = this.createContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.getContacts = this.getContacts.bind(this);
    }

    // Function to set isView flag to true to display the seleted contact
    // Also sets the current contact which will be displayed
    viewContact(contact) {
        this.setState({
            isView: true,
            currentContact: contact
        });
        this.currentContact = contact;
        this.forceUpdate();
    }

    // This is to set the isView flag to false which triggers to display the form prepopulated with the seleted contact
    editContact(contact) {
        this.setState({
            isView: false,
            currentContact: contact
        });
        this.currentContact = contact;
    }

    //Function triggered after adding or editing a contact to fetch the data to display
    onAddContact() {
        this.getContacts();
        this.setState({ currentContact: {} });
    }

    //API to fetch all the contacts
    getContacts() {
        fetch('http://localhost:3000/contacts')
            .then(response => response.json())
            .then(data => {
                this.setState({ items: data });
            })
    }

    //API to delete the seleted contact
    deleteContact(e) {
        if (this.currentContact.id) {
            let formData = new FormData();
            formData.append("id", this.currentContact.id);
            fetch("http://localhost:3000/contacts/" + this.currentContact.id,
                {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' }
                }).then(() => {
                    this.getContacts();
                    this.setState({
                        isView: false
                    });
                });
        } else {
            alert("Please select a contact to delete");
        }
    }

    //Function used to set the current contact to null and display an empty form
    createContact(e) {
        e.preventDefault();
        this.currentContact = {};
        this.setState({ isView: false, currentContact: {} });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h1 className="mt-5">Contacts</h1>
                        <p className="lead">List of your contacts</p>
                        <Contacts editContact={this.editContact}
                            viewContact={this.viewContact}
                            refresh={this.state.refresh}
                            contacts={this.state.items}
                            createContact={this.createContact}
                            deleteContact={this.deleteContact} />
                    </div>
                    <div className="col-lg-6">
                        {!this.state.isView ?
                            <CreateContact currentContact={this.currentContact}
                                refresh={this.state.refresh}
                                onAddContact={this.onAddContact} /> :
                            <ContactView currentContact={this.currentContact} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;