# PickleMatch App

A React Native mobile application for pickleball players to find courts, connect with other players, and join clubs.

## Recent Updates

### UI/UX Improvements
- **Sign-in & Sign-up Screens**: Updated with warm orange/yellow gradient background and teal accents matching the design
- **Professional Bottom Navigation**: Redesigned with modern styling, active states, and proper spacing
- **StatusBar Fix**: Resolved header overlap issues with proper SafeAreaView implementation
- **Color Scheme**: Implemented consistent color palette:
  - Primary: Orange (#FF8C42) and Yellow (#FFD700) gradient
  - Accent: Teal (#008080)
  - Background: Light beige (#F5F5DC)

### Technical Improvements
- Added react-native-linear-gradient for gradient backgrounds
- Fixed StatusBar configuration for proper display
- Enhanced navigation with professional styling
- Improved form inputs with better visual feedback

## Features

- **Authentication**: Sign-in and sign-up with email/password
- **Social Login**: Google and Facebook integration
- **Navigation**: Professional bottom tab navigation
- **Home Screen**: Quick actions, recent activity, and featured courts
- **Responsive Design**: Works on both iOS and Android

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the app:
```bash
# For Android
npx react-native run-android

# For iOS
npx react-native run-ios
```

## Dependencies

- React Native
- react-native-linear-gradient
- react-hook-form
- TypeScript

## Project Structure

```
src/
├── screens/
│   ├── auth/
│   │   ├── SignInScreen.tsx
│   │   └── SignUpScreen.tsx
│   ├── tabs/
│   │   ├── HomeTab.tsx
│   │   ├── ClubsTab.tsx
│   │   ├── SearchTab.tsx
│   │   ├── ShopTab.tsx
│   │   └── ChatTab.tsx
│   └── MainScreen.tsx
└── constants/
    └── fonts.ts
```

## Design System

### Colors
- **Primary Gradient**: Orange (#FF8C42) to Yellow (#FFD700)
- **Accent**: Teal (#008080)
- **Background**: Light beige (#F5F5DC)
- **Text**: Dark gray (#333)
- **Secondary Text**: Medium gray (#666)

### Typography
- **Headings**: Bold, 24-28px
- **Body**: Regular, 14-16px
- **Captions**: Light, 11-12px

### Components
- **Buttons**: Rounded corners (30px), shadows, teal background
- **Inputs**: Light beige background, rounded corners (12px)
- **Cards**: White background, subtle shadows, rounded corners
