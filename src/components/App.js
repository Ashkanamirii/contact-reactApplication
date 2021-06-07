import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import api from "../Api/contact.js";

function App() {
  // Key for storing contact on the localStorage
  const LOCAL_STORAGE_KEY = "contacts";
  // Contacts state from the react hooks
  const [contacts, setContacts] = useState([]);

  // Retrieve contact list
  const retrieveContacts = async () => {
    const response = await api.get("/get");
    return response.data;
  };

  /**
   * Get new contact from AddContact after click on the
   * add btn and update the state by setContacts
   * @param {Object} contact
   */
  const addContactHandler = async (contact) => {
    const request = {
      ...contact,
    };

    const response = await api.post("/add", request);

    // Clone the array by ...contacts
    // First element is oldArray and
    //second element is newArray that will be append to arrayList
    setContacts([...contacts, response.data]);
  };

  /**
   *
   * @param {Integer} id
   */
  const removeContactHandler = (id) => {
    // copy of the contact list and filter out the contact by id
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    // change the contact state
    setContacts(newContactList);
  };

  // Set the contacts after reloading the page
  useEffect(() => {
    // const retrieveContacts = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (retrieveContacts) setContacts(retrieveContacts);

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  // whenever the value changes the use effect help us to render the component again.
  // arrow function () => {}
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // React application DOM
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(
              props //this is better than below
            ) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          <Route path="/contact/:id" component={ContactDetail}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
