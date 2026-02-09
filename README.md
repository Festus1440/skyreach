# Skyreach Heating & Cooling - Full Stack Website

A modern, professional HVAC company website built with **Next.js + shadcn/ui + Tailwind CSS** frontend and **Express.js** backend.

## 🌐 Domain
- **Website**: skyreachair.com
- **Business**: Skyreach Heating & Cooling

## 📁 Project Structure

```
skyreach/
├── frontend/               # Next.js + shadcn/ui frontend
│   ├── app/               # Next.js app router
│   │   ├── dashboard/    # Internal admin dashboard
│   │   │   ├── page.tsx  # Dashboard home (protected)
│   │   │   └── login/    # Dashboard login
│   │   ├── landing/      # High-converting landing page (for ads)
│   │   ├── funnel/       # Questionnaire funnel
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Main website home
│   │   └── globals.css   # Global styles
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── *.tsx         # Page sections (Header, Hero, etc.)
│   ├── lib/              # Utilities
│   ├── public/           # Static assets
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                # Express.js backend
│   ├── server.js         # Main server file
│   ├── models/           # MongoDB models (User, Lead)
│   ├── middleware/       # Auth middleware
│   ├── routes/           # API routes (auth, dashboard)
│   ├── scripts/          # Admin CLI tools
│   ├── .env.example      # Environment variables template
│   └── package.json
│
└── README.md
```

## ✨ Features

### Frontend (Next.js)
- ⚡ **Next.js 14** with App Router
- 🎨 **shadcn/ui** components
- 💨 **Tailwind CSS** styling
- 🎬 **Framer Motion** animations
- 📱 **Fully Responsive** design
- 🖼️ **Real HVAC images** from Unsplash
- 📝 **Working contact form**
- 🎯 **High-converting landing page** for PPC ads

### Backend (Express.js)
- 🚀 **Express.js** server
- 🍃 **MongoDB** with Mongoose ODM
- 🔐 **JWT Authentication** with httpOnly cookies
- 👤 **User Management** with bcrypt password hashing
- 📊 **Internal Dashboard API** for lead management
- 📧 **Nodemailer** email integration
- ✅ **Express Validator** input validation
- 🌐 **CORS** enabled
- 🔒 **Environment variables** support

### Internal Dashboard
- 🔐 **JWT-based authentication** (no public signup)
- 👤 **Role-based access** (admin, manager, technician)
- 📊 **Lead Management** - view, search, filter leads
- 📝 **Notes System** - add notes to leads
- 📈 **Statistics** - dashboard with lead metrics
- 🔧 **Admin CLI** - create users via command line

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
```

Required environment variables:
- `DB_CONN` - MongoDB connection string (e.g., `mongodb://localhost:27017/skyreach`)
- `JWT_SECRET` - Secret key for JWT tokens (generate a random string)
- `EMAIL_USER` / `EMAIL_PASS` - For email notifications

### 4. Setup MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas:

```bash
# Local MongoDB (if installed locally)
mongod

# Or use Docker
docker run -d -p 27017:27017 --name skyreach-mongo mongo:latest
```

### 5. Create Admin User

**IMPORTANT:** The credentials in `.env` (ADMIN_EMAIL, ADMIN_PASSWORD) are only used by the create-admin script. You must run this script to actually create the user in the database.

```bash
cd backend

# Using credentials from .env file (recommended)
npm run create-admin

# Or override with command line arguments:
npm run create-admin -- --email admin@skyreachair.com --name "Admin User" --password yourpassword --role admin
```

**Note:** If you get "Invalid credentials" when logging in, it means you haven't run `npm run create-admin` yet, or the user wasn't created successfully.

Available roles: `admin`, `manager`, `technician`

### 6. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev          # Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev          # Runs on http://localhost:3000
```

### 8. Access the Website

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Main multi-page website |
| http://localhost:3000/landing | High-converting landing page (for ads) |
| http://localhost:3000/funnel | **Interactive questionnaire funnel** |
| http://localhost:3000/dashboard | **Internal admin dashboard** (requires login) |
| http://localhost:3000/dashboard/login | Dashboard login page |
| http://localhost:3001/api | Backend API |

## 🛠️ Building for Production

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
npm start
```

