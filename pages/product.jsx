import React, { useState, useEffect } from "react";
import Logo from "/assets/logo.png";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newInStock, setNewInStock] = useState("");
  const [newBuyPrice, setNewBuyPrice] = useState("");
  const [newSellingPrice, setNewSellingPrice] = useState("");

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
  const [editingValue, setEditingValue] = useState("");

  const handleStartEdit = (index, name) => {
    setEditingIndex(index);
    setEditingValue(name);
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditingValue("");
  };

  const handleSaveEdit = (index) => {
    handleEdit(index, editingValue);
    setEditingIndex(-1);
    setEditingValue("");
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
      body: JSON.stringify({
        name: newCategory,
        inStock: newInStock,
        buyPrice: newBuyPrice,
        sellingPrice: newSellingPrice,
      }),
    });

    const data = await response.json();
    setProducts([...products, data]);
    setNewCategory("");
    setNewInStock("");
    setNewBuyPrice("");
    setNewSellingPrice("");
  } catch (error) {
    console.error(error);
  }
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
      <div className="addcategory">
        <p>Product Title</p>
        <input
          className="add-category-input"
          type="text"
          placeholder="Add Category"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
        />
        <br />
        <p>In Stock</p>
        <input
          className="add-category-input"
          type="text"
          placeholder="Yes/No"

          onChange={(event) => setNewInStock(event.target.value)}
        />
        <p>Buy Price</p>
        <input
          className="add-category-input"
          type="text"
          placeholder="Add Buying Price"
          value={newBuyPrice}
          onChange={(event) => setNewBuyPrice(event.target.value)}
        />
        <p>Selling Price</p>
        <input
          className="add-category-input"
          type="text"
          placeholder="Add Selling Price"
          value={newSellingPrice}
          onChange={(event) => setNewSellingPrice(event.target.value)}
        />
        <br />
        <br />
        <button className="add-category-btn" onClick={handleAdd}>
          Add
        </button>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Photo</th>
            <th>Product Title</th>
            <th>In Stock</th>
            <th>Buy Price</th>
            <th>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                {product.images.length > 0 && (
                  <img src={product.images[0].src} alt="product" />
                )}
              </td>
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
              {/* <td>{product.atum_stock_status ? "Yes" : "No"}</td> */}
              <td>{product.stock_quantity}</td>
              <td>{product.price ? product.price : "Not for sale"}</td>
              <td>{product.sale_price}</td>
              <td>
                {editingIndex === index ? (
                  <div>
                    <button className="add-category-btn" onClick={() => handleSaveEdit(index)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button className="add-category-btn" onClick={() => handleStartEdit(index, product.name)}>
                      Edit
                    </button>
                    <button className="add-category-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
}

export default Product;

