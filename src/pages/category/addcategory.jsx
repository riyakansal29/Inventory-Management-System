import React, { useState } from 'react';

const AddCategory = (props) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = async () => {
    try {
      const response = await fetch(props.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${props.apiKey}:${props.apiPassword}`)}`,
        },
        body: JSON.stringify({
          name: newCategory,
          slug: `${newCategory.toLowerCase().replace(/\s/g, '-')}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        props.onCategoryAdded(data);
        setNewCategory('');
      } else {
        console.error('Failed to add category');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
<div className="panel panel-default addfunc">
        <div className="panel-heading" id="panel-head">
          <div id="panel-margin">
            <i className="glyphicon glyphicon-th"></i>
            <strong> ADD CATEGORY</strong>
          </div>
        </div>
        <div className="panel-body addcategory">
      <input
       
        type="text"
        placeholder="Add Category"
        value={newCategory}
        onChange={(event) => setNewCategory(event.target.value)}
      />
      <button className=" pagination-btn addcategory" onClick={handleAdd}>
        Add
      </button>
    </div>
    </div>
  );
};

export default AddCategory;
