import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { useAuthStore } from './store/authStore';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const TutorialManagement = React.lazy(() => import('./pages/admin/TutorialManagement'));
const SubmitReferral = React.lazy(() => import('./pages/SubmitReferral'));
const Tutorials = React.lazy(() => import('./pages/Tutorials'));
const Compensation = React.lazy(() => import('./pages/Compensation'));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/dashboard" />;
}

function UserRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user?.role === 'user' ? <>{children}</> : <Navigate to="/admin" />;
}

export default function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/users"
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/tutorials"
              element={
                <AdminRoute>
                  <TutorialManagement />
                </AdminRoute>
              }
            />

            {/* User Routes */}
            <Route
              path="/dashboard"
              element={
                <UserRoute>
                  <Dashboard />
                </UserRoute>
              }
            />
            <Route
              path="/submit"
              element={
                <UserRoute>
                  <SubmitReferral />
                </UserRoute>
              }
            />
            <Route
              path="/tutorials"
              element={
                <UserRoute>
                  <Tutorials />
                </UserRoute>
              }
            />
            <Route
              path="/compensation"
              element={
                <UserRoute>
                  <Compensation />
                </UserRoute>
              }
            />
            
            <Route
              path="/"
              element={
                <Navigate
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  replace
                />
              }
            />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}