import React, { useEffect, useState } from "react";
import todoIcon from "../images/download (2).png";
import { FormControl } from "react-bootstrap";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function Todo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);

  const addItem = () => {
    if (!inputData) {
      alert("Fill the data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  const deleteItem = (index) => {
    const deletedItem = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(deletedItem);
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    // console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };
  // search..............
  const [search, setSearch] = useState("");
  console.log(search);
  // serach..............

  return (
    <>
      <div className="  mainDiv  justify-content-center  align-items-center">
        <div className="childDiv">
          <figure className="iconImg">
            <img src={todoIcon} alt="Icon" className="w-25 todoIcon" />
            <figcaption className="text-light mt-3">Add User List</figcaption>
          </figure>
          <div className="w-75 serachDiv">
            <inputGroup>
              <FormControl
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Serach"
              ></FormControl>
            </inputGroup>
          </div>
          <br />
          <div className="addItem ">
            <input
              className="w-75"
              type="text"
              placeholder="write Add Item"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            {toggleSubmit ? (
              <button onClick={addItem} className="w-75">
                Add{" "}
              </button>
            ) : (
              <button className="w-75" onClick={addItem}>
                Update Item
              </button>
            )}
          </div>
          {items
            .filter((elem) => {
              return search.toLowerCase() === ""
                ? elem
                : elem.name.toLowerCase().includes(search);
            })
            .map((elem) => {
              return (
                <div className="showitem w-75 " key={elem.id}>
                  <h4>{elem.name}</h4>
                  <button className="w-50 " onClick={() => editItem(elem.id)}>
                    Edit
                  </button>
                  <button className="w-50 " onClick={() => deleteItem(elem.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Todo;
