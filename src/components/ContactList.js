import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {

  /**
   * Take id from contactCard and pass it to the App component.
   * @param {*} id
   */
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  /**
   * Render ContactCard list
   */
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler} // Get it from the ContactCard
        key={contact.id}
      />
    );
  });

  // Render ContactList layout
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to={"/add"}>
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
