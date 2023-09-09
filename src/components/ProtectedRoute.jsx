import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children}) => {
  const { user,loading } = useUserAuth();

  console.log("Check user in Private: ", user);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching user state
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role is allowed to access the route
  // if (!allowedRoles.includes(user.role)) {
  //   return <Navigate to="/permission-denied" />;
  // }

  return children;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    //allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Define allowedRoles as an array of role names
  };

export default ProtectedRoute;