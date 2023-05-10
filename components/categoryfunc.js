const handleDelete = (products, setProducts, index) => {
  const newProducts = [...products];
  newProducts.splice(index, 1);
  setProducts(newProducts);
};

const handleEdit = (products, setProducts, index, newName) => {
  const newProducts = [...products];
  newProducts[index].name = newName;
  setProducts(newProducts);
};

const handleStartEdit = (setEditingIndex, setEditingValue, index, name) => {
  setEditingIndex(index);
  setEditingValue(name);
};

const handleCancelEdit = (setEditingIndex, setEditingValue) => {
  setEditingIndex(-1);
  setEditingValue('');
};

const handleSaveEdit = (handleEdit, setEditingIndex, setEditingValue, index, editingValue) => {
  handleEdit(index, editingValue);
  setEditingIndex(-1);
  setEditingValue('');
};

const handleAdd = async (props, products, setProducts, newCategory, setNewCategory) => {
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

export { handleDelete, handleEdit, handleStartEdit, handleCancelEdit, handleSaveEdit, handleAdd };
