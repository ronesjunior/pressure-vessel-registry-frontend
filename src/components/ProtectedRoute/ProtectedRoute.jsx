import { Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />; // se isLoggedIn for true vai para a página /signin e termina a function
  }
  return children; // o children é o Applayout
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};
