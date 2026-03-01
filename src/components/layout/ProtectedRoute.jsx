import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Mock auth check - replace with real AuthContext
 */
const isAuthenticated = () => {
  // For demo, return true to allow view. In production check AuthContext or token.
  return true;
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
