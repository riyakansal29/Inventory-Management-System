import React, { useState, useEffect } from 'react';
import {
  handleDelete,
  handleEdit,
  handleStartEdit,
  handleCancelEdit,
  handleSaveEdit,
} from '../../components/categoryfunc.js';

function Category(props) {
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchProducts();
  }, [props.apiUrl, props.apiKey, props.apiPassword, currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${props.apiUrl}?per_page=${perPage}&page=${currentPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${props.apiKey}:${props.apiPassword}`)}`,
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * perPage + index + 1;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = products.length === 0 || products.length < perPage;

  return (
    <div>
      <br />
      <div className="panel panel-default">
        <div className="panel-heading" id="panel-head">
          <div id="panel-margin">
            <i className="glyphicon glyphicon-th"></i>
            <strong> CATEGORIES</strong>
          </div>
        </div>
        <div className="panel-body">
          <table>
            <thead>
              <tr id="head-row">
                <th>S No.</th>
                <th>Product List</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{calculateSerialNumber(index)}</td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        className="input-field"
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
                          className="edit-button"
                          onClick={() => handleSaveEditWrapper(index)}
                        >
                          <i className="glyphicon glyphicon-ok"></i>
                        </button>
                        <button
                          className="edit-button"
                          onClick={handleCancelEditWrapper}
                        >
                          <i className="glyphicon glyphicon-remove"></i>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="action-button"
                          onClick={() => handleStartEditWrapper(index, product.name)}
                        >
                          <i className="glyphicon glyphicon-edit"></i>
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleDeleteWrapper(index)}
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
      </div>
      <br />
      <div className="pagination">
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
  );
}

export default Category;
