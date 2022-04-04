import React, { useEffect, useState } from "react";
import "./style.css";

// get the locak storage data back in the list

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // adding items here
  const addItem = () => {
    if (!inputData) {
      alert("fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const MyNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, MyNewInputData]);
      setInputData("");
    }
  };

  //   HOW TO DELET TIEMS
  const deletItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // editing the existing items

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //   REMOVE ALL ITEMS
  const removeAll = () => {
    setItems([]);
  };

  // adding items to local storage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="" alt="image"></img>
            <figcaption>Add your list here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍add your items here"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            ></input>
            {toggleButton ? (
              <i class="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i class="fa fa-plus add-btn" onClick={addItem}></i>
            )}
            ;
          </div>
          {/* show items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      class="far fa-trash-alt add-btn"
                      onClick={() => deletItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CheckList</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
