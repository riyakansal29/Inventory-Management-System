const handleDelete = async (products, setProducts, index, props) => {
  try {
    const productId = products[index].id;
    const response = await fetch(`${props.apiUrl}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${props.apiKey}:${props.apiPassword}`
        )}`,
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

const handleEdit = async (props, products, setProducts, index, newName) => {
  try {
    const productId = products[index].id;
    const response = await fetch(`${props.apiUrl}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${props.apiKey}:${props.apiPassword}`
        )}`,
      },
      body: JSON.stringify({ name: newName }),
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

const handleStartEdit = (setEditingIndex, setEditingValue, index, name) => {
  setEditingIndex(index);
  setEditingValue(name);
};

const handleCancelEdit = (setEditingIndex, setEditingValue) => {
  setEditingIndex(-1);
  setEditingValue("");
};

const handleSaveEdit = (
  handleEdit,
  setEditingIndex,
  setEditingValue,
  index,
  editingValue,
) => {
  handleEdit(index, editingValue);
  setEditingIndex(-1);
  setEditingValue("");
};

const handleAdd = async (
  props,
  products,
  setProducts,
  newCategory,
  setNewCategory,
) => {
  try {
    const response = await fetch(props.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${props.apiKey}:${props.apiPassword}`
        )}`,
      },
      body: JSON.stringify({ name: newCategory }),
    });

    const data = await response.json();
    setProducts([...products, data]);
    setNewCategory("");
  } catch (error) {
    console.error(error);
  }
};

export {
  handleDelete,
  handleEdit,
  handleStartEdit,
  handleCancelEdit,
  handleSaveEdit,
  handleAdd,
};
