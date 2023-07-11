import React, { useEffect } from 'react';

const Suppliers = (props) => {
  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch(props.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${props.apiKey}:${props.apiPassword}`)}`,
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>suppliers</div>
  );
};

export default Suppliers;
