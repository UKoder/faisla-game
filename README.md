# Faisla — Farmer Decision Game

> **Faisla** (फैसला / முடிவு) means *decision* in Hindi.
> A swipe-based financial literacy game built for rural India — playable offline, on any phone, in three languages.

**Live Demo → [ukoder.github.io/faisla-game](https://ukoder.github.io/faisla-game/)**

---

## What is Faisla?

Faisla puts you in the shoes of a small Indian farmer navigating one full agricultural year. Every card you swipe is a real financial decision that rural farmers face daily — informal loans, crop insurance, government scheme registrations, mandi price crashes, fraud calls, and more.

The game teaches financial literacy not through lectures, but through consequence. Make a bad choice, watch your resilience collapse, and understand *why* — through a personalized decision autopsy at the end of every run.

---

## UN Sustainable Development Goals

| SDG | Relevance |
|-----|-----------|
| **SDG 1 — No Poverty** | Teaches farmers to avoid debt traps and informal moneylenders |
| **SDG 4 — Quality Education** | Delivers practical financial literacy to low-literacy users in their own language |
| **SDG 8 — Decent Work & Economic Growth** | Introduces real formal financial instruments: KCC, PMFBY, PM-KISAN, e-NAM |
| **SDG 10 — Reduced Inequalities** | Offline-first, sub-500KB, multilingual — designed for users excluded from digital finance |

---

## Core Game Loop

```
Start Season → Draw Card → Read Scenario → Swipe Left or Right
     ↓                                            ↓
Pillars update ←────────── Effects applied ←──────┘
     ↓
Any pillar hits 0? → Game Over → Decision Autopsy → Try Again
     ↓
All cards played? → Season Complete → Decision Autopsy
```

One screen. No menus. No loading. Pure flow.

---

## The Four Pillars

Every decision moves four metrics simultaneously. Let any one hit zero and the season ends.

| Pillar | What it represents |
|--------|--------------------|
| 👨‍👩‍👧 **Family** | Household welfare, health, social stability |
| 🌾 **Crops** | Soil health, seed quality, harvest yield |
| ₹ **Finance** | Cash flow, debt load, savings buffer |
| 🛡️ **Resilience** | Ability to absorb shocks and recover |

---

## Real Scenarios in the Deck

Every card is based on a real situation Indian farmers face:

- **Informal vs Bank Loan** — Sahukar at 5%/month vs KCC at subsidized rate
- **Crop Insurance** — Skip PMFBY to save ₹800, or stay covered for the monsoon
- **Fraud OTP Call** — Scammer impersonating a government official
- **Mandi Price Crash** — Sell now at a loss or pay for storage and wait
- **PM-KISAN Registration** — Paperwork friction vs ₹6,000/year guaranteed income
- **e-NAM Online Mandi** — Local middlemen vs direct national buyer access
- **Festival Spending** — Family happiness today vs seed money for next season
- **Health Emergency** — Private hospital bill vs government hospital delay
- **Soil Health Card** — Same old fertilizer vs free KCC-backed soil test advice
- **Self Help Group** — Ignore SHG or build a formal credit history

---

## Features

### Swipe Mechanic
Drag cards left or right. As you drag, the pillar bars show a live preview of what each choice will cost you — before you commit.

### Decision Autopsy
When a run ends, the game generates a personalized breakdown of your choices:
- *"You relied on informal loans 3 times. High-interest debt quietly crushed your resilience."*
- *"You skipped crop insurance. One bad monsoon with no cover can end a season instantly."*
- *"You fell for a scam. Real government schemes never ask for OTPs over the phone."*

Not generic tips — derived from your actual decisions in that run.

### Pass-and-Play Mode
Two players share one phone. Player 1 swipes a choice, then passes to Player 2 to approve or reject. If P2 disagrees, the card springs back. No choice is applied until both agree. Turns a solo game into a household financial conversation.

### Text-to-Speech
Every card prompt is read aloud using the Web Speech API. Supports English, Hindi, and Tamil voices. Critical for low-literacy users.

### Haptic Feedback
The phone vibrates on bad financial choices — a physical gut-punch when you take the moneylender's loan. The body learns what the mind might rationalize away.

### Debt Trap Visualizer
When you enter a debt spiral, a red blinking border surrounds the entire screen. You feel trapped because you are.

### Narrator System
Each card has a narrator — Wise Elder, Bank Mitr, Scammer, or Inner Voice — with distinct visual styling. The Scammer narrator is styled in red to signal danger before you even read the card.

---

## Design Philosophy

Designed for a farmer standing in a field at noon on a cracked ₹5,000 phone.

**Extreme Contrast** — Pure black on stark white. No gradients, no blur, no glassmorphism. Subtle UI is invisible in sunlight.

**Flat SVG-Only Graphics** — Zero raster images. Every icon is an inline SVG silhouette. The entire app is under 500KB — small enough to share over WhatsApp.

**Massive Hit Targets** — Pass-and-play buttons occupy the entire bottom third of the screen. Cheap digitizers miss small taps. Calloused thumbs need room.

**No Account, No Backend** — All state lives in `localStorage`. Nothing to sign up for, nothing to lose access to.

---

## Progressive Web App

Faisla is a fully installable PWA:

- Works completely offline after first load
- Installable from the browser — no app store required
- Service worker caches all assets via Workbox
- Full manifest with icons, theme color, and standalone display mode

To install: open the live URL in Chrome or Brave on mobile → tap the browser menu → *Add to Home Screen*.

---

## Languages

| Language | UI | TTS Voice | Card Prompts |
|----------|----|-----------|--------------|
| English (en-IN) | ✅ | ✅ | ✅ |
| Hindi (hi-IN) | ✅ | ✅ | ✅ |
| Tamil (ta-IN) | ✅ | ✅ | ✅ |

Language selection changes both the UI text and the TTS voice simultaneously.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| State | Zustand (persisted to localStorage) |
| Routing | React Router v7 |
| PWA | vite-plugin-pwa + Workbox |
| TTS | Web Speech API (no external library) |
| Haptics | Vibration API (no external library) |
| Icons | Inline SVG (no icon library) |
| Backend | None |

---

## Project Structure

```
faisla-game/
├── public/
│   ├── favicon.svg
│   └── icons/              # PWA icons (SVG + PNG)
├── src/
│   ├── components/
│   │   ├── AutopsyReport.jsx     # End-of-run decision analysis
│   │   ├── DecisionCard.jsx      # Swipeable card with live delta preview
│   │   ├── DebtTrapVisualizer.jsx# Red blink border when in debt spiral
│   │   ├── InstallPrompt.jsx     # PWA install banner
│   │   ├── NarratorHint.jsx      # Narrator panel with TTS controls
│   │   ├── PassAndPlayOverlay.jsx# Two-player approval overlay
│   │   └── PillarsBar.jsx        # SVG icon bars with live delta
│   ├── engine/
│   │   └── consequences.js       # Pillar effect math + game-over logic
│   ├── hooks/
│   │   ├── useInstallPrompt.js   # beforeinstallprompt handler
│   │   └── useOrientation.js     # Portrait/landscape detection
│   ├── i18n/
│   │   └── translations.js       # EN/HI/TA string table
│   ├── layouts/
│   │   ├── LandscapeLayout.jsx   # Tablet/desktop two-column layout
│   │   └── PortraitLayout.jsx    # Mobile single-column layout
│   ├── scenarios/
│   │   ├── cropDecks.js          # Crop-specific card filters
│   │   └── faislaDeck.js         # Full 20+ card scenario deck
│   ├── services/
│   │   ├── haptics.js            # Vibration API wrapper
│   │   ├── storage.js            # localStorage save/load
│   │   └── tts.js                # Web Speech API wrapper
│   ├── state/
│   │   └── gameStore.js          # Zustand store + autopsy logic
│   └── App.jsx                   # Router + orientation-aware shell
├── index.html
├── vite.config.js
└── package.json
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ukoder/faisla-game.git
cd faisla-game/faisla-game

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build locally (PWA works here)
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## How Scoring Works

- Each run starts with all four pillars at **60/100**
- Every card swipe applies a delta (e.g. `finance: -20, resilience: -10`)
- Deltas are cumulative — a debt trap compounds over multiple cards
- Game ends when any pillar reaches **0** or all cards are played
- Best run (days survived) is persisted across sessions

---

## Backend

The `backend/` folder at the repo root is a separate Node.js service — currently unused by the game. All game logic runs entirely client-side.

---

## License

MIT
