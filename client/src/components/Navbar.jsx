

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2 position-relative">

        {/* Brand */}
        <Link
          className="navbar-brand fw-bold brand"
          to="/"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <i className="bi bi-code-slash" />
          </span>
          Peer Project Hub
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navigation */}
        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
          id="mainNav"
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink
  className="nav-link"
  to="/"
  onClick={closeMenu}
>
  <i className="bi bi-house me-1" /> Home
</NavLink>

            {/* Explore */}
            <NavLink
              className="nav-link"
              to="/"
              onClick={closeMenu}
            >
              Explore Projects
            </NavLink>

            {/* My Projects */}
            {user && (
              <NavLink
                className="nav-link"
                to="/my-projects"
                onClick={closeMenu}
              >
                My Projects
              </NavLink>
            )}

            {/* Favorites */}
            {user && (
              <NavLink
                className="nav-link"
                to="/favorites"
                onClick={closeMenu}
              >
                Favorites
              </NavLink>
            )}

            {/* Logged in */}
            {user ? (
              <>
                <NavLink
                  className="nav-link"
                  to="/profile"
                  onClick={closeMenu}
                >
                  <i className="bi bi-person-circle me-1" />
                  {user.displayName || "Profile"}
                </NavLink>

                <button
                  className="btn btn-outline-dark btn-sm ms-lg-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>

                {/* Get Started */}
                <Link
                  className="btn btn-primary btn-sm ms-lg-2"
                  to="/register"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}