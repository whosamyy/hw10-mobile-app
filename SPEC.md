# Tea or Dare — HW10 Spec

## The idea

I'm making a mobile Truth or Dare game called **Tea or Dare**. Basically, I want something my friends and I can pull out when we're hanging out and don't know what to do. Instead of thinking of questions ourselves or searching for them online, we can just pass around a phone and draw cards.

I also want it to be bilingual because some of my friends are more comfortable with Chinese and others with English. Both languages should show up on the same card so nobody has to keep translating.

The questions are probably the most important part. I don't want the super generic ones that every truth or dare game has. I want a mix of funny, embarrassing, flirty, and occasionally meaningful questions. The app should feel cute and a little unserious, kind of like a bubble tea shop.

## How the game works

There will be four modes:

- **Sweet 🍓:** Friendship questions, cute memories, compliments, and wholesome dares.
- **Chaotic 🔥:** Random, embarrassing, and ridiculous questions or challenges that are actually funny.
- **Spicy 🌶️:** Crushes, flirting, situationships, dating, and slightly embarrassing confessions. Nothing explicit or too invasive.
- **Deep Talk 🌙:** More personal questions about friendships, life, and things people don't usually talk about.

Each mode should have both Truth and Dare cards.

I want to start with 40 built-in cards, so 5 truths and 5 dares for each mode. The questions should be unique and have natural Chinese translations, not just word-for-word translations that sound weird.

The player chooses a mode, taps Truth or Dare, and gets a random card. They can keep drawing new cards from that category. If there are multiple cards available, the same card shouldn't appear twice in a row.

I also want people to be able to add their own questions, since inside jokes and friend-specific questions would make the game a lot more fun.

## Screens

I'm keeping it to two screens for now.

### 1. Play

This is the main screen people will see when opening the app.

It should have the app name, a short tagline ("Spill the tea or take the dare"), and four buttons or cards for choosing a mode.

Once someone chooses a mode, they can tap Truth or Dare to draw a question. The question should appear on a large card with English on top and Chinese underneath.

There should be a Next Card button so people can skip questions or keep playing.

I want Sweet to be selected by default when the app opens. Before the first question is drawn, the card can say something like "Ready to spill some tea?"

Switching modes should clear the previous question so it's obvious we're starting a different category.

### 2. My Cards

This screen lets people add their own truths and dares.

There should be two text inputs, one for English and one for Chinese. The user can also choose the mode and whether the card is a truth or a dare.

Once they tap Add Card, it should show up in a list of their custom questions. They should be able to delete cards too.

The custom questions should automatically be mixed into the regular game when someone selects the matching mode and type.

If someone hasn't added anything yet, I'd rather have a cute empty message than just a blank screen.

I don't need editing for now. Deleting and adding a new version is fine.

### Navigation

I want a simple bottom tab bar with Play and My Cards. It should be easy to switch between them without losing anything.

## Saving data

Custom questions need to stay saved even after the app is completely closed and reopened.

I'll use AsyncStorage for this since the app doesn't really need a database or backend.

Each card should have an ID, a mode, a type (truth or dare), English text, Chinese text, and something indicating whether it's built-in or custom.

The built-in questions can just be stored in a file in the project. Only the custom ones need to be saved to the phone.

## Design

I want the whole app to have a bubble tea / strawberry milk tea kind of aesthetic.

I'm thinking:
- Pastel pink background
- Cream-colored question cards
- Strawberry red or darker pink buttons
- Rounded corners and soft shadows
- Some little bubble tea decorations, maybe emojis or a cute drink illustration
- Different accent colors for the four modes

I don't want it to look like a children's app, though. More like a cute, clean app that college students would actually use.

The question card should be the main focus, with relatively large English text and Chinese underneath. Long questions need to fit on the screen, even if that means scrolling.

A little card flip or reveal animation would be nice, but only if there's time. I'd rather have everything working first.

## Tech stuff

I'm using the Expo SDK 58 project I already created.

- React Native for the app
- Expo Router for the two screens
- AsyncStorage for saving custom questions
- Expo Go to run it on my iPhone

The actual game should work without internet. No accounts, external APIs, or backend needed.

## Acceptance criteria

These are the things I want to check once Codex finishes building the first version.

### Playing

1. The app opens to the Play screen without crashing.
2. I can select any of the four modes.
3. I can choose Truth or Dare and get a random question from the correct category.
4. Every built-in question appears in both English and Chinese.
5. Each of the four modes has at least 5 truths and 5 dares.
6. Next Card gives me another question from the same mode and type.
7. If at least two cards are available, I shouldn't get the exact same card twice in a row.
8. Switching to a different mode clears the previous question.
9. The app doesn't crash if I keep switching modes and drawing cards.

### Custom questions

10. I can add a custom truth or dare with English and Chinese text.
11. I can choose which mode the custom question belongs to.
12. The app won't save a question if either text field is empty.
13. After adding a card, it shows up on the My Cards screen and the form clears.
14. My custom cards can appear during the game in their matching categories.
15. I can delete a custom card.
16. Deleting a custom card also removes it from the game.
17. Built-in cards can't be accidentally deleted.

### Saving and navigation

18. I can switch between Play and My Cards using the bottom tabs.
19. Custom cards are still there after I close and reopen Expo Go.
20. Deleted cards stay deleted after restarting the app.
21. The original built-in questions are always available, even if I haven't added any custom ones.

### Appearance

22. Both screens have a consistent pink and cream theme.
23. It's obvious which mode is currently selected.
24. The English and Chinese text are both readable, even for longer questions.
25. The custom question form is usable on an iPhone without the keyboard covering everything.
26. Buttons are easy to tap and the layout doesn't get cut off on my phone.

## What I'm not doing

I don't want to overcomplicate this homework, so I'm leaving out online multiplayer, accounts, leaderboards, AI-generated questions, and any kind of cloud syncing.

I also don't think I need a complicated scoring system. The point is to hang out and have fun, not compete.

Maybe those could be future features, but they're not necessary for this version.

## What I want the finished app to feel like

Ideally, I could open this app when I'm at dinner or hanging out with friends, pick Spicy or Chaotic, and start playing immediately.

I want the questions to make people laugh or actually start conversations. If I can add some inside jokes as custom cards and they're still there the next time we play, that's pretty much exactly what I'm going for.