import React, { useState, useEffect } from "react";
import {
  handleDelete,
  handleEdit,
  handleStartEdit,
  handleCancelEdit,
  handleSaveEdit,
  handleAdd,
} from "../components/categoryfunc.js";

function Category(props) {
  const [products, setProducts] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [props.apiUrl, props.apiKey, props.apiPassword, currentPage]);

  useEffect(() => {
    const uniqueCategories = [...new Set(products.map((product) => product.name))];
    setUniqueCategories(uniqueCategories);
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${props.apiUrl}?per_page=${perPage}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(
              `${props.apiKey}:${props.apiPassword}`
            )}`,
          },
        }
      );

      const data = await response.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteWrapper = async (index) => {
    await handleDelete(products, setProducts, index, props);
  };

  const handleStartEditWrapper = (index, name) => {
    handleStartEdit(setEditingIndex, setEditingValue, index, name);
  };

  const handleCancelEditWrapper = () => {
    handleCancelEdit(setEditingIndex, setEditingValue);
  };

  const handleEditWrapper = async (index, newName) => {
    await handleEdit(props, products, setProducts, index, newName);
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
    await handleAdd(props, products, setProducts, newCategory, setNewCategory);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * perPage + index + 1;
  };

  return (
    <div>
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
          {uniqueCategories.map((category, index) => (
            <tr key={index}>
              <td>{calculateSerialNumber(index)}</td>
<td>
{editingIndex === index ? (
<input
className="add-category-input"
type="text"
value={editingValue}
onChange={(e) => setEditingValue(e.target.value)}
/>
) : (
category
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
onClick={() => handleStartEditWrapper(index, category)}
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
<div className="pagination">
<button className="add-category-btn"
disabled={currentPage === 1}
onClick={() => handlePageChange(currentPage - 1)}
>
Previous
</button>
<button  className="add-category-btn" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
</div>
<br />
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

export default Category;
