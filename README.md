
# Tea or Dare 🧋

A bilingual Truth or Dare mobile game made with React Native and Expo.

## About

I wanted to make a Truth or Dare game that I could actually play with my friends because a lot of the ones online have pretty boring questions, so I wanted something with more personality. Tea or Dare has a mix of funny, embarrassing, flirty, and deeper questions, all in English and Chinese so we don't have to keep translating while playing.

## Screens

### Play

This is where the actual game happens. You can choose from four modes: Sweet, Chaotic, Spicy, and Deep Talk. Each one has its own set of Truth and Dare questions, with both English and Chinese shown on the card.

There's also an animated boba mascot that reacts to different modes. You can tap the cup to shake it and draw another card. I added a Who's Spilling? feature too, where everyone can enter their names and the app randomly picks who's answering each round.

There are also two special game modes. Mystery Boba randomly picks both the category and Truth or Dare, so you never know what you're going to get. Two-Pearl Trouble randomly chooses two players and gives them a challenge to complete together. I thought these would make the game a little more unpredictable and fun when playing with a group of friends.

### My Cards

This screen is for adding your own questions. You can enter English and Chinese text, choose a mode and Truth/Dare type, and save the card.

Custom questions get mixed into the regular decks, and you can delete them whenever you want. They stay saved even after closing the app.

## How to Run

I built the app using:
- React Native
- Expo SDK 58
- Expo Router
- AsyncStorage

I used Node.js v24.13.1 during development and tested the app on my iPhone using Expo Go.

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/whosamyy/hw10-mobile-app.git
   cd hw10-mobile-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Expo Go on your phone and sign in to your Expo account.

4. Sign in with the same Expo account in your terminal:

   ```bash
   npx expo login
   ```

5. Start the app:

   ```bash
   npx expo start
   ```

6. Make sure your computer and phone are connected to the same Wi-Fi network. Scan the QR code with your phone's camera and open the app in Expo Go.

If the connection doesn't work, try:

```bash
npx expo start --tunnel
```

The app doesn't need a backend, API key, or paid developer account. The questions are stored locally, and AsyncStorage saves custom cards and player names.

## What I Learned

One thing I thought was pretty cool was how I could make changes in VS Code and see them show up on my phone almost immediately through Expo Go. I also learned how AsyncStorage works and how to use it to keep custom questions and player names saved even after closing the app. This was my first time working with React Native, so it was interesting to see how building a mobile app differs from building a regular website.

## AI Usage

I used Codex in VS Code to help build the app, understand React Native, review the implementation, and fix issues.