import React, { useState } from "react";
import axios from "axios";
import "./AddProperty.css";

function AddProperty({ onAdd }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || !rent || !ownerName) return;

    const newProperty = {
      name,
      location,
      rent: Number(rent),
      ownerName,
      description,
      imageUrl,
    };

    await axios.post("http://localhost:8080/properties", newProperty);
    setName("");
    setLocation("");
    setRent("");
    setOwnerName("");
    setDescription("");
    setImageUrl("");
    onAdd(); // refresh list
  };

  return (
    <div className="add-property-container">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Property Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Rent"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
