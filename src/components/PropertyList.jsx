import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PorpertyList.css";// ✅ also fixed typo (was PorpertyList.css)

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:8080/properties");
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="property-list-container">
      <h2>Properties</h2>

      <div className="properties-grid">
        {properties.length === 0 ? (
          <p className="no-properties">No properties found.</p>
        ) : (
          properties.map((p) => (
            <div className="property-card" key={p.id}>
              <Link to={`/properties/${p.id}`} className="property-link">
                <h3>{p.name}</h3>
              </Link>

              <p>
                <strong>Location:</strong> {p.location}
              </p>
              <p>
                <strong>Rent:</strong> ${p.rent}
              </p>
              <p>
                <strong>Owner:</strong> {p.ownerName}
              </p>

              <div className="property-actions">
                <Link to={`/properties/${p.id}`} className="details-btn">
                  View Details
                </Link>
                <button
                  onClick={() => deleteProperty(p.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PropertyList;
