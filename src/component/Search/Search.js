import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

import style from "../styles.module.css";
export default function Search({ value, Search }) {
  const id = shortid.generate();
  return (
    <div className={style.containerSearch}>
      <label className={style.labelSearch} htmlFor={id}>
        Поиск контакта по имени
      </label>
      <input
        type="text"
        name="filter"
        value={value}
        onChange={Search}
        id={id}
        className={style.inputSearch}
      ></input>
    </div>
  );
}
Search.propTypes = {
  velue: PropTypes.string.isRequired,
  Search: PropTypes.func.isRequired,
};
