import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import api from '../services/axios';
import { User } from '../types';

interface AuthResponse {
	status: string;
	message: string;
	data: {
		user: {
			uuid: string;
			full_name: string;
			email: string;
			role: string;
		};
		token: string;
	};
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	token: string | null;
	isInitialized: boolean;
	login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
	register: (fullName: string, emailAddress: string, password: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
	logout: () => void;
	initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			token: null,
			isInitialized: false,
			initialize: () => {
				const token = localStorage.getItem('token');
				const userData = localStorage.getItem('user');
				if (token && userData) {
					try {
						const user = JSON.parse(userData);
						set({ user, isAuthenticated: true, token, isInitialized: true });
					} catch {
						localStorage.removeItem('token');
						localStorage.removeItem('user');
						set({ user: null, isAuthenticated: false, token: null, isInitialized: true });
					}
				} else {
					set({ isInitialized: true });
				}
			},
			login: async (email: string, password: string) => {
				try {
					const response = await api.post<AuthResponse>('/users/login', {
						email,
						password
					});

					if (response.data.status === 'success' && response.data.data.user) {
						const { user, token } = response.data.data;
						const userData = {
							id: user.uuid,
							name: user.full_name,
							email: user.email,
							role: user.role
						};

						localStorage.setItem('token', token);
						localStorage.setItem('user', JSON.stringify(userData));

						set({
							token,
							user: userData,
							isAuthenticated: true
						});
						return { success: true, message: response.data.message };
					}

					return { success: false, message: 'Login failed' };
				} catch (error) {
					if (axios.isAxiosError(error)) {
						return {
							success: false,
							message: error.response?.data?.message || 'Invalid credentials'
						};
					}
					return { success: false, message: 'An error occurred during login' };
				}
			},
			register: async (fullName: string, emailAddress: string, password: string, confirmPassword: string) => {
				try {
					const response = await api.post<AuthResponse>('/users/register', {
						fullName,
						emailAddress,
						password,
						confirmPassword
					});

					if (response.data.status === 'success' && response.data.data.user) {
						const { user, token } = response.data.data;
						const userData = {
							id: user.uuid,
							name: user.full_name,
							email: user.email,
							role: 'user' // Default role for new registrations
						};

						localStorage.setItem('token', token);
						localStorage.setItem('user', JSON.stringify(userData));

						set({
							token,
							user: userData,
							isAuthenticated: true
						});
						return { success: true, message: response.data.message };
					}

					return { success: false, message: 'Registration failed' };
				} catch (error) {
					if (axios.isAxiosError(error)) {
						return {
							success: false,
							message: error.response?.data?.message || 'Registration failed'
						};
					}
					return { success: false, message: 'An error occurred during registration' };
				}
			},
			logout: () => {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				set({ user: null, isAuthenticated: false, token: null });
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				token: state.token
			})
		}
	)
);