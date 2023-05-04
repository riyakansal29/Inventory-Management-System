import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './index.css'

function ProductList(props) {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
<ProductList
    apiUrl='https://jaipurprint.in/wp-json/wc/v3/products'
    apiKey='ck_f5f3f13bd41f81771f46797ae2c55809fc1ceb8b'
    apiPassword='cs_f76bc3436cbe7ca53f0ece9bd31f2da32b111b41'
  />
)

export default ProductList;
