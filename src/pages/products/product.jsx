import React, { useState, useEffect } from "react";
import {
  deleteProduct,
  editProduct,
  fetchProductsPage,
} from "../../components/productfunc.js";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [startStock, setStartStock] = useState("");
  const [endStock, setEndStock] = useState("");
  const [startSellingPrice, setStartSellingPrice] = useState("");
  const [endSellingPrice, setEndSellingPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const calculateIndex = (position) => {
    return (currentPage - 1) * 10 + position + 1;
  };

  const handleSearch = () => {
    const filtered = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const stockQuantity = product.stock_quantity;
      const startStockValue = parseInt(startStock);
      const endStockValue = parseInt(endStock);
      const sellingPrice = product.price;
      const startSellingPriceValue = parseFloat(startSellingPrice);
      const endSellingPriceValue = parseFloat(endSellingPrice);

      return (
        productName.includes(searchQuery.toLowerCase()) &&
        (!startStockValue || stockQuantity >= startStockValue) &&
        (!endStockValue || stockQuantity <= endStockValue) &&
        (!startSellingPriceValue || sellingPrice >= startSellingPriceValue) &&
        (!endSellingPriceValue || sellingPrice <= endSellingPriceValue)
      );
    });
    setFilteredProducts(filtered);
  };
  const isFirstPage = currentPage === 1;
  const isLastPage = products.length === 0 || products.length < 10;
  return (
    <div>
      <br />
      <div id="manageproduct">
        <br />
        <div className=" panel panel-default" id="margin-product">
          <div className="panel-heading" id="panel-head">
            <div id="panel-margin">
              <i className="glyphicon glyphicon-th"></i>
              <strong> PRODUCTS</strong>
            </div>
          </div>
          <div className="panel-body">
            <br />
            <table>
              <thead>
                <tr id="head-row">
                  <th>S No.</th>
                  <th>Photo</th>
                  <th>Product Title</th>
                  <th>In Stock</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(filteredProducts.length > 0
                  ? filteredProducts
                  : products
                ).map((product, index) => (
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
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td>{product.stock_status}</td>
                    <td>{product.price}</td>
                    <td>
                      {editingIndex === index ? (
                        <div>
                          <button
                            className="action-button"
                            onClick={() => handleSaveEdit(index)}
                          >
                            <i className="glyphicon glyphicon-ok"></i>
                          </button>
                          <button
                            className="action-button"
                            onClick={handleCancelEdit}
                          >
                            <i className="glyphicon glyphicon-remove"></i>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            className="action-button"
                            onClick={() => handleStartEdit(index, product.name)}
                          >
                            <i className="glyphicon glyphicon-edit"></i>
                          </button>
                          <button
                            className="action-button"
                            onClick={() => handleDelete(index)}
                          >
                            <i className="glyphicon glyphicon-trash"></i>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination" id="pagination-product">
            <button
              className={`pagination-btn ${isFirstPage ? 'disabled' : ''}`}
              disabled={isFirstPage}
              onClick={() => handlePageChange(currentPage - 1)}
              
            >
              Previous
            </button>
            <button
          className={`pagination-btn ${isLastPage ? 'disabled' : ''}`}
          disabled={isLastPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
        <div className="panel panel-default " id="search-product">
          <div className="panel-heading" id="panel-head">
            <div id="panel-margin">
              <i className="glyphicon glyphicon-th"></i>
              <strong> SEARCH PRODUCT</strong>
            </div>
          </div>
          <div className="panel-body addcategory">
            <div className="addcategory">
              <input
                type="text"
                placeholder="Search Product"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <br />
              <input
                type="number"
                placeholder="Start Stock"
                value={startStock}
                onChange={(event) => setStartStock(event.target.value)}
              />
              <input
                type="number"
                placeholder="End Stock"
                value={endStock}
                onChange={(event) => setEndStock(event.target.value)}
              />
              <br />
              <input
                type="number"
                placeholder="Start Selling Price"
                value={startSellingPrice}
                onChange={(event) => setStartSellingPrice(event.target.value)}
              />
              <input
                type="number"
                placeholder="End Selling Price"
                value={endSellingPrice}
                onChange={(event) => setEndSellingPrice(event.target.value)}
              />
            </div>
            <br />
            <button
              className="pagination-btn addcategory"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Product;
