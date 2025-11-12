import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AddProperty from "./components/AddProperty";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";
import ChatPage from "./components/ChatPage"; // ✅ New ChatPage import
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh((prev) => !prev);

  return (
    <Router>
      <header className="header-bar">
        <h1 className="main-title">
          <span role="img" aria-label="building">🏢</span> Property Management System
        </h1>
        <nav className="nav-bar">
          {loggedIn ? (
            <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/properties" className="nav-link">Properties</Link>
              <Link to="/add" className="nav-link">Add Property</Link>
              <button
                className="nav-link nav-logout"
                onClick={() => setLoggedIn(false)}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link nav-login">Login</Link>
          )}
        </nav>
      </header>

      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />

        {/* Property List */}
        <Route
          path="/properties"
          element={
            loggedIn ? (
              <PropertyList key={refresh} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Property Details */}
        <Route
          path="/properties/:id"
          element={
            loggedIn ? (
              <PropertyDetails />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Add Property */}
        <Route
          path="/add"
          element={
            loggedIn ? (
              <AddProperty onAdd={handleRefresh} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ Chat Page Route */}
        <Route
          path="/chat/:ownerName"
          element={
            loggedIn ? (
              <ChatPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
