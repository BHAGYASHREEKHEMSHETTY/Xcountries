import React, { useEffect, useState } from "react";

// ✅ CountryCard component
const CountryCard = ({ name, flag, abbr }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img
        src={flag}
        alt={`Flag of ${abbr}`}
        style={{ width: "100px", height: "100px", borderRadius: "5px" }}
      />
      <p>{name}</p>
    </div>
  );
};

// ✅ API endpoint
const API_ENDPOINT = "https://xcountries-backend.labs.crio.do/all";

export default function Countries() {
  const [countries, setCountries] = useState([]);

  // ✅ Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Render country cards
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {countries.map(({ name, flag, abbr }) => (
        <CountryCard key={abbr} name={name} flag={flag} abbr={abbr} />
      ))}
    </div>
  );
}
