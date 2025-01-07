import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Users, Video, LayoutDashboard, Send, DollarSign, Menu, X } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import CopyLinkButton from './ui/CopyLinkButton';
import { getReferralLink } from '../utils/referral';

export default function Layout() {
	const { user, logout } = useAuthStore();
	const location = useLocation();
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Use the profile hook to handle profile refresh
	useProfile();

	const isActive = (path: string) => location.pathname === path;

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const handleCompensationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!user?.compensation_link) {
			e.preventDefault();
			alert('No compensation link available. Please contact an administrator.');
		}
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const renderNavLinks = () => {
		if (user?.role === 'admin') {
			return (
				<>
					<Link
						to="/admin"
						onClick={closeMenu}
						className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/admin') ? 'text-red-400' : ''}`}
					>
						<LayoutDashboard size={20} />
						<span>Dashboard</span>
					</Link>
					<Link
						to="/admin/users"
						onClick={closeMenu}
						className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/admin/users') ? 'text-red-400' : ''}`}
					>
						<Users size={20} />
						<span>Users</span>
					</Link>
					<Link
						to="/admin/tutorials"
						onClick={closeMenu}
						className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/admin/tutorials') ? 'text-red-400' : ''}`}
					>
						<Video size={20} />
						<span>Tutorials</span>
					</Link>
				</>
			);
		}

		return (
			<>
				<Link
					to="/dashboard"
					onClick={closeMenu}
					className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/dashboard') ? 'text-red-400' : ''}`}
				>
					<LayoutDashboard size={20} />
					<span>Dashboard</span>
				</Link>
				<Link
					to="/submit"
					onClick={closeMenu}
					className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/submit') ? 'text-red-400' : ''}`}
				>
					<Send size={20} />
					<span>Submit Referral</span>
				</Link>
				{user && (
					<div onClick={closeMenu}>
						<CopyLinkButton link={getReferralLink(user)} />
					</div>
				)}
				<Link
					to="/tutorials"
					onClick={closeMenu}
					className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/tutorials') ? 'text-red-400' : ''}`}
				>
					<Video size={20} />
					<span>Tutorials</span>
				</Link>
				{user?.compensation_link ? (
					<a
						href={user.compensation_link}
						target="_blank"
						rel="noopener noreferrer"
						onClick={closeMenu}
						className="flex items-center space-x-1 hover:text-gray-300"
					>
						<DollarSign size={20} />
						<span>My Commissions</span>
					</a>
				) : (
					<button
						onClick={() => {
							alert('No compensation link available. Please contact an administrator.');
							closeMenu();
						}}
						className="flex items-center space-x-1 hover:text-gray-300 opacity-50 cursor-not-allowed"
					>
						<DollarSign size={20} />
						<span>My Commissions</span>
					</button>
				)}
			</>
		);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-[#0f172a] text-white p-4">
				<div className="container mx-auto">
					<div className="flex justify-between items-center">
						<Link to="/" className="flex items-center space-x-2">
							<div className="text-red-500">
								<LayoutDashboard size={24} />
							</div>
							<span className="text-xl font-bold">
								{user?.role === 'admin' ? 'Admin Portal' : 'Referral Portal'}
							</span>
						</Link>

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="lg:hidden text-white hover:text-gray-300"
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center space-x-6">
							{renderNavLinks()}
							<div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
								<span className="text-sm">{user?.full_name}</span>
								<button
									onClick={handleLogout}
									className="text-gray-300 hover:text-white"
								>
									<LogOut size={20} />
								</button>
							</div>
						</div>
					</div>

					{/* Mobile Navigation */}
					{isMenuOpen && (
						<div className="lg:hidden mt-4 space-y-4 border-t border-gray-700 pt-4">
							{renderNavLinks()}
							<div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-700">
								<span className="text-sm">{user?.full_name}</span>
								<button
									onClick={() => {
										handleLogout();
										closeMenu();
									}}
									className="text-gray-300 hover:text-white"
								>
									<LogOut size={20} />
								</button>
							</div>
						</div>
					)}
				</div>
			</nav>

			<main className="container mx-auto py-8 px-4">
				<Outlet />
			</main>
		</div>
	);
}