import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import OverviewDashboard from './pages/OverviewDashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Service from './pages/Service';
import Settings from './pages/Settings';

// ── Protected Route Bouncer ──────────────────────────────────────────
// Checks localStorage for a logged-in user.
// Authenticated → renders child routes. Guest → kicked back to /.
const ProtectedRoute = () => {
  const user = localStorage.getItem('nexgile_user');
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public: Login / Register */}
        <Route path="/" element={<Login />} />

        {/* Protected: all /app routes guarded by ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<DashboardLayout />}>
            {/* Default redirect to dashboard */}
            <Route index element={<Navigate to="/app/dashboard" replace />} />

            {/* Main Pages */}
            <Route path="dashboard" element={<OverviewDashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="sales" element={<Sales />} />
            <Route path="service" element={<Service />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch-all: redirect any unknown URL to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;