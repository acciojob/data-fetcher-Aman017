import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading data...</p>}
      {error && <p>An error occurred: {error}</p>}
      {data && (
        <>
          <h2>Data Fetched from API</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default DataFetcher;
