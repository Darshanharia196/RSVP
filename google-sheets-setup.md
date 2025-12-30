# Google Sheets Setup Guide

This guide will help you set up Google Sheets integration for the Wedding RSVP system.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "Wedding RSVP" and click "Create"

## Step 2: Enable Google Sheets API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name it "wedding-rsvp-service"
4. Click "Create and Continue"
5. Skip optional steps and click "Done"

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - a JSON file will download

## Step 5: Extract Credentials

Open the downloaded JSON file and find:
- `private_key` - Copy this value
- `client_email` - Copy this value

Add these to your `.env.local` file:
```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="wedding-rsvp-service@your-project.iam.gserviceaccount.com"
```

## Step 6: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVP Master"
4. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
5. Add the Sheet ID to `.env.local`:
   ```env
   GOOGLE_SHEET_ID="your_sheet_id_here"
   ```

## Step 7: Share Sheet with Service Account

1. In your Google Sheet, click "Share"
2. Paste the `client_email` from your service account
3. Give it "Editor" permissions
4. Uncheck "Notify people"
5. Click "Share"

## Step 8: Set Up Sheet Structure

Create 4 sheets (tabs) in your spreadsheet:

### Sheet 1: Families
Create columns:
- family_id
- family_name
- member_names
- contact_number
- events_invited
- qr_url
- created_at

### Sheet 2: Events
Create columns:
- event_id
- event_name
- event_date
- event_timing
- wardrobe
- venue
- display_order

### Sheet 3: Responses
Create columns:
- response_id
- family_id
- family_name
- event_id
- event_name
- attending_count
- member_responses
- notes
- submitted_at

### Sheet 4: Config
Create columns:
- key
- value
- description

Add these initial config rows:
| key | value | description |
|-----|-------|-------------|
| wedding_date | 2026-01-16 10:00:00 | Main wedding ceremony date |
| bride_name | Bride Name | Bride's name |
| groom_name | Groom Name | Groom's name |
| background_media_url | | URL to background image/video |
| site_title | Our Wedding | Page title |

## Step 9: Test Connection

Run the development server:
```bash
npm run dev
```

The admin panel will attempt to connect to Google Sheets and verify the setup.

## Troubleshooting

### "Error: No key or keyFile set"
- Make sure your `.env.local` file exists
- Check that `GOOGLE_SHEETS_PRIVATE_KEY` includes the full key with `\n` characters

### "Error: The caller does not have permission"
- Verify you shared the sheet with the service account email
- Check that the service account has "Editor" permissions

### "Error: Unable to parse range"
- Make sure all 4 sheets exist in your spreadsheet
- Check that sheet names match exactly: "Families", "Events", "Responses", "Config"

## Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- Keep your service account key secure
- The service account only has access to sheets you explicitly share with it
