import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header({ isMobile, handleLogout, name, email }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo do site" />
      </div>

      <div className="header-middle">
        {isLoggedIn && (
          <div>
            <p>Usuário: {name}</p>
            <p>E-mail: {email}</p>
          </div>
        )}
      </div>

      {!isMobile && (
        <nav className="header-menu">
          <ul>
            <li>
              <a href="/" onClick={handleLogout}>
                Sair
              </a>
            </li>
          </ul>
        </nav>
      )}

      {isMobile && (
        <div className="header__mobile-menu">
          <Navigation isMobile={true} handleLogout={handleLogout} />
        </div>
      )}
    </header>
  );
}
