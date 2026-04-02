# Emoji Dodge

A fun and addictive arcade-style mobile game built with React Native. Dodge falling emojis as long as possible to achieve the highest score!

## Project Overview

Emoji Dodge is an endless runner game where players control a character at the bottom of the screen and must avoid various falling emoji obstacles. The game features:

- **Home Screen**: Game title, description, and start button
- **Gameplay**: Real-time dodging with continuous falling obstacles
- **Controls**: Drag gestures, tap controls, and arrow buttons for movement
- **Scoring**: Time-based scoring system with best score tracking
- **Game Over**: Collision detection with restart functionality

The objective is simple: survive as long as possible while avoiding collisions with falling emojis!

## Technology Stack

- **React Native**: Cross-platform mobile app framework
- **TypeScript**: Type-safe JavaScript for better development experience
- **React Native Safe Area Context**: Handles safe area insets for different devices
- **Metro**: JavaScript bundler for React Native
- **Jest**: Testing framework (configured but not extensively used)

## Development Approach

The game was developed using a component-based architecture with React hooks for state management. Key technical decisions:

- **Single-file implementation**: All game logic contained in `App.tsx` for simplicity
- **Game loop**: Uses `setInterval` for consistent 30ms game ticks
- **Collision detection**: Axis-aligned bounding box (AABB) collision system
- **Performance**: Efficient rendering with minimal re-renders using refs for game state
- **Controls**: PanResponder for drag gestures plus button controls for accessibility
- **Scoring**: Time-based system (score = floor(time_elapsed / 100))

## Steps to Run the Project

### Prerequisites

- Node.js (version 16 or later)
- npm or yarn
- React Native development environment set up
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. Clone or navigate to the project directory:
   ```sh
   cd EmojiDodge
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running on Android

1. Start Metro bundler:
   ```sh
   npm start
   ```

2. In a new terminal, run the Android app:
   ```sh
   npm run android
   # or
   npx react-native run-android
   ```

### Running on iOS

1. Install CocoaPods dependencies:
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

2. Start Metro bundler:
   ```sh
   npm start
   ```

3. In a new terminal, run the iOS app:
   ```sh
   npm run ios
   # or
   npx react-native run-ios
   ```

### Running Tests

```sh
npm test
```

## Game Features

- **Multiple Control Methods**: Drag, tap, or button controls
- **Random Obstacles**: Various emoji types spawn randomly
- **Progressive Difficulty**: Continuous spawning with varying speeds
- **Score Tracking**: Real-time score display with best score persistence
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: 30 FPS game loop for fluid gameplay

## Project Structure

```
EmojiDodge/
├── App.tsx              # Main game component
├── android/             # Android-specific files
├── ios/                 # iOS-specific files
├── __tests__/           # Test files
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## Contributing

Feel free to fork this project and add new features like:
- Power-ups and special abilities
- Different difficulty levels
- Leaderboards
- Sound effects and music
- Additional emoji themes

## License

This project is open source and available under the MIT License.

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
