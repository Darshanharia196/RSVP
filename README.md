# Wedding RSVP System

A beautiful, personalized wedding RSVP system with unique QR codes for each family, day-wise event grouping, and Google Sheets integration.

## 🚀 Features

-   **🎨 Editorial Vogue Theme:** Elegant, responsive design with a "Blush & Navy" palette.
-   **📅 Day-wise RSVP:** Guests RSVP for an entire day (all events included) at once.
-   **📝 Dynamic Content:** Update website text (Greeting, Hashtag, Location, etc.) directly from Google Sheets.
-   **✨ Rich Text Support:** Use **bold** text and newlines in your Google Sheet cells.
-   **📊 Google Sheets Backend:**
    -   **Families:** Manage guest list and family members.
    -   **Events:** Manage event details, timings, and wardrobe.
    -   **Responses:** Real-time collection of RSVPs.
    -   **Config:** Control website text and settings.
-   **🖼️ Local Image Management:** Easily update Hero and Event images by replacing files in the `public` folder.

## 🛠️ Tech Stack

-   **Frontend:** Next.js 15 (React 19)
-   **Styling:** Vanilla CSS (Editorial Design)
-   **Backend:** Google Sheets API (v4)
-   **Authentication:** Service Account (JWT)

## 📂 Project Structure

```
/Users/darshanharia/RSVP/
├── public/
│   ├── hero.jpg            # Main couple image
│   └── events/             # Event images (event-1.jpg, event-2.jpg, etc.)
├── src/
│   ├── app/
│   │   ├── rsvp/           # RSVP Page & Logic
│   │   └── api/rsvp/       # API Route for submissions
│   ├── components/         # React Components (RSVPForm, EventRow, etc.)
│   └── lib/                # Utilities (googleSheets.js, utils.js)
├── scripts/                # Helper scripts (setup, verification, migration)
└── README.md
```

## ⚙️ Google Sheets Setup

The system relies on a Google Sheet with 4 tabs:

### 1. `Families` Tab
| family_id | family_name | member_names | events_invited |
| :--- | :--- | :--- | :--- |
| FAMILY_001 | Chheda Family | Vasant, Sushila | EVENT_001, EVENT_002 |

### 2. `Events` Tab
| event_id | event_name | Day | event_date | event_timing | venue | wardrobe |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| EVENT_001 | Haldi | Day 1 | 2026-03-03 | 10:00 AM | Poolside | **Yellow** outfit |

### 3. `Responses` Tab
(Automatically populated by the app)
| response_id | family_id | member_name | day | attending | submitted_at |
| :--- | :--- | :--- | :--- | :--- | :--- |

### 4. `Config` Tab
(Control website text dynamically)
| Key | Value |
| :--- | :--- |
| `bride_name` | Riddhi |
| `groom_name` | Darshan |
| `location` | Mumbai, India |
| `hashtag` | #DarshanWeds |
| `greeting_text` | "We invite you..." |
| `rsvp_deadline` | January 1st |

> **Tip:** You can use `**bold**` syntax and `Alt+Enter` (newlines) in `wardrobe` and `greeting_text`.

## 🖼️ Image Management

To update images, simply replace the files in the `public` folder:

1.  **Hero Image:** Replace `public/hero.jpg`
2.  **Event Images:** Replace `public/events/event-1.jpg`, `event-2.jpg`, etc. (Order matches the Events sheet).

**Note:** Please use `.jpg` extension for all images.

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+
-   Google Cloud Service Account JSON key

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Helper Scripts

We have included several scripts to help manage the data:

-   `node scripts/check-config.js`: Verifies your Config sheet values.
-   `node scripts/generate-family-ids.js`: Auto-generates IDs for new families.
-   `node scripts/check-responses.js`: View recent RSVP submissions.

## 🔒 Environment Variables

Create a `.env.local` file:

```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEETS_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
GOOGLE_SHEET_ID="your_spreadsheet_id"
```

## 📄 License

Private - For personal use only.
