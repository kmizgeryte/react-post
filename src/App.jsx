// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
// import Form from './form.jsx'

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCity, setActiveCity] = useState('All');

  useEffect(() => {
    // Gaukite duomenis iš serverio įvykus komponento kraipui
    const fetchData = async () => {
      try {
        const response = await fetch("https://robust-safe-crafter.glitch.me/");
        const data = await response.json();
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Klaida gaunant duomenis iš serverio:', error);
      }
    };

    fetchData();
  }, []);

  const handleCityFilter = (city) => {
    // Filtruokite duomenis pagal pasirinktą miestą
    if (city !== 'All') {
      const filter = data.filter((item) => item.city === city);
      setFilteredData(filter);
    } else {
      setFilteredData(data);
    }

    // Nustatykite aktyvų miestą
    setActiveCity(city);
  };

  return (
    <>
    <div className='header'>
      <h1>Property List</h1>
      <p>See all the houses you want!</p>
   
      
   </div>   
      <p>Filter:</p>
      <div className="filter-section">
        <div className="cities">
          <button className={`city-btn ${activeCity === 'Vilnius' ? 'active' : ''}`} onClick={() => handleCityFilter('Vilnius')}>Vilnius</button>
          <button className={`city-btn ${activeCity === 'Kaunas' ? 'active' : ''}`} onClick={() => handleCityFilter('Kaunas')}>Kaunas</button>
          <button className={`city-btn ${activeCity === 'Klaipėda' ? 'active' : ''}`} onClick={() => handleCityFilter('Klaipėda')}>Klaipėda</button>
          <button className={`city-btn ${activeCity === 'All' ? 'active' : ''}`} onClick={() => handleCityFilter('All')}>All</button>
        </div>
        <a href="add.html" className="add-property">Add Property +</a>
      </div>
 
      <section className="cards">
        {filteredData.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.city} />
            <div className="text">
              <h3 className="price">€{item.price}</h3>
              <p className="city">{item.city}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
