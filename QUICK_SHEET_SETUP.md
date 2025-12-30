# Quick Google Sheet Setup

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it: **"Wedding RSVP Master"**

## Step 2: Create 4 Sheets (Tabs)

By default, you'll have one sheet called "Sheet1". Create 4 sheets total:

1. Rename "Sheet1" to **"Families"**
2. Click the **"+"** button at the bottom to add a new sheet, name it **"Events"**
3. Add another sheet, name it **"Responses"**
4. Add another sheet, name it **"Config"**

## Step 3: Set Up Each Sheet

### Sheet 1: Families

In the first row (header row), add these columns:

```
family_id | family_name | member_names | contact_number | events_invited | qr_url | created_at
```

**Example data (row 2):**
```
FAMILY_001 | Sharma Family | Raj, Priya, Aarav | +919876543210 | EVENT_001,EVENT_002 | | 2025-12-26
```

---

### Sheet 2: Events

In the first row (header row), add these columns:

```
event_id | event_name | event_date | event_timing | wardrobe | venue | display_order
```

**Example data (row 2):**
```
EVENT_001 | Mehendi Ceremony | 2026-01-15 16:00:00 | 4:00 PM - 7:00 PM | Traditional Indian - Bright colors, Yellow/Green preferred | Grand Ballroom, Hotel Taj | 1
```

**Example data (row 3):**
```
EVENT_002 | Wedding Ceremony | 2026-01-16 10:00:00 | 10:00 AM - 1:00 PM | Traditional Indian - Formal attire | Temple Hall | 2
```

---

### Sheet 3: Responses

In the first row (header row), add these columns:

```
response_id | family_id | family_name | event_id | event_name | attending_count | member_responses | notes | submitted_at
```

*Leave this sheet empty except for headers - responses will be added automatically when families submit RSVPs*

---

### Sheet 4: Config

In the first row (header row), add these columns:

```
key | value | description
```

**Add these config rows:**

| key | value | description |
|-----|-------|-------------|
| wedding_date | 2026-01-16 10:00:00 | Main wedding ceremony date for countdown |
| bride_name | Bride Name | Bride's name |
| groom_name | Groom Name | Groom's name |
| background_media_url | | URL to background image/video |
| site_title | Our Wedding | Page title |

---

## Step 4: Get the Sheet ID

1. Look at the URL of your Google Sheet
2. It will look like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Copy the **SHEET_ID_HERE** part (the long string between `/d/` and `/edit`)

---

## Step 5: Share with Service Account

1. Click the **"Share"** button in the top-right
2. Paste this email: `wedding-rsvp-service@wedding-rsvp-482410.iam.gserviceaccount.com`
3. Set permission to **"Editor"**
4. **Uncheck** "Notify people"
5. Click **"Share"**

---

## Step 6: Update .env.local

1. Open `/Users/darshanharia/RSVP/.env.local`
2. Find the line: `GOOGLE_SHEET_ID=""`
3. Paste your Sheet ID between the quotes: `GOOGLE_SHEET_ID="your_sheet_id_here"`
4. Update the wedding details:
   - `NEXT_PUBLIC_WEDDING_DATE` - Your wedding date
   - `NEXT_PUBLIC_BRIDE_NAME` - Bride's name
   - `NEXT_PUBLIC_GROOM_NAME` - Groom's name

---

## You're Done! ✅

Once you've completed these steps, let me know and I'll test the connection!
