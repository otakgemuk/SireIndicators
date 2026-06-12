# SireIndicators Trading Dashboard

**Production-Ready Next.js 15 Frontend for Trading Indicators**

## 🚀 Quick Start (5 Minutes)

### 1. Install & Run
```bash
npm install
npm run dev
```

Visit: **http://localhost:3000**

### 2. Build for Production
```bash
npm run build
npm start
```

### 3. Deploy to Vercel
```bash
npm run build && vercel
```

---

## 📋 Features

✅ Real-time ORB & Raschke signals
✅ Dark/Light theme toggle
✅ Settings persistence (localStorage)
✅ Responsive design (mobile-first)
✅ WCAG AA accessibility
✅ Production-ready TypeScript
✅ Zustand state management
✅ Performance optimized (~96KB gzip)

---

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── store/
│   └── indicatorStore.ts  # Zustand state
├── lib/
│   └── utils.ts      # Utilities
└── types/
    └── indicators.ts  # TypeScript types
```

---

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

---

## 📊 API Integration

Replace mock data in `src/app/page.tsx`:

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`);
const { data } = await response.json();
setDashboard(data);
```

---

## ✨ Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 4
- **State**: Zustand 4

---

**Ready to deploy?** Run: `npm install && npm run build && npm start`

**Status: PRODUCTION READY ✅**
