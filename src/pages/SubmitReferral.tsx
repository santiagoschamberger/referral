import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import { zohoService } from '../services/zoho';
import PhoneInput from '../components/PhoneInput';
import { formatPhoneNumber } from '../utils/countryData';

interface ReferralForm {
	firstName: string;
	lastName: string;
	email: string;
	company: string;
	countryCode: string;
	phoneNumber: string;
	description: string;
}

export default function SubmitReferral() {
	const { register, handleSubmit, reset, formState: { errors } } = useForm<ReferralForm>({
		defaultValues: {
			countryCode: '+1' // Default to US/Canada
		}
	});
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const onSubmit = async (data: ReferralForm) => {
		setSubmitting(true);
		setSubmitError(null);
		setSubmitSuccess(false);
	
		try {
			// Format phone number
			const formattedPhone = formatPhoneNumber(data.countryCode, data.phoneNumber);
	
			// Submit referral data
			await zohoService.submitReferral({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				company: data.company,
				phoneNumber: formattedPhone,
				description: data.description,
				title: formattedPhone,  
			});
	
			// Handle success
			setSubmitSuccess(true);
			reset();
		} catch (err) {
			// Handle errors with detailed messages
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to submit referral due to an unknown error';
			setSubmitError(errorMessage);
			console.error('Referral submission error:', err); // Log for debugging
		} finally {
			setSubmitting(false);
		}
	};
	

	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white shadow rounded-lg p-6">
				<div className="flex items-center space-x-3 mb-6">
					<Send className="h-6 w-6 text-red-500" />
					<h1 className="text-2xl font-semibold text-gray-900">Submit a Referral</h1>
				</div>

				{submitSuccess && (
					<div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
						Referral submitted successfully!
					</div>
				)}

				{submitError && (
					<div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
						{submitError}
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
								{...register('firstName', { required: 'First name is required' })}
								disabled={submitting}
							/>
							{errors.firstName && (
								<p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
							)}
						</div>

						<div>
							<label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
								{...register('lastName', { required: 'Last name is required' })}
								disabled={submitting}
							/>
							{errors.lastName && (
								<p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
							)}
						</div>
					</div>

					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
							})}
							disabled={submitting}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="company" className="block text-sm font-medium text-gray-700">
							Company
						</label>
						<input
							type="text"
							id="company"
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
							{...register('company', { required: 'Company is required' })}
							disabled={submitting}
						/>
						{errors.company && (
							<p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
						)}
					</div>

					<PhoneInput
						register={register}
						errors={errors}
						disabled={submitting}
					/>

					<div>
						<label htmlFor="description" className="block text-sm font-medium text-gray-700">
							Additional Notes
						</label>
						<textarea
							id="description"
							rows={4}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
							{...register('description')}
							disabled={submitting}
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={submitting}
							className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{submitting ? (
								<>
									<div className="animate-spin -ml-1 mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
									Submitting...
								</>
							) : (
								'Submit Referral'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}