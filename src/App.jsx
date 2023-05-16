import React from 'react'
import Category from './pages/category.jsx'
import Product from './pages/product.jsx'
import './App.css'
const App = () => {
  return (
    <Category
    apiUrl='https://jaipurprint.in/wp-json/wc/v3/products/categories'
    apiKey='ck_f5f3f13bd41f81771f46797ae2c55809fc1ceb8b'
    apiPassword='cs_f76bc3436cbe7ca53f0ece9bd31f2da32b111b41'
    />
    // <Product
    // apiUrl='https://jaipurprint.in/wp-json/wc/v3/products'
    // apiKey='ck_f5f3f13bd41f81771f46797ae2c55809fc1ceb8b'
    // apiPassword='cs_f76bc3436cbe7ca53f0ece9bd31f2da32b111b41'
    // />
  )
}

export default App