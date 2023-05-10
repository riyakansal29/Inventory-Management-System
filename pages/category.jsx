import React, { useState, useEffect } from "react";
import Logo from "/assets/logo.png";
import {
  handleDelete,
  handleEdit,
  handleStartEdit,
  handleCancelEdit,
  handleSaveEdit,
  handleAdd,
} from "/components/categoryfunc.js";

function Category(props) {
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(props.apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(
              `${props.apiKey}:${props.apiPassword}`
            )}`,
          },
        });

        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, [props.apiUrl, props.apiKey, props.apiPassword]);

  const handleDeleteWrapper = (index) => {
    handleDelete(products, setProducts, index, props);
  };

  const handleStartEditWrapper = (index, name) => {
    handleStartEdit(setEditingIndex, setEditingValue, index, name);
  };

  const handleCancelEditWrapper = () => {
    handleCancelEdit(setEditingIndex, setEditingValue);
  };

  const handleEditWrapper = (index, newName) => {
    handleEdit(props, products, setProducts, index, newName);
  };

  const handleSaveEditWrapper = (index) => {
    handleSaveEdit(
      handleEditWrapper,
      setEditingIndex,
      setEditingValue,
      index,
      editingValue
    );
  };

  const handleAddWrapper = async () => {
    handleAdd(props, products, setProducts, newCategory, setNewCategory);
  };

  return (
    <div>
      <div>
        <nav className="navbar">
          <div id="logo_box">
            <img id="logo" src={Logo} alt="logo" />
            <span id="logo_name">Riya Kansal</span>
          </div>
        </nav>
        <div className="content"></div>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Product List</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    className="add-category-input"
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <div>
                    <button
                      className="add-category-btn"
                      onClick={() => handleSaveEditWrapper(index)}
                    >
                      Save
                    </button>
                    <button
                      className="add-category-btn"
                      onClick={handleCancelEditWrapper}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="add-category-btn"
                      onClick={() =>
                        handleStartEditWrapper(index, product.name)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="add-category-btn"
                      onClick={() => handleDeleteWrapper(index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="addcategory">
        <input
          className="add-category-input"
          type="text"
          placeholder="Add Category"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
        />
        <button className="add-category-btn" onClick={handleAddWrapper}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Category

