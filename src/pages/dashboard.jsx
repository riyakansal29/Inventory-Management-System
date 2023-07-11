import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl, apiKey, apiPassword } from '../api.js';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/products?page=${currentPage}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
            },
          }
        );
        setProducts(response.data);
        setTotalPages(Number(response.headers['x-wp-totalpages']));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products?per_page=1`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
          },
        });
        setTotalProducts(Number(response.headers['x-wp-total']));
      } catch (error) {
        console.error('Error fetching total number of products:', error);
      }
    };

    fetchTotalProducts();
  }, []);

  useEffect(() => {
    const fetchTotalCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/categories`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
          },
        });
        const totalCategories = response.headers['x-wp-total'];
        setTotalCategories(Number(totalCategories));
      } catch (error) {
        console.error('Error fetching total number of categories:', error);
      }
    };

    fetchTotalCategories();
  }, []);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get(`${apiUrl}/atum/dashboard/sales?period=month`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
          },
        });
        const totalSales = response.data[0].data.value;
        setTotalSales(totalSales);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    fetchTotalSales();
  }, []);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/atum/dashboard/orders?period=this_month`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
          },
        });
        const totalOrders = response.data[0].data.orders;
        setTotalOrders(totalOrders);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    fetchTotalOrders();
  }, []);

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Total Products: {totalProducts}</h2>
      <h2>Total Categories: {totalCategories}</h2>
      <h2>Total Sales: {totalSales}</h2>
      <h2>Total Orders: {totalOrders}</h2>
    </div>
  );
};

export default ProductList;
