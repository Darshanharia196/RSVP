# Adding Sample Family Data to Google Sheets

To test the RSVP landing page, add this sample family to your Google Sheet:

## Go to the "Families" tab and add this row:

```
FAMILY_001	Sharma Family	Raj Sharma, Priya Sharma, Aarav Sharma	+919876543210	EVENT_001,EVENT_002,EVENT_003	https://your-wedding.vercel.app/rsvp?id=FAMILY_001	2025-12-26
```

## Then you can test the page at:

http://localhost:3000/rsvp?id=FAMILY_001

This will show:
- Family name: "Sharma Family"
- Members: Raj Sharma, Priya Sharma, Aarav Sharma
- Events: Mehendi Ceremony, Sangeet Night, Wedding Ceremony (the first 3 events)
- Countdown timer to the wedding date
- Beautiful background with glassmorphism effects

## To add more families:

Just add more rows to the Families sheet with different family_ids (FAMILY_002, FAMILY_003, etc.) and customize which events they're invited to by changing the `events_invited` column.
