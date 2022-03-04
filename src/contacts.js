import React, { Component } from "react";

class Contacts extends Component {
    state = {};
    constructor(props) {
        super(props);

        this.state = { 
            items: this.props.contacts,
            viewContact : this.props.viewContact
        };
        this.getContacts();
    }

    listFlow = {
        overflow: "auto",
        maxHeight: "500px"
    };

    getContacts() {
        fetch('http://localhost:3000/contacts')
            .then(response => response.json())
            .then(data => {
                this.setState({ items: data });
            })
    }

    render() {
        return (
            <div style={this.listFlow}>
                <p>
                    <a href="" onClick={this.props.createContact}><i className="fa fa-plus"></i>&nbsp;Create Contact</a>
                    &nbsp; <a href="" onClick={this.props.deleteContact}><i className="fa fa-trash"></i>&nbsp;Delete contact</a>
                </p>
                <ul className="list-group">
                    {this.state.items.map(listItem => (
                        <div key={listItem.id} className="list-group-item">
                            <div>
                                <i className="fa fa-user"></i> {listItem.firstName} {listItem.lastName} </div>
                            <div>
                                <span className="float-left"> {listItem.emailId ? listItem.emailId : ''}  </span>
                                <button onClick={() => { this.props.viewContact(listItem); }} className="btn btn-primary btn-sm float-right fa fa-eye">View</button>
                                <button onClick={() => { this.props.editContact(listItem); }} className="btn btn-primary btn-sm float-right fa fa-pencil">Edit</button>
                            </div>

                        </div>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Contacts;