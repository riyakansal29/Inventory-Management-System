import React, { useState, useEffect } from "react";
import Logo from "/assets/logo.png";
import {
  deleteProduct,
  editProduct,
  addProduct,
  fetchProductsPage,
} from "../components/productfunc.js";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newInStock, setNewInStock] = useState("");
  const [newBuyPrice, setNewBuyPrice] = useState("");
  const [newSellingPrice, setNewSellingPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetchProductsPage(
          currentPage,
          props.apiUrl,
          props.apiKey,
          props.apiPassword
        );
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, [props.apiUrl, props.apiKey, props.apiPassword, currentPage]);

  const handleDelete = (index) => {
    deleteProduct(
      index,
      products,
      setProducts,
      props.apiUrl,
      props.apiKey,
      props.apiPassword
    );
  };

  const handleEdit = (index, newName) => {
    editProduct(index, newName, products, setProducts);
  };

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

  const handleAdd = () => {
    addProduct(
      newCategory,
      newInStock,
      newBuyPrice,
      newSellingPrice,
      setProducts,
      products,
      setNewCategory,
      setNewInStock,
      setNewBuyPrice,
      setNewSellingPrice,
      props.apiUrl,
      props.apiKey,
      props.apiPassword
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index based on the current page and the product's position
  const calculateIndex = (position) => {
    return (currentPage - 1) * 10 + position + 1;
  };

  // Filter out duplicate products based on their name
  const uniqueProducts = Array.from(
    new Set(products.map((product) => product.name))
  ).map((name) => products.find((product) => product.name === name));

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
        <br/>
<p>In Stock</p>
<input
className="add-category-input"
type="text"
placeholder="Yes/No"
value={newInStock}
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
{uniqueProducts.map((product, index) => (
<tr key={product.id}>
<td>{calculateIndex(index)}</td>
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
<td>{product.stock_quantity}</td>
<td>{product.price}</td>
<td>{product.sale_price}</td>
<td>
{editingIndex === index ? (
<div>
<button
className="add-category-btn"
onClick={() => handleSaveEdit(index)}
>
Save
</button>
<button className="add-category-btn"  onClick={handleCancelEdit}>Cancel</button>
</div>
) : (
<div>
<button
className="add-category-btn"
onClick={() => handleStartEdit(index, product.name)}
>
Edit
</button>
<button
className="add-category-btn"
onClick={() => handleDelete(index)}
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
<div className="pagination">
<button
className="add-category-btn"
onClick={() => handlePageChange(currentPage - 1)}
disabled={currentPage === 1}
>
Previous
</button>
<button
className="add-category-btn"
onClick={() => handlePageChange(currentPage + 1)}
>
Next
</button>
</div>
</div>
<br></br>
<br></br>
</div>
);
}

export default Product;
