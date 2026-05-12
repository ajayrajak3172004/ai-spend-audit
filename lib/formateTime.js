/**
 * Formats a date string or object into "Month DD, YYYY h:mm A"
 * Example: May 11, 2026 10:58 PM
 */
export const formatDateTime = (dateInput) => {
  if (!dateInput) return "N/A";

  const date = new Date(dateInput);

  // Check if date is valid
  if (isNaN(date.getTime())) return "Invalid Date";

  // Date part: May 11, 2026
  const dateOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  // Time part: 10:58 PM
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

  return `${formattedDate} ${formattedTime}`;
};