import React, { useEffect } from 'react';

const Sales = ({ apiUrl, apiKey, apiPassword }) => {
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Basic ${btoa(`${apiKey}:${apiPassword}`)}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else if (response.status === 404) {
          console.log('Error: API endpoint not found');
        } else {
          console.log('Error fetching sales data:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchSalesData();
  }, [apiUrl, apiKey, apiPassword]);

  return null;
};

export default Sales;
