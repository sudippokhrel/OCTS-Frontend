import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user,loading } = useUserAuth();

  console.log("Check user in Private: ", user);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching user state
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ProtectedRoute;