import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./PropertyDetail.css";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    const res = await axios.get(`http://localhost:8080/properties/${id}`);
    setProperty(res.data);
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details-container">
      <h2>{property.name}</h2>
      {property.imageUrl && (
        <img src={property.imageUrl} alt={property.name} className="property-image" />
      )}
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Owner:</strong> {property.ownerName}</p>
      <p><strong>Rent:</strong> ${property.rent}</p>
      <p><strong>Description:</strong> {property.description}</p>

      <Link to="/">⬅ Back to List</Link>
    </div>
  );
}

export default PropertyDetails;
