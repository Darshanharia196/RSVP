/**
 * Utility functions for the Wedding RSVP system
 */

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format time for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time
 */
export function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

/**
 * Calculate days until a date
 * @param {string} dateString - ISO date string
 * @returns {number} Number of days
 */
export function daysUntil(dateString) {
    const targetDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

/**
 * Generate a unique family ID
 * @param {number} index - Family index
 * @returns {string} Family ID
 */
export function generateFamilyId(index) {
    return `FAMILY_${String(index).padStart(3, '0')}`;
}

/**
 * Generate a unique event ID
 * @param {number} index - Event index
 * @returns {string} Event ID
 */
export function generateEventId(index) {
    return `EVENT_${String(index).padStart(3, '0')}`;
}

/**
 * Parse member names from comma-separated string
 * @param {string} memberNames - Comma-separated names
 * @returns {Array<string>} Array of names
 */
export function parseMemberNames(memberNames) {
    if (!memberNames) return [];
    return memberNames.split(',').map(name => name.trim()).filter(name => name);
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export function isValidPhone(phone) {
    const phoneRegex = /^[+]?[0-9]{10,13}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitize input string
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
    if (!input) return '';
    return input.trim().replace(/[<>]/g, '');
}

/**
 * Generate QR code URL for a family
 * @param {string} familyId - Family ID
 * @param {string} baseUrl - Base URL of the site
 * @returns {string} Full RSVP URL
 */
export function generateRSVPUrl(familyId, baseUrl = 'https://your-wedding.vercel.app') {
    return `${baseUrl}/rsvp?id=${familyId}`;
}

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export function getInitials(name) {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format member responses for storage
 * @param {Object} responses - Object with member names as keys and boolean values
 * @returns {string} Formatted string like "Name1: Yes, Name2: No"
 */
export function formatMemberResponses(responses) {
    return Object.entries(responses)
        .map(([name, attending]) => `${name}: ${attending ? 'Yes' : 'No'}`)
        .join(', ');
}

/**
 * Count attending members
 * @param {Object} responses - Object with member names as keys and boolean values
 * @returns {number} Count of attending members
 */
export function countAttending(responses) {
    return Object.values(responses).filter(Boolean).length;
}
