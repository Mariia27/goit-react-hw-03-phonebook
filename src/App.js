import React from "react";
import style from "./component/styles.module.css";
import Form from "./component/Form/Form";
import ContactList from "./component/Contact/Contact";
import Search from "./component/Search/Search";

export default class Mobile extends React.Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log("Обнова");
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const getStorageContacts = localStorage.getItem("contacts");
    const parsStorageContacts = JSON.parse(getStorageContacts);
    if (getStorageContacts) {
      this.setState({ contacts: parsStorageContacts });
    }
  }

  addContact = (contact) => {
    this.setState({
      contacts: [contact, ...this.state.contacts],
    });
  };

  veluesFilter = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  getFilter = () => {
    const { filter, contacts } = this.state;
    const filterValues = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValues)
    );
  };

  onCheckName = (newName, numbers) => {
    return this.state.contacts.some(
      ({ name }) => name === Object.values(newName).join("")
    );
  };

  deletedContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const filterContact = this.getFilter();
    return (
      <div className={style.container}>
        <h1 className={style.headingForm}>Телефонна книга</h1>
        <Form onSubmit={this.addContact} contactList={this.onCheckName} />
        <h2 className={style.contactList}>Контакти</h2>
        <Search velue={this.state.filter} Search={this.veluesFilter} />
        <ContactList
          contactList={filterContact}
          onDeleted={this.deletedContact}
        />
      </div>
    );
  }
}
