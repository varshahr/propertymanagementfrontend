import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProperty.css";

function AddProperty() {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    name: "",
    location: "",
    rent: "",
    ownerName: "",
    type: "HOUSE",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    available: true,
    imageUrl: "",
    description: "",

    // 🆕 Contact details
    contactNumber: "",
    contactEmail: "",
    contactAddress: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/properties", property);
      navigate("/"); // navigate to property list after adding
    } catch (err) {
      console.error("Error adding property:", err);
    }
  };

  return (
    <div className="add-property-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit} className="add-property-form">
        {/* --- Basic Info --- */}
        <input
          name="name"
          placeholder="Property Name"
          value={property.name}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={property.location}
          onChange={handleChange}
          required
        />
        <input
          name="rent"
          type="number"
          placeholder="Rent Amount"
          value={property.rent}
          onChange={handleChange}
          required
        />
        <input
          name="ownerName"
          placeholder="Owner Name"
          value={property.ownerName}
          onChange={handleChange}
          required
        />

        {/* --- Type Dropdown --- */}
        <select name="type" value={property.type} onChange={handleChange}>
          <option value="HOUSE">House</option>
          <option value="SHOP">Shop</option>
          <option value="LAND">Land</option>
        </select>

        {/* --- Conditional inputs for HOUSE --- */}
        {property.type === "HOUSE" && (
          <>
            <input
              name="bedrooms"
              type="number"
              placeholder="Bedrooms"
              value={property.bedrooms}
              onChange={handleChange}
            />
            <input
              name="bathrooms"
              type="number"
              placeholder="Bathrooms"
              value={property.bathrooms}
              onChange={handleChange}
            />
          </>
        )}

        <input
          name="area"
          type="number"
          placeholder="Area (in m²)"
          value={property.area}
          onChange={handleChange}
        />

        {/* --- Image URL --- */}
        <input
          name="imageUrl"
          type="text"
          placeholder="Image URL (optional)"
          value={property.imageUrl}
          onChange={handleChange}
        />

        {/* --- Description --- */}
        <textarea
          name="description"
          placeholder="Description about the property"
          value={property.description}
          onChange={handleChange}
        ></textarea>

        {/* --- 🆕 Contact Info Section --- */}
        <h3 className="section-title">Contact Details</h3>
        <input
          name="contactNumber"
          type="tel"
          placeholder="Contact Number"
          value={property.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          name="contactEmail"
          type="email"
          placeholder="Contact Email"
          value={property.contactEmail}
          onChange={handleChange}
          required
        />
        <textarea
          name="contactAddress"
          placeholder="Full Contact Address"
          value={property.contactAddress}
          onChange={handleChange}
          rows="3"
        ></textarea>

        {/* --- Availability --- */}
        <label className="checkbox-label">
          Available:
          <input
            type="checkbox"
            name="available"
            checked={property.available}
            onChange={handleChange}
          />
        </label>

        {/* --- Submit --- */}
        <button type="submit" className="submit-btn">
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