## 📧 Email Configuration

### Option 1: Gmail SMTP
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Option 2: Ethereal Email (Testing)
Get free credentials from https://ethereal.email

## 📱 Pages/Sections

### Main Website (`/`)
- Hero with floating cards
- Services grid (6 services)
- Why Choose Us
- Stats counter
- Process steps
- Customer testimonials
- Contact form
- Footer

### Landing Page (`/landing`)
- High-converting funnel design
- Exit intent popup with discount
- Sticky CTA bar
- Urgency badges
- Problem/solution flow
- FAQ accordion
- Optimized for PPC ads

### Questionnaire Funnel (`/funnel`)
**For $125 Furnace Maintenance Ad Campaign**

- **Perspective.co-style** interactive quiz funnel
- **Auto-advances** after user selection (700ms delay)
- Progress bar with percentage
- Smooth slide animations between steps
- **Dynamic question flow based on heating system type**:
  1. **Heating System Type** → Gas furnace / Electric furnace / Not sure
  2. **System-Specific Questions** (based on system type):
     - **Gas Furnace**: Gas smell concerns / CO detector status
     - **Electric Furnace**: Electrical issues (breaker trips, burning smell, weak airflow)
     - **Not Sure**: Heat type felt (air/radiator/floor) / Unit location
  3. **Filter Size** → 16x25x1 / 20x25x1 / 14x25x1 / 16x20x1 / 20x20x1 / Not sure / Other (custom input)
  4. **Last Service Date** → Never / Over 1 year / 6-12 months / Under 6 months
  5. **Current Issues** → No issues / Not heating well / High bills / Frequent cycling
  6. **Property Type** → Single family / Townhouse / Condo / Mobile home
  7. **Timing** → ASAP / This month / Next month / Flexible
  8. **Contact Form** with system-specific maintenance checklist
- **Orange/red heating-themed color scheme**
- **Hero banner** showing $125 offer prominently
- **Price lock confirmation** on success page
- **Dynamic "What's Included" checklist** based on system type:
  - **Gas furnaces**: Burner cleaning, flame sensor, pressure switch, ignitor timing, CO2/gas leak checks, flame rectification, exhaust checks
  - **Electric furnaces**: Electrical safety, heat elements, airflow, safe temperatures, safety shutoffs, connections, blower motor
  - **Not sure**: Complete system inspection, safety check all components, clean applicable parts, verify safe operation, filter replacement, performance testing, written condition report, maintenance recommendations
- **Price match guarantee** footer
- Mobile-first card-based design
- Trust badges throughout

## 🔧 Troubleshooting

### "Invalid credentials" (401) when logging into dashboard

This error means the user doesn't exist in the database. **You must run `npm run create-admin` to create the user first.**

**Solution:**
```bash
cd backend

# Make sure MongoDB is running
# Then create the admin user:
npm run create-admin
```

**Common causes:**
1. Haven't run `npm run create-admin` yet
2. MongoDB is not running
3. Wrong `DB_CONN` connection string in `.env`
4. Using wrong email/password combination

**To verify the user was created:**
```bash
# Connect to MongoDB and check
mongo
use skyreach
db.users.find()
```

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.ts`:
```typescript
colors: {
  sky: {
    primary: "#0066CC",
    secondary: "#FF6B35",
    accent: "#00A8E8",
    dark: "#1a1a2e",
  }
}
```

### Contact Information
Update in `frontend/components/`:
- Header.tsx
- Contact.tsx
- Footer.tsx

## 🔧 Tech Stack

| Frontend | Backend |
|----------|---------|
| Next.js 14 | Express.js |
| React 18 | Node.js |
| TypeScript | Nodemailer |
| Tailwind CSS | Express Validator |
| shadcn/ui | CORS |
| Framer Motion | dotenv |
| Lucide Icons | |

## 📝 License

Copyright 2024 Skyreach Heating & Cooling. All rights reserved.

## 📞 Support

For technical support, contact the development team.
