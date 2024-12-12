export function getDateRanges() {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const previousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1, lastMonth.getDate());

  return {
    now,
    lastMonth,
    previousMonth
  };
}

export function isInDateRange(date: string, start: Date, end: Date): boolean {
  const dateObj = new Date(date);
  return dateObj >= start && dateObj <= end;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // For dates within the last 7 days, show relative time
  if (diffDays < 7) {
    if (diffDays === 0) {
      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diffTime / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }

  // For dates in the current year, omit the year
  const isCurrentYear = date.getFullYear() === now.getFullYear();
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: isCurrentYear ? undefined : 'numeric'
  };

  return date.toLocaleDateString('en-US', options);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  return date.toLocaleString('en-US', options);
}

export function getRelativeTimeString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}w ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}mo ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}y ago`;
  }
}

export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: start.getFullYear() !== end.getFullYear() ? 'numeric' : undefined
  };

  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
}

export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function isYesterday(dateString: string): boolean {
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}


export function formatDateForAPI(date: string | Date): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

export function getDateRangeForPeriod(period: string): { startDate: Date; endDate: Date } {
  const now = new Date();
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  
  switch (period) {
    case 'ytd': {
      const startDate = new Date(now.getFullYear(), 0, 1);
      return { startDate, endDate };
    }
    case 'mtd': {
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      return { startDate, endDate };
    }
    case 'last30': {
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 30);
      return { startDate, endDate };
    }
    case 'last90': {
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 90);
      return { startDate, endDate };
    }
    default:
      return { startDate: new Date(0), endDate };
  }
}