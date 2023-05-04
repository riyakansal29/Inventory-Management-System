import React, { useState, useEffect } from "react";
import './App.css'
import Logo from './assets/logo.png'

function ProductList(props) {
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");

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
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, [props.apiUrl, props.apiKey, props.apiPassword]);

  const handleDelete = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleEdit = (index, newName) => {
    const newProducts = [...products];
    newProducts[index].name = newName;
    setProducts(newProducts);
  };

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState('');

  const handleStartEdit = (index, name) => {
    setEditingIndex(index);
    setEditingValue(name);
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditingValue('');
  };

  const handleSaveEdit = (index) => {
    handleEdit(index, editingValue);
    setEditingIndex(-1);
    setEditingValue('');
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${props.apiKey}:${props.apiPassword}`
          )}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      const data = await response.json();
      setProducts([...products, data]);
      setNewCategory("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>    
      <div>
    <nav className="navbar">
    <div id = "logo_box"><img id = "logo" src = {Logo} alt = 'logo'></img><span id = "logo_name">Riya Kansal</span></div>
    </nav>
    <div className="content">
    </div>
  </div>
  <br></br>
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
                <input class ="add-category-input"
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
                  <button class="add-category-btn" onClick={() => handleSaveEdit(index)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <button class="add-category-btn" onClick={() => handleStartEdit(index, product.name)}>
                    Edit
                  </button>
                  <button class="add-category-btn" onClick={() => handleDelete(index)}>Delete</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <br></br>
    <div id ="addcategory">
    <input class="add-category-input"
          type="text"
          placeholder="Add Catogory"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
        />
        <button class ="add-category-btn" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default ProductList;
