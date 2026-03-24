import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import ListaVasos from "../SearchForm/ListaVasos.jsx";
import Cadastro from "../Cadastro/Cadastro.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Jobs from "../Jobs/Jobs.jsx";
import About from "../About/About.jsx";
import NotFound from "../Notfound/Notfound.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { auth } from "../../utils/MainApi.js";
import tokenUtils from "../../utils/token.js";

function AppLayout({ isPageLoading, isMobile, handleLogout, name, email }) {
  return (
    <div className="page">
      <div className="page__content">
        <Header
          isMobile={isMobile}
          handleLogout={handleLogout}
          name={name}
          email={email}
        />
        <div className="layout">
          {!isMobile && <Navigation />}
          {isPageLoading && <i className="circle-preloader"></i>}
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 544); // true se a largura da janela do navegador for menor que 544px
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 544);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = tokenUtils.getToken();

    if (!token) {
      setIsCheckingToken(false);
      return;
    }

    auth
      .getUserProfile()
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          email: userData.email,
        });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        tokenUtils.removeToken();
        setIsLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
        });
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, []);

  useEffect(() => {
    setIsPageLoading(false);
  }, [location.pathname]);

  function handleRegistration({ name, email, password }) {
    setRegistrationError("");
    setLoginError("");

    return auth
      .register({ name, email, password })
      .then((response) => {
        if (response.token) {
          tokenUtils.setToken(response.token);

          setCurrentUser({
            name,
            email,
          });

          setIsLoggedIn(true);
          navigate("/");
          return;
        }

        navigate("/signin");
      })
      .catch((error) => {
        setRegistrationError(error.message);
        throw error;
      });
  }

  function handleLogin({ email, password }) {
    setLoginError("");

    return auth
      .login({ email, password })
      .then((response) => {
        tokenUtils.setToken(response.token);

        setCurrentUser({
          name: response.user.name,
          email: response.user.email,
        });

        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        let mensagem = "Erro ao fazer login";

        if (error instanceof TypeError && error.message === "Failed to fetch") {
          mensagem = "Servidor desconectado";
        } else if (error.message) {
          mensagem = error.message;
        }

        setLoginError(mensagem);
        throw new Error(mensagem);
      });
  }

  function handleLogout() {
    tokenUtils.removeToken();
    setIsLoggedIn(false);
    setLoginError("");
    setRegistrationError("");
    setCurrentUser({
      name: "",
      email: "",
    });
    navigate("/signin");
  }

  if (isCheckingToken) {
    return <p>Carregando...</p>;
  }

  return (
    <CurrentUserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      <Routes>
        <Route
          path="/signup"
          element={
            <Register
              handleRegistration={handleRegistration}
              registrationError={registrationError}
            />
          }
        />
        <Route
          path="/signin"
          element={<Login handleLogin={handleLogin} loginError={loginError} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout
                isPageLoading={isPageLoading}
                isMobile={isMobile}
                handleLogout={handleLogout}
                name={currentUser.name}
                email={currentUser.email}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="cadastrarVaso" element={<Cadastro />} />
          <Route path="lista" element={<ListaVasos />} />
          <Route path="empregos" element={<Jobs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}
