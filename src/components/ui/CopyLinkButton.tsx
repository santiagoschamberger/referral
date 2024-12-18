import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CopyLinkButtonProps {
	link: string;
	className?: string;
}

export default function CopyLinkButton({ link, className = '' }: CopyLinkButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};
	const isActive = (path: string) => location.pathname === path;

	return (
		<span
			onClick={handleCopy}
			className={`flex items-center space-x-1 hover:text-gray-300 `}
			title="Copy referral link"
		>
			<Link
				to="#"
				className={`flex items-center space-x-1 hover:text-gray-300 ${isActive('/submit') ? 'text-red-400' : ''
					}`}
			>
				<span>Public URL</span>
			</Link>&nbsp;
			{copied ? (
				<CheckCircle className="h-5 w-5 text-green-500" />
			) : (
				<Copy className="h-5 w-5" />
			)}
		</span>
	);
}