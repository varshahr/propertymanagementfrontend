import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./PropertyDetail.css";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/properties/${id}`);
      setProperty(res.data);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  const handleChatClick = () => {
    if (property && property.ownerName) {
      navigate(`/chat/${property.ownerName}`, { state: { property } });
    }
  };

  if (!property) return <p className="loading">Loading property details...</p>;

  return (
    <div className="property-details-container">
      <div className="property-card">
        <h2 className="property-title">{property.name}</h2>

        {/* ✅ Property Image */}
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.name}
            className="property-image"
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}

        {/* ✅ Property Info */}
        <div className="property-info">
          <p><strong>📍 Location:</strong> {property.location}</p>
          <p><strong>💰 Rent:</strong> ₹{property.rent}</p>
          <p><strong>👤 Owner:</strong> {property.ownerName}</p>
          <p><strong>🏠 Type:</strong> {property.type}</p>

          {property.type === "HOUSE" && (
            <>
              <p><strong>🛏 Bedrooms:</strong> {property.bedrooms}</p>
              <p><strong>🛁 Bathrooms:</strong> {property.bathrooms}</p>
            </>
          )}

          {property.area > 0 && (
            <p><strong>📏 Area:</strong> {property.area} m²</p>
          )}

          <p>
            <strong>✅ Availability:</strong>{" "}
            {property.available ? "Available" : "Not Available"}
          </p>

          {/* ✅ Description */}
          {property.description && (
            <p className="property-description">
              <strong>📝 Description:</strong> {property.description}
            </p>
          )}

          {/* ✅ Contact Section */}
          {(property.contactNumber || property.contactEmail) && (
            <div className="contact-section">
              <h3 className="contact-heading">📞 Contact Details</h3>
              {property.contactNumber && (
                <p><strong>Phone:</strong> {property.contactNumber}</p>
              )}
              {property.contactEmail && (
                <p><strong>Email:</strong> {property.contactEmail}</p>
              )}
            </div>
          )}
        </div>

        {/* ✅ Chat Button */}
        <button className="chat-btn" onClick={handleChatClick}>
          💬 Chat with Owner
        </button>

        {/* ✅ Back Button */}
        <Link to="/properties" className="back-link">
          ⬅ Back to Property List
        </Link>
      </div>
    </div>
  );
}

export default PropertyDetails;
