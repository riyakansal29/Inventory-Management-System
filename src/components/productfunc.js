export const fetchProductsPage = async (page, apiUrl, apiKey, apiPassword) => {
  try {
    const response = await fetch(`${apiUrl}?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch products");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteProduct = async (index, products, setProducts, apiUrl, apiKey, apiPassword) => {
  try {
    const productId = products[index].id;
    const response = await fetch(`${apiUrl}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
      },
    });

    if (response.ok) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    } else {
      console.error("Failed to delete product");
    }
  } catch (error) {
    console.error(error);
  }
};
export const editProduct = async (index, newName, products, setProducts, apiUrl, apiKey, apiPassword) => {
  try {
    const productId = products[index].id;
    const response = await fetch(`${apiUrl}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
      },
      body: JSON.stringify({
        name: newName,
        // Include other updated properties as needed
      }),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      const newProducts = [...products];
      newProducts[index] = updatedProduct;
      setProducts(newProducts);
    } else {
      console.error("Failed to update product");
    }
  } catch (error) {
    console.error(error);
  }
};


export const addProduct = async (
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
  apiUrl,
  apiKey,
  apiPassword
) => {
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
