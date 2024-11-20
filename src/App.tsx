import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: 'admin' | 'user';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
	const { isAuthenticated, user } = useAuthStore();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (requiredRole && user?.role !== requiredRole) {
		return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
	}

	return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated) {
		return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
	}

	return <>{children}</>;
}

function AppRoutes() {
	const { initialize } = useAuthStore();

	useEffect(() => {
		initialize();
	}, []);

	return (
		<Routes>
			{/* Public Routes */}
			<Route
				path="/login"
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>
			<Route
				path="/register"
				element={
					<PublicRoute>
						<Register />
					</PublicRoute>
				}
			/>

			{/* Protected Routes */}
			<Route
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}
			>
				{/* Admin Routes */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute requiredRole="admin">
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/users"
					element={
						<ProtectedRoute requiredRole="admin">
							<UserManagement />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin/tutorials"
					element={
						<ProtectedRoute requiredRole="admin">
							<TutorialManagement />
						</ProtectedRoute>
					}
				/>

				{/* User Routes */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute requiredRole="user">
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/submit"
					element={
						<ProtectedRoute requiredRole="user">
							<SubmitReferral />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/tutorials"
					element={
						<ProtectedRoute requiredRole="user">
							<Tutorials />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/compensation"
					element={
						<ProtectedRoute requiredRole="user">
							<Compensation />
						</ProtectedRoute>
					}
				/>

				{/* Root Route */}
				<Route
					path="/"
					element={
						<Navigate to="/dashboard" replace />
					}
				/>
			</Route>

			{/* Catch-all route */}
			<Route
				path="*"
				element={
					<Navigate to="/dashboard" replace />
				}
			/>
		</Routes>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<React.Suspense
				fallback={
					<div className="min-h-screen flex items-center justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
					</div>
				}
			>
				<AppRoutes />
			</React.Suspense>
		</BrowserRouter>
	);
}