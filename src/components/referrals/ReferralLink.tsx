import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import CopyLinkButton from '../ui/CopyLinkButton';

interface ReferralLinkProps {
  link: string;
  className?: string;
  showLabel?: boolean;
}

export default function ReferralLink({ link, className = '', showLabel = true }: ReferralLinkProps) {
  return (
    <div className={`${className}`}>
      {showLabel && (
        <h2 className="text-lg font-medium text-gray-900 mb-2">Your Referral Link</h2>
      )}
      <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
        <LinkIcon className="h-5 w-5 text-gray-400" />
        <span className="flex-1 text-gray-600 font-mono text-sm">{link}</span>
        <CopyLinkButton link={link} />
      </div>
      {showLabel && (
        <p className="mt-2 text-sm text-gray-500">
          Share this link with potential referrals to track your submissions
        </p>
      )}
    </div>
  );
}