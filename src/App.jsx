import React, { useState, Suspense, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import routes from "./routes";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const showLayout = location.pathname !== "/" && !location.pathname.startsWith("/login");
  
  const routeElements = useMemo(() => 
    routes.map((r) => {
      const Element = r.element;
      return r.protected ? (
        <Route
          key={r.path}
          path={r.path}
          element={<ProtectedRoute><Element /></ProtectedRoute>}
        />
      ) : (
        <Route key={r.path} path={r.path} element={<Element />} />
      );
    }), []
  );
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {showLayout && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      <div className="flex-1 w-full lg:w-auto">
        <Suspense fallback={<LoadingSpinner />}>
          {showLayout ? (
            <div className="p-4 lg:p-6">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              <div className="mt-4">
                <Routes>{routeElements}</Routes>
              </div>
            </div>
          ) : (
            <Routes>{routeElements}</Routes>
          )}
        </Suspense>
      </div>
    </div>
  );
}
