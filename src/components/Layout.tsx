import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Users, Video, LayoutDashboard, Send, DollarSign } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import CopyLinkButton from './ui/CopyLinkButton';
import { getReferralLink } from '../utils/referral';

export default function Layout() {
	const { user, logout } = useAuthStore();
	const location = useLocation();
	const navigate = useNavigate();

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

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-[#0f172a] text-white p-4">
				<div className="container mx-auto flex justify-between items-center">
					<Link to="/" className="flex items-center space-x-2">
						<div className="text-red-500">
							<LayoutDashboard size={24} />
						</div>
						<span className="text-xl font-bold">
							{user?.role === 'admin' ? 'Admin Portal' : 'Referral Portal'}
						</span>
					</Link>

					<div className="flex items-center space-x-6">
						{user?.role === 'admin' ? (
							<>
								<Link
									to="/admin"
									className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/admin') ? 'text-red-400' : ''
										}`}
								>
									<LayoutDashboard size={20} />
									<span>Dashboard</span>
								</Link>
								<Link
									to="/admin/users"
									className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/admin/users') ? 'text-red-400' : ''
										}`}
								>
									<Users size={20} />
									<span>Users</span>
								</Link>
								<Link
									to="/admin/tutorials"
									className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/admin/tutorials') ? 'text-red-400' : ''
										}`}
								>
									<Video size={20} />
									<span>Tutorials</span>
								</Link>
							</>
						) : (
							<>
								<Link
									to="/dashboard"
									className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/dashboard') ? 'text-red-400' : ''
										}`}
								>
									<LayoutDashboard size={20} />
									<span>Dashboard</span>
								</Link>
								<Link
									to="/submit"
									className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/submit') ? 'text-red-400' : ''
										}`}
								>
									<Send size={20} />
									<span>Submit Referral</span>
								</Link>
								{user && (
									<CopyLinkButton link={getReferralLink(user)} />
								)}
								<Link
									to="/tutorials"
									className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/tutorials') ? 'text-red-400' : ''
										}`}
								>
									<Video size={20} />
									<span>Tutorials</span>
								</Link>
								{user?.compensation_link ? (
									<a
										href={user.compensation_link}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center space-x-1 hover:text-gray-300"
									>
										<DollarSign size={20} />
										<span>My Commissions</span>
									</a>
								) : (
									<button
										onClick={() => alert('No compensation link available. Please contact an administrator.')}
										className="flex items-center space-x-1 hover:text-gray-300 opacity-50 cursor-not-allowed"
									>
										<DollarSign size={20} />
										<span>My Commissions</span>
									</button>
								)}
							</>
						)}
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
			</nav>

			<main className="container mx-auto py-8 px-4">
				<Outlet />
			</main>
		</div>
	);
}