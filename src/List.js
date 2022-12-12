import React, { useState } from "react";
import ReadOnly from "./ReadOnly";
import { nanoid } from "nanoid";
import data from "./data.json";
import "./list.css";

const List = () => {
  const [items, setItems] = useState(data);
  const [countPressDelete, setCountPressDelete] = useState(0);
  const [countPressAdd, setCountPressAdd] = useState(0);
  const [addFormData, setAddFormData] = useState({
    title: "",
  });

  const handleAddFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      title: addFormData.title,
    };

    const newItems = [...items, newContact];
    setItems(newItems);
  };

  const handleDeleteClick = (contactId) => {
    const newItems = [...items];

    const index = items.findIndex((item) => item.id === contactId);

    newItems.splice(index, 1);

    setItems(newItems);
  };

  const del = () => {
    handleDeleteClick(items.length);
  };
  return (
    <div>
      <form>
        <div className="listHeader">count: {items.length}</div>
        {items.map((item) => (
          <div className="listItem">
            <ReadOnly item={item} />
          </div>
        ))}
      </form>
      <form
        onSubmit={handleAddFormSubmit}
        style={{ display: "flex", flexDirection: "column", width: 300 }}
      >
        <input
          type="text"
          name="title"
          required="required"
          placeholder="Название"
          onChange={handleAddFormChange}
        />
        <button type="submit">Добавить</button>
        <button type="button" onClick={() => del()}>
          Удалить
        </button>
      </form>
    </div>
  );
};
export default List;
