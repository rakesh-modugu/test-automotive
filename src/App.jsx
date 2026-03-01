import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import OverviewDashboard from './pages/OverviewDashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Service from './pages/Service';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route path="/app" element={<DashboardLayout />}>
          {/* Default redirect to Dashboard */}
          <Route index element={<Navigate to="/app/dashboard" replace />} />

          {/* Main Dashboard Pages */}
          <Route path="dashboard" element={<OverviewDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="service" element={<Service />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all redirect to login for invalid routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;