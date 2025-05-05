import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result.products);
        setLoading(false);
      } catch (error) {
        setError(error.message); // Handle error
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div>
      {/* Do not remove the main div */}
      <h1>Fetched Products Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the data correctly */}
    </div>
  );
}

export default App;
