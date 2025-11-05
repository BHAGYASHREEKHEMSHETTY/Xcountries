import React, { useEffect, useState } from "react";

const CountryCard = ({ name, flag, abbr }) => {
  return (
    <div className="country-card">
      <img src={flag} alt={name} />
      <h3>{name}</h3>
      <p>{abbr}</p>
    </div>
  );
};

const API_ENDPOINT = "https://xcountries-backend.labs.crio.do/all";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Failed to load countries</div>;
  }

  if (countries.length === 0 && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="countries-list">
      {countries.map(({ name, flag, abbr }) => (
        <CountryCard key={abbr} name={name} flag={flag} abbr={abbr} />
      ))}
    </div>
  );
}