import React, { useEffect, useState } from "react";
import "./App.css";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
function App() {
  const [items, setItems] = useState(getLocalItems());
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  // const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    des: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: "", des: "", id: "" });
  };

  const handleEditItem = (index, editedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = editedItem;
    setItems(updatedItems);
    setEditMode(false);
    setEditIndex(null);
    setNewItem({ name: "", des: "", id: "" });
  };

  const handleDeleteItem = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  const handleEditButtonClick = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setNewItem(items[index]);
  };
  const [search, setSearch] = useState("");

  return (
    <div className="App ">
      <h1>Add User</h1>
      <div className="form-input mt-4 col-3 me-5 container">
        <input
        className="me-5"
          placeholder="Serach By NAME ..."
          type="text"
          id="id"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="form-container ">
        <div className="form-input mt-4">
          <input
            placeholder="Enter ID"
            type="number"
            id="id"
            value={newItem.id}
            onChange={(event) =>
              setNewItem({ ...newItem, id: event.target.value })
            }
          />
        </div>
        <div className="form-input mt-4">
          <input
            placeholder="Enter Name"
            type="text"
            id="name"
            value={newItem.name}
            onChange={(event) =>
              setNewItem({ ...newItem, name: event.target.value })
            }
          />
        </div>
        <div className="form-input mt-4">
          <input
            placeholder="Enter Description"
            type="text"
            id="des"
            value={newItem.des}
            onChange={(event) =>
              setNewItem({ ...newItem, des: event.target.value })
            }
          />
        </div>

        <div className="form-button">
          {editMode ? (
            <button onClick={() => handleEditItem(editIndex, newItem)}>
              Save
            </button>
          ) : (
            <button onClick={handleAddItem}>Add</button>
          )}
        </div>
      </div>
      <ul className="item-list ">
        {items
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .map((item, index) => (
            <li key={index} className="item-container ">
              <div className="item-info row">
                <span className="item-price col">{item.id}</span>
                <span className="item-name col">{item.name}</span>
                <span className="item-quantity col">{item.des}</span>
              </div>
              <div className="item-buttons ">
                <button
                  className="edit-button col"
                  onClick={() => handleEditButtonClick(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button bg-danger col"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
