import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PorpertyList.css";

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await axios.get("http://localhost:8080/properties");
    setProperties(res.data);
  };

  const deleteProperty = async (id) => {
    await axios.delete(`http://localhost:8080/properties/${id}`);
    fetchProperties();
  };

  return (
    <div className="property-list-container">
      <h2>Properties</h2>
      <div className="properties-grid">
        {properties.map((p) => (
          <div className="property-card" key={p.id}>
            <Link to={`/property/${p.id}`} className="property-link">
              <h3>{p.name}</h3>
            </Link>
            <p><strong>Location:</strong> {p.location}</p>
            <p><strong>Rent:</strong> ${p.rent}</p>
            <p><strong>Owner:</strong> {p.ownerName}</p>
            <button onClick={() => deleteProperty(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
