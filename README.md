# Magari 360

A modern car rental and dealership platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Running the App](#running-the-app)
5. [Project Structure](#project-structure)
6. [Styling & Theming](#styling--theming)
7. [Authentication & Backend](#authentication--backend)
8. [Scripts](#scripts)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

---

## Project Overview

Magari 360 (branded as "Rivent" in the UI) is a web platform for discovering, booking, and managing car rentals. It features a modern UI, robust authentication, and integration with Supabase for backend services.

---

## Tech Stack

- **Next.js** (App Router, SSR/SSG)
- **React** (18+)
- **TypeScript**
- **Tailwind CSS** (with custom theming)
- **Supabase** (Database, Auth, Storage)
- **Radix UI** (Accessible UI primitives)
- **Framer Motion** (Animations)
- **Zustand** (State management)
- **Other Libraries:**
  - React Hook Form, Zod, Lucide Icons, Embla Carousel, Recharts, etc.

---

## Features

- Browse and search car inventory
- List your car for rent/sale
- Dealer directory
- Blog and contact pages
- User authentication (sign up, sign in, sign out)
- Dealer dashboard
- Responsive design (mobile & desktop)
- Theming (light/dark mode)
- Toast notifications
- Modern, accessible UI components

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)
- **Supabase account** (for production use)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/magari360.git
   cd magari360
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

- Get these values from your Supabase project dashboard under **Project Settings > API**.
- The app will not run without these variables.

### Running the App

Start the development server:

```sh
npm run dev
```

- The app will be available at [http://localhost:9002](http://localhost:9002) (see `package.json` scripts).

---

## Project Structure

```
magari360/
├── src/
│   ├── app/                # Next.js app directory (routing, pages)
│   ├── components/         # Reusable UI and feature components
│   ├── data/               # Mock data for development
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and Supabase client
│   ├── types/              # TypeScript types
│   └── middleware.ts       # (Optional) Middleware for auth, etc.
├── public/                 # Static assets (if any)
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation
```

---

## Styling & Theming

- **Tailwind CSS** is used for all styling.
- Custom themes and color palettes are defined in `tailwind.config.ts`.
- The app supports light and dark mode (toggle in the UI).
- Fonts: Inter (body), Plus Jakarta Sans (headlines).

---

## Authentication & Backend

- **Supabase** is used for authentication and backend data.
- The Supabase client is initialized in `src/lib/supabase/client.ts`.
- Auth flows (sign in, sign up, sign out) are handled in `src/app/auth/`.
- Make sure your `.env.local` is configured with valid Supabase credentials.

---

## Scripts

Common scripts in `package.json`:

| Script         | Description                          |
| -------------- | ------------------------------------ |
| `dev`          | Start Next.js in development mode    |
| `build`        | Build the app for production         |
| `start`        | Start the production server          |
| `lint`         | Run ESLint on the codebase           |
| `typecheck`    | Run TypeScript type checks           |
| `genkit:dev`   | Start Genkit AI dev server (if used) |
| `genkit:watch` | Watch Genkit AI dev server (if used) |

---

## Deployment

- Deploy to **Vercel**, **Netlify**, or any Node.js-compatible host.
- Set environment variables in your deployment platform.
- For static export, see Next.js documentation.

---

## Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

[MIT](LICENSE)

---

## Troubleshooting

- **Supabase errors:**  
  Ensure your `.env.local` is set up and not using placeholder values.
- **Port conflicts:**  
  The dev server runs on port 9002 by default. Change in `package.json` if needed.
- **Styling issues:**  
  Make sure Tailwind CSS is installed and configured.

---

## Credits

- Built with [Next.js](https://nextjs.org/), [Supabase](https://supabase.com/), [Tailwind CSS](https://tailwindcss.com/), and [Radix UI](https://www.radix-ui.com/).
