import React, { Component } from "react";
import shortid from "shortid";
import style from "../styles.module.css";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };
  handleInputValues = (evt) => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };
  addContact = (evt) => {
    evt.preventDefault();
    const checkName = this.props.contactList({ name: this.state.name });
    if (checkName) {
      alert("this name is aready exist");

      return;
    }

    this.props.onSubmit({
      id: shortid.generate(),
      name: this.state.name,
      number: this.state.number,
    });
    this.resetInputValues();
  };

  resetInputValues = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const idName = shortid.generate();
    const idNumber = shortid.generate();
    return (
      <form className={style.form} onSubmit={this.addContact}>
        <label htmlFor={idName} className={style.labelName}>
          Name
        </label>
        <input
          id={idName}
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputValues}
          autoComplete="off"
        ></input>
        <label htmlFor={idNumber} className={style.labelNumber}>
          Number
        </label>
        <input
          id={idNumber}
          type="tel"
          pattern="^[ 0-9]+$"
          name="number"
          value={this.state.number}
          onChange={this.handleInputValues}
          autoComplete="off"
        ></input>
        <button className={style.btnForm} type="submite">
          Add contact
        </button>
      </form>
    );
  }
}
export default Form;
