# ContractorERP - Mobile ERP for Building Contractors

A cross-platform (iOS, Android, Web) ERP prototype built with React Native and Expo, designed for individual contractors in the building industry.

## Features (Mockup Screens)

- **Dashboard** - Overview with stats, quick actions, alerts, and recent activity
- **Projects** - Project list with status, progress tracking, budget info, and filtering
- **Clients** - Client directory with contact details and project history
- **Invoices** - Invoice management with status tracking, filtering, and summary cards
- **Time Tracking** - Timer with start/stop, time entries grouped by date
- **Schedule** - Calendar week view with events (site visits, meetings, inspections, deliveries, deadlines)
- **Profile** - User profile, business settings, subscription info, and app settings

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
npm install
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo SDK 52** - Development platform and build tools
- **TypeScript** - Type-safe development
- **React Navigation** - Tab and stack navigation
- **@expo/vector-icons** - Icon library (Ionicons)

## Project Structure

```
├── App.tsx                     # App entry point
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Avatar.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SectionHeader.tsx
│   │   └── StatusBadge.tsx
│   ├── constants/
│   │   ├── mockData.ts         # Mock data for all screens
│   │   └── theme.ts            # Colors, spacing, typography
│   ├── navigation/
│   │   └── TabNavigator.tsx    # Bottom tab navigation
│   └── screens/
│       ├── ClientsScreen.tsx
│       ├── DashboardScreen.tsx
│       ├── InvoicesScreen.tsx
│       ├── ProfileScreen.tsx
│       ├── ProjectsScreen.tsx
│       ├── ScheduleScreen.tsx
│       └── TimeTrackingScreen.tsx
```
