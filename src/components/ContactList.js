import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  console.log(props);
  const inputEl = useRef("");
  /**
   * Take id from contactCard and pass it to the App component.
   * @param {*} id
   */
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const getSearchTerm = (e) => {
    console.log(e);
    props.searchKeyword(inputEl.current.value);
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
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
