import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ProtectedRoute;