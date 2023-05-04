import React from 'react'
import ReactDOM from 'react-dom/client'
import ProductList from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductList
    apiUrl='https://jaipurprint.in/wp-json/wc/v3/products'
    apiKey='ck_f5f3f13bd41f81771f46797ae2c55809fc1ceb8b'
    apiPassword='cs_f76bc3436cbe7ca53f0ece9bd31f2da32b111b41'
  />
  </React.StrictMode>,
)
