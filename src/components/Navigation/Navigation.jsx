import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation({ isMobile = false, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideMenu = event.target.closest(".mobile-nav");

      if (!clickedInsideMenu) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-nav">
        <button
          type="button"
          className="mobile-nav__toggle"
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {isMenuOpen && (
          <ul className="mobile-nav__list">
            <li>
              <NavLink
                to="/"
                className="mobile-nav__link"
                onClick={handleCloseMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/cadastrarVaso" className="mobile-nav__link">
                Cadastrar Vaso
              </NavLink>
            </li>
            <li>
              <NavLink to="/lista" className="mobile-nav__link">
                Lista dos vasos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/empregos"
                className="mobile-nav__link"
                onClick={handleCloseMenu}
              >
                Empregos
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="mobile-nav__link">
                About
              </NavLink>
            </li>
            <li>
              <a
                href="/signin"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="mobile-nav__link"
              >
                Sair
              </a>
            </li>
            <li>
              <NavLink
                to="/about"
                className="mobile-nav__link"
                onClick={handleCloseMenu}
              ></NavLink>
            </li>
          </ul>
        )}
      </div>
    );
  }

  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <ul className="sidebar__list">
        <li>
          <NavLink to="/" className="sidebar__link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cadastrarVaso" className="sidebar__link">
            Cadastrar Vaso
          </NavLink>
        </li>
        <li>
          <NavLink to="/lista" className="sidebar__link">
            Lista dos vasos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/empregos"
            className="mobile-nav__link"
            onClick={handleCloseMenu}
          >
            Empregos
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="sidebar__link">
            About
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
