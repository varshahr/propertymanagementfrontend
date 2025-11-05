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
    imageUrl: "",        // 🆕 added for image
    description: ""      // 🆕 added for details
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
        <input
          name="name"
          placeholder="Name"
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
          placeholder="Rent"
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

        <select name="type" value={property.type} onChange={handleChange}>
          <option value="HOUSE">House</option>
          <option value="SHOP">Shop</option>
          <option value="LAND">Land</option>
        </select>

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
          placeholder="Area (m²)"
          value={property.area}
          onChange={handleChange}
        />

        {/* 🆕 Image URL input */}
        <input
          name="imageUrl"
          type="text"
          placeholder="Image URL (optional)"
          value={property.imageUrl}
          onChange={handleChange}
        />

        {/* 🆕 Description input */}
        <textarea
          name="description"
          placeholder="Description about the property"
          value={property.description}
          onChange={handleChange}
        ></textarea>

        <label className="checkbox-label">
          Available:
          <input
            type="checkbox"
            name="available"
            checked={property.available}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="submit-btn">
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
