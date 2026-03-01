import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: 'rgba(15,23,42,0.95)',
            color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            borderRadius: '0.875rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          },
          success: { iconTheme: { primary: '#34d399', secondary: 'transparent' } },
          error: { iconTheme: { primary: '#f87171', secondary: 'transparent' } },
        }}
      />
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