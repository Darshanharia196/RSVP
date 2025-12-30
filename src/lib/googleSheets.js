import { google } from 'googleapis';

/**
 * Google Sheets API Integration
 * Handles all interactions with Google Sheets for the Wedding RSVP system
 */

// Initialize Google Sheets API client
let sheets = null;
let auth = null;

/**
 * Initialize the Google Sheets API client
 */
function getAuthClient() {
  if (auth) return auth;

  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
      throw new Error('Missing Google Sheets credentials in environment variables');
    }

    // Use object-based initialization (new API)
    auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return auth;
  } catch (error) {
    console.error('Error initializing Google Sheets auth:', error);
    throw error;
  }
}

/**
 * Get Google Sheets API instance
 */
function getSheetsClient() {
  if (sheets) return sheets;

  const authClient = getAuthClient();
  sheets = google.sheets({ version: 'v4', auth: authClient });
  return sheets;
}

/**
 * Get data from a specific sheet
 * @param {string} sheetName - Name of the sheet (e.g., 'Families', 'Events')
 * @param {string} range - Range to read (e.g., 'A1:G100')
 * @returns {Promise<Array>} Array of rows
 */
export async function getSheetData(sheetName, range = 'A1:Z1000') {
  try {
    const sheetsClient = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('Missing GOOGLE_SHEET_ID in environment variables');
    }

    const response = await sheetsClient.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!${range}`,
    });

    return response.data.values || [];
  } catch (error) {
    console.error(`Error reading from sheet ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Append data to a specific sheet
 * @param {string} sheetName - Name of the sheet
 * @param {Array} values - Array of values to append
 * @returns {Promise<Object>} Response from Google Sheets API
 */
export async function appendToSheet(sheetName, values) {
  try {
    const sheetsClient = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheetsClient.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error appending to sheet ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Update data in a specific sheet
 * @param {string} sheetName - Name of the sheet
 * @param {string} range - Range to update (e.g., 'A2:G2')
 * @param {Array} values - Array of values to update
 * @returns {Promise<Object>} Response from Google Sheets API
 */
export async function updateSheetData(sheetName, range, values) {
  try {
    const sheetsClient = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheetsClient.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!${range}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating sheet ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Get all families from the Families sheet
 * @returns {Promise<Array>} Array of family objects
 */
export async function getAllFamilies() {
  try {
    const data = await getSheetData('Families');

    if (data.length === 0) return [];

    const headers = data[0];
    const rows = data.slice(1);

    return rows.map(row => {
      const family = {};
      headers.forEach((header, index) => {
        family[header] = row[index] || '';
      });
      return family;
    });
  } catch (error) {
    console.error('Error getting families:', error);
    throw error;
  }
}

/**
 * Get a specific family by ID
 * @param {string} familyId - Family ID to search for
 * @returns {Promise<Object|null>} Family object or null if not found
 */
export async function getFamilyById(familyId) {
  try {
    const families = await getAllFamilies();
    return families.find(f => f.family_id === familyId) || null;
  } catch (error) {
    console.error('Error getting family by ID:', error);
    throw error;
  }
}

/**
 * Get all events from the Events sheet
 * @returns {Promise<Array>} Array of event objects
 */
export async function getAllEvents() {
  try {
    const data = await getSheetData('Events');

    if (data.length === 0) return [];

    const headers = data[0];
    const rows = data.slice(1);

    return rows.map(row => {
      const event = {};
      headers.forEach((header, index) => {
        event[header] = row[index] || '';
      });
      return event;
    }).sort((a, b) => {
      // Sort by display_order
      return parseInt(a.display_order || 999) - parseInt(b.display_order || 999);
    });
  } catch (error) {
    console.error('Error getting events:', error);
    throw error;
  }
}

/**
 * Get events for a specific family
 * @param {string} familyId - Family ID
 * @returns {Promise<Array>} Array of event objects the family is invited to
 */
export async function getEventsForFamily(familyId) {
  try {
    const family = await getFamilyById(familyId);
    if (!family) return [];

    const allEvents = await getAllEvents();
    const invitedEventIds = family.events_invited?.split(',').map(id => id.trim()) || [];

    return allEvents.filter(event => invitedEventIds.includes(event.event_id));
  } catch (error) {
    console.error('Error getting events for family:', error);
    throw error;
  }
}

/**
 * Save RSVP response
 * @param {Object} response - Response object with family and event details
 * @returns {Promise<Object>} Response from Google Sheets API
 */
export async function saveRSVPResponse(response) {
  try {
    const timestamp = new Date().toISOString();
    const responseId = `RESP_${Date.now()}`;

    const values = [
      responseId,
      response.family_id,
      response.family_name,
      response.event_id,
      response.event_name,
      response.attending_count,
      response.member_responses,
      response.notes || '',
      timestamp,
    ];

    return await appendToSheet('Responses', values);
  } catch (error) {
    console.error('Error saving RSVP response:', error);
    throw error;
  }
}

/**
 * Get configuration value
 * @param {string} key - Configuration key
 * @returns {Promise<string|null>} Configuration value or null
 */
export async function getConfig(key) {
  try {
    const data = await getSheetData('Config');

    if (data.length === 0) return null;

    const headers = data[0];
    const rows = data.slice(1);

    const configRow = rows.find(row => row[0] === key);
    if (!configRow) return null;

    return configRow[1] || null;
  } catch (error) {
    console.error('Error getting config:', error);
    throw error;
  }
}

/**
 * Get all configuration values
 * @returns {Promise<Object>} Configuration object
 */
export async function getAllConfig() {
  try {
    const data = await getSheetData('Config');

    if (data.length === 0) return {};

    const headers = data[0];
    const rows = data.slice(1);

    const config = {};
    rows.forEach(row => {
      if (row[0]) {
        config[row[0]] = row[1] || '';
      }
    });

    return config;
  } catch (error) {
    console.error('Error getting all config:', error);
    throw error;
  }
}
