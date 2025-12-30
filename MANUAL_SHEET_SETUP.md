# Manual Google Sheet Setup

Since you already have the sheet created, here's what you need to add manually:

## IMPORTANT: First, share the sheet!

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1IPlET9rMF2m6jt9SF66nuIRr5aBpxqB2tAHP3Qnw9G4/edit
2. Click "Share" button
3. Add this email: `wedding-rsvp-service@wedding-rsvp-482410.iam.gserviceaccount.com`
4. Set permission to "Editor"
5. Uncheck "Notify people"
6. Click "Share"

## Then add these headers to each sheet:

### Sheet 1: Families
Copy and paste this into row 1:
```
family_id	family_name	member_names	contact_number	events_invited	qr_url	created_at
```

### Sheet 2: Events
Copy and paste this into row 1:
```
event_id	event_name	event_date	event_timing	wardrobe	venue	display_order
```

Then add these sample events (rows 2-5):
```
EVENT_001	Mehendi Ceremony	2026-01-15 16:00:00	4:00 PM - 7:00 PM	Traditional Indian - Bright colors, Yellow/Green preferred	Grand Ballroom, Hotel Taj	1
EVENT_002	Sangeet Night	2026-01-15 19:00:00	7:00 PM - 11:00 PM	Indo-Western, Cocktail attire	Garden Lawn, Hotel Taj	2
EVENT_003	Wedding Ceremony	2026-01-16 10:00:00	10:00 AM - 1:00 PM	Traditional Indian - Formal attire	Temple Hall	3
EVENT_004	Reception	2026-01-16 19:00:00	7:00 PM - 11:00 PM	Formal Evening Wear	Grand Ballroom, Hotel Taj	4
```

### Sheet 3: Responses
Copy and paste this into row 1:
```
response_id	family_id	family_name	event_id	event_name	attending_count	member_responses	notes	submitted_at
```
(Leave this sheet empty except for headers - responses will be added automatically)

### Sheet 4: Config
Copy and paste this into row 1:
```
key	value	description
```

Then add these config rows (rows 2-6):
```
wedding_date	2026-01-16 10:00:00	Main wedding ceremony date for countdown
bride_name	Bride Name	Bride's name
groom_name	Groom Name	Groom's name
background_media_url		URL to background image/video
site_title	Our Wedding	Page title
```

---

## After adding the data:

1. Update the bride/groom names in the Config sheet
2. Update the wedding date if different
3. Let me know when done, and I'll test the connection!
