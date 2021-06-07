import React from "react";
import swal from 'sweetalert';

// Use class to practice
class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  /**
   * On click Add button will add a new contact to ContactList
   * @param {Element} e 
   * @returns 
   */
  add = (e) => {
    e.preventDefault();

    if (this.state.name === "" || this.state.email === "") {
      swal("Oops!", "All the fields are mandatory!", "error");
      return;
    }
    // Send the new contact to App.js (Parent)
    this.props.addContactHandler(this.state);
    // Clean field by set empty state
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };

  //* ********************************************************************************** */
  //* ***************************** Render AddContact component ************************ */
  //* ********************************************************************************** */
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button green">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
