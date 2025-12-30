# Wedding RSVP System

A beautiful, personalized wedding RSVP system with unique QR codes for each family.

## Features

- 🎨 Beautiful landing page with countdown timer
- 📱 Unique QR codes for each family
- 🎭 Dynamic event display based on family configuration
- 📊 Google Sheets integration for response collection
- 🖼️ Custom background media support (images/videos)
- 👔 Event-specific wardrobe recommendations

## Tech Stack

- **Frontend**: Next.js 16 (React 19)
- **Styling**: Vanilla CSS
- **Hosting**: Vercel
- **Backend**: Google Sheets API
- **QR Generation**: qrcode library
- **Image Processing**: Sharp

## Getting Started

### Prerequisites

- Node.js 18+ (v25.2.1 installed)
- npm 9+ (v11.6.2 installed)
- Google Cloud account (for Sheets API)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_client_email
GOOGLE_SHEET_ID=your_sheet_id
```

## Project Structure

```
/Users/darshanharia/RSVP/
├── public/
│   ├── media/              # Background images/videos
│   └── generated/          # Generated QR codes and banners
├── src/
│   ├── app/
│   │   ├── page.js         # Home/Admin page
│   │   ├── rsvp/
│   │   │   └── page.js     # RSVP landing page
│   │   ├── layout.js       # Root layout
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── CountdownTimer.js
│   │   ├── EventCard.js
│   │   ├── RSVPForm.js
│   │   └── AdminPanel.js
│   └── lib/
│       ├── googleSheets.js # Google Sheets API integration
│       ├── qrGenerator.js  # QR code generation
│       └── utils.js        # Helper functions
└── package.json
```

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Then connect your GitHub repository to Vercel for automatic deployments.

## Google Sheets Setup

See `google-sheets-setup.md` for detailed instructions on setting up Google Sheets integration.

## License

Private - For personal use only
