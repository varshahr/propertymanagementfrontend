import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Property Management</h1>
        <p className="home-subtitle">
          Simplify the way you manage, monitor, and grow your properties.
        </p>
      </header>

      <section className="home-content">
        <div className="home-highlights">
          <div className="highlight-card">
            <span role="img" aria-label="magnifier">🏠</span>
            <h3>Smart Listings</h3>
            <p>Find, view, and manage houses, shops, and lands—all in one place.</p>
          </div>
          <div className="highlight-card">
            <span role="img" aria-label="calendar">📆</span>
            <h3>Automated Reminders</h3>
            <p>Never miss a rent payment or contract renewal with our smart alerts.</p>
          </div>
          <div className="highlight-card">
            <span role="img" aria-label="chat">💬</span>
            <h3>Easy Communication</h3>
            <p>Chat directly with tenants or landlords for fast updates and support.</p>
          </div>
        </div>
        <ul className="home-benefits">
          <li>✔ Intuitive dashboard for owners and tenants</li>
          <li>✔ Track rents, leases, and property performance</li>
          <li>✔ Secure, seamless access anytime</li>
        </ul>
      </section>

      <footer className="home-footer">
        <button onClick={goToLogin}>Get Started</button>
        <p className="home-footer-note">Join thousands of satisfied property owners and tenants!</p>
      </footer>
    </div>
  );
}

export default Home;
