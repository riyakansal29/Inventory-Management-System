import React, { useState } from 'react';

const AddProduct = (props) => {
  const [newCategory, setNewCategory] = useState("");
  const [newInStock, setNewInStock] = useState("");
  const [newSellingPrice, setNewSellingPrice] = useState("");

  const handleAdd = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
        },
        body: JSON.stringify({
          name: newCategory,
          inStock: newInStock,
          sellingPrice: newSellingPrice,
        }),
      });
  
      const data = await response.json();
      setProducts([...products, data]);
      setNewCategory("");
      setNewInStock("");
      setNewSellingPrice("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className="panel panel-default addfunc">
        <div className="panel-heading" id="panel-head">
          <div id="panel-margin">
            <i className="glyphicon glyphicon-th"></i>
            <strong> ADD PRODUCT</strong>
          </div>
        </div>
        <div className="panel-body addcategory">
        <div className="addcategory">
<p>Product Title</p>
<input
  
  type="text"
  placeholder="Add Category"
  value={newCategory}
  onChange={(event) => setNewCategory(event.target.value)}
/>
<br />
<br/>
<p>In Stock</p>
<input
 
  type="text"
  placeholder="Yes/No"
  value={newInStock}
  onChange={(event) => setNewInStock(event.target.value)}
/>
<br/>
<br/>
<p>Selling Price</p>
<input
  
  type="text"
  placeholder="Add Selling Price"
  value={newSellingPrice}
  onChange={(event) => setNewSellingPrice(event.target.value)}
/>
<br />
<br />
<button className=" pagination-btn addcategory" onClick={handleAdd}>
  Add
</button>
</div>
    </div>
    </div>
  );
};

export default AddProduct;
