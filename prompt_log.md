## Earlier interaction — Expo and React Native concepts

- Date: to be filled in by user (before the implementation prompt)
- AI tool: Codex in VS Code
- Model: to be filled in by user
- Exact prompt: [To be filled in by user. The original prompt was unavailable in this conversation.]

## 2026-11-18 — Initial Tea or Dare implementation

- AI tool: Codex in VS Code
- Model: to be filled in by user

### Verbatim prompt

````text
I'm working on CMU 15-114 HW10, and I want you to build my mobile app, Tea or Dare.

These are the full instructions: [https://www.cs.cmu.edu/\~113/hw10.html](https://www.cs.cmu.edu/~113/hw10.html)



I already created an Expo SDK 58 project using React Native and Expo Router. The starter app works on my iPhone through Expo Go. I also wrote `SPEC.md` and committed it separately before starting implementation.

Please read my entire `SPEC.md` first and implement the app according to its requirements and acceptance criteria.

Here's what I want:

1. Replace the starter Home and Explore screens with two screens: Play and My Cards. Keep the existing Expo Router setup working.
2. On the Play screen, users should be able to choose between four modes: Sweet, Chaotic, Spicy, and Deep Talk. Each mode should have Truth and Dare questions.
3. Include 40 built-in questions total, with 5 truths and 5 dares for each mode. Every question needs both English and Chinese text displayed together. Please make the questions creative and natural, especially the Chaotic and Spicy ones. I want a mix of funny, embarrassing, flirty, and meaningful questions, not generic ones. Keep the spicy questions playful and appropriate for a college friend group.
4. Users should be able to randomly draw cards, skip to the next card, and switch modes. Avoid showing the same card twice in a row when other cards are available.
5. On the My Cards screen, let users add their own bilingual questions, choose the mode and Truth/Dare type, view their saved cards, and delete them. Include input validation so empty questions can't be saved.
6. Use AsyncStorage to save custom cards locally. They should still exist after I completely close and reopen the app. Deleted cards should stay deleted.
7. Make the design cute and polished. I want a pastel pink and cream bubble tea theme, with rounded cards, strawberry-colored buttons, and small playful details. It should look like something college students would actually use, not a children's game. Both English and Chinese need to be readable on an iPhone.
8. If it's not too complicated, add a subtle card reveal animation. But please prioritize making the actual game work.
9. Keep the code organized and relatively easy to understand. Reuse the existing project structure where possible. Don't add unnecessary complexity, a backend, accounts, or external APIs.
10. Install any dependencies that are necessary and compatible with Expo SDK 58. Use the Expo-compatible installation method for React Native dependencies.

Please implement the complete first version and run available checks, including TypeScript checking. Report any problems that still need manual testing on my iPhone.

IMPORTANT — PROMPT LOG:

Please also create `prompt_log.md` in the project root if it doesn't already exist.

I need to keep a record of my important AI interactions for this homework.

- Record this entire implementation prompt verbatim, exactly as I sent it. Don't summarize or rewrite the prompt.
- Include the date, AI tool (Codex in VS Code), and exact model name if available. If you can't determine the model, write "Model: to be filled in by user" instead of guessing.
- Add a short summary of what you actually implemented and which checks you ran.
- Include a separate section for my earlier interaction where I asked Codex to explain the Expo project and React Native concepts. If you can't access that exact prompt, leave a clearly labeled placeholder so I can add it myself. Don't invent the wording.
- Keep entries in chronological order.
- Don't delete or overwrite any existing prompt-log entries.
- For future prompts, I'll ask you to append entries to this same file.

IMPORTANT — GIT AND FILES:

- Do not modify `SPEC.md`.
- Do not modify unrelated files.
- Do not create a new Git branch.
- Do not commit or push anything.
- Do not reset the project or remove the existing Git history.
- This is the initial AI-generated build for my assignment. I need to commit the raw result before doing an independent review or making review-driven improvements.

When you're finished, tell me:

1. Which files you created or modified.
2. Which features are implemented.
3. Which checks passed or failed.
4. Anything I still need to test manually on my phone.
5. Whether `prompt_log.md` was created and contains this prompt.

Then stop. Don't start the independent review or make additional improvements beyond this initial implementation.
````

### Implementation summary

Built the Play and My Cards tabs with 40 bilingual prompts, four modes, random draws without immediate repeats, and a subtle card reveal that respects Reduce Motion. Added validation, local AsyncStorage persistence, and deletion for custom bilingual cards, which enter the matching decks automatically. Styled both screens with a pink-and-cream bubble tea theme.

### Checks run

- Passed TypeScript checking, ESLint on the app and game directories, iOS and web Expo exports, and `git diff --check`.
- Deck checks verified 40 unique bilingual cards, five per category, 2,000 draws without immediate repeats, and custom-card eligibility.
- Project-wide `npx expo lint` reported one error in the pre-existing starter hook `src/hooks/use-color-scheme.web.ts`.
- `npx expo install --check` flagged four existing Expo packages for updates. AsyncStorage 2.2.0 matched SDK 58. npm also reported three moderate audit findings during installation.
- Physical iPhone testing is pending, including launch, layout and keyboard behavior, and persistence across restarts.

## 2026-11-18 — Next Card state after deletion

- AI tool: Codex
- Model: to be filled in by user

### Verbatim prompt

````text
I've finished the independent AI review for my HW10 Tea or Dare app. The original review is saved in REVIEW\.md.

Please read REVIEW\.md and fix this specific issue:

When a custom card is currently displayed on the Play screen and I delete that card from My Cards, the Play screen resets to the welcome prompt, but the Next Card button is still enabled.

Make the button state consistent with the displayed card. If no card is showing, Next Card should be disabled until the user draws another Truth or Dare card.

Please:

- Make the smallest changes necessary.
- Don't change any of the existing questions or the app's design.
- Don't modify SPEC.md or REVIEW\.md.
- Preserve all working functionality, especially custom-card persistence and random drawing.
- Run TypeScript and other relevant checks afterward.
- Append this exact prompt verbatim to prompt_log.md, noting that it was used in Codex. Don't invent a model name.
- Don't commit or push anything.

When finished, explain what you changed and whether the checks passed.
````

### Result

Next Card now follows the displayed card for both its enabled state and draw type. TypeScript, Play screen lint, and a simulated draw-delete-redraw regression check passed. Project-wide lint still reports the existing starter hook error in `src/hooks/use-color-scheme.web.ts`.


## 2026-11-18 — Shake the Boba, Who’s Spilling, and the mascot

- AI tool: Codex in VS Code
- Model: to be filled in by user

### Verbatim prompt

````text
I want to make my existing Tea or Dare mobile app more fun and interactive. I've already built and tested the main game on my iPhone, and everything is working well, so please build on top of what I have instead of rewriting it.

I want to add three features: Shake the Boba, Who's Spilling, and a cute Boba Mascot.

Please inspect my existing code and understand how the Play screen, card drawing, custom cards, and AsyncStorage work before making changes.

## 1. Shake the Boba 🧋

I want drawing a card to feel more exciting than just pressing a button.

Add a cute animated bubble tea cup to the Play screen.

- The cup should have a pastel milk tea color, a straw, and little tapioca pearls inside.
- When the user taps the cup or a "Shake the Boba!" button, the cup should wiggle from side to side.
- The pearls should bounce around inside the cup during the animation.
- After a short animation, reveal the next question with a smooth pop or fade effect.
- Add some small sparkles or floating hearts during the reveal if it looks good.
- Keep the animation quick and satisfying, not slow or annoying.
- Prevent repeated taps from triggering overlapping animations.

Important:
- This should be an animated on-screen cup. I don't need actual phone-motion detection.
- Keep the existing Truth and Dare buttons working. When a user chooses one, that type becomes active, and the shake interaction can draw another card of that type.
- If no type has been selected yet, make it clear that the player should choose Truth or Dare first.
- Use the existing card drawing logic so the no-immediate-repeat behavior still works.
- Next Card should still be disabled when no card is currently displayed, including after deleting the active custom card.
- Respect iOS Reduce Motion settings and provide a simple non-animated fallback.

## 2. Who's Spilling? 🎀

I want people to be able to enter their names before playing so the app randomly decides who's answering each question.

Add a small player management section to the Play screen.

Features:
- Users can add player names.
- Show the current players as cute rounded name tags or stickers.
- Users can remove players.
- Save the player list using AsyncStorage so it doesn't disappear after restarting the app.
- When a new question is drawn, randomly select one of the players.
- Display a cute message above the question, such as "You're spilling the tea this round, [name]! 👀"
- If at least two players are available, avoid choosing the same player twice in a row when possible.
- If no players have been added, the game should still work normally without assigning anyone.
- Don't allow empty or whitespace-only names.
- Prevent accidentally adding duplicate names.
- If a selected player is removed, handle that gracefully without crashing or showing stale information.

Design:
- Use cute pastel name tags.
- Make the selected player's name stand out.
- Maybe add a little spotlight animation when a player gets selected.
- Keep the player management area compact, perhaps with an expandable section or modal, so the Play screen doesn't become crowded.

Please don't make this a complicated multiplayer system. No accounts or online features are needed. It's just a fun way to choose who's answering.

## 3. Cute Boba Mascot 💗

I want Tea or Dare to have its own little mascot that makes the game more memorable.

Create an adorable bubble tea character that appears on the Play screen.

Appearance:
- A small rounded milk tea cup with tapioca pearls.
- Cute eyes and little blush marks.
- A straw sticking out.
- Soft pastel colors that match the rest of the app.
- The character should look like a cute sticker, but not too childish.

Give it different expressions depending on the selected game mode:

Sweet 🍓
- Happy or blushing expression.
- A cute reaction like "Aww, that's adorable!"

Chaotic 🔥
- Shocked or laughing expression.
- A reaction like "OH??? Spill it 👀"

Spicy 🌶️
- A suspicious side-eye or mischievous smile.
- A reaction like "Now we're getting somewhere 🌶️"

Deep Talk 🌙
- A thoughtful or emotional expression.
- A reaction like "Okay, we're getting deep..."

The mascot should react when:
- Users switch game modes.
- A new card is drawn.
- Someone is randomly selected to answer.

If possible, make its eyes or expression change with a small animation.

Please make the mascot visually expressive rather than relying only on different emoji or text.

Use React Native components, simple vector shapes, or an Expo-compatible graphics library if necessary. Avoid external image URLs or unnecessary dependencies.

## Design requirements

Please keep my existing pastel pink, cream, and strawberry-red bubble tea aesthetic.

I want the app to look cute, polished, and a little playful, but still suitable for college students.

A few things that matter:
- Nice spacing and rounded corners.
- Smooth, subtle animations.
- Small decorative details without making everything too busy.
- Consistent colors between the new features and the existing screens.
- Readable English and Chinese questions.
- A clean layout on a regular iPhone.
- Scrolling where necessary so content isn't cut off.
- Buttons that are easy to tap.

I don't want three new features just stacked randomly on the screen. Please think about how they fit together and make the Play screen feel like one cohesive game.

## Important: Preserve existing features

Do NOT break or remove:
- The four game modes.
- The 40 built-in bilingual questions.
- Truth/Dare selection.
- Random card drawing and immediate-repeat prevention.
- Custom question creation and deletion.
- AsyncStorage persistence for custom cards.
- Existing two-screen navigation.
- The Next Card bug fix from my independent review.

Do not modify SPEC.md or REVIEW.md. Those files are part of my original HW10 assignment documentation.

Please make focused changes rather than rebuilding the entire app.

## Prompt log

Update the existing prompt_log.md.

- Append this entire prompt verbatim, including all instructions.
- Do not summarize or paraphrase the prompt itself.
- Record the tool as Codex in VS Code.
- Record the exact model name if you can verify it. Otherwise, leave a placeholder for me.
- Add a short summary of the actual changes and checks performed.
- Preserve all existing prompt-log entries.

## Testing

After implementing everything:
- Run TypeScript checking.
- Run relevant lint checks.
- Test the player selection logic, including avoiding immediate repeats.
- Check that player names persist in AsyncStorage.
- Check that drawing cards still respects mode and type.
- Check that the Shake animation cannot trigger overlapping draws.
- Make sure the existing custom-card logic still works.
- Check that the UI handles long Chinese and English questions.
- Preserve the existing Reduce Motion support.

If there are pre-existing warnings unrelated to these changes, report them instead of making unnecessary changes.

Do not commit or push anything.

When you're done, tell me:
1. What files you changed.
2. How the three new features work.
3. What checks passed or failed.
4. Anything I should specifically test on my iPhone.
5. Whether the full prompt was added to prompt_log.md.

Please stop after implementing these three features. Don't add unrelated features or redesign the whole app.
````

### Implementation and checks

- Added a tappable illustrated mascot that shakes, bounces its tapioca pearls, and draws from the most recently used Truth or Dare category. It has mode-specific faces and reactions, a reveal accent, a tap guard, and an immediate Reduce Motion fallback.
- Added a collapsible player panel with name validation, removable tags, and its own AsyncStorage key. Each draw highlights a random player and excludes the previous player when alternatives exist.
- TypeScript, targeted ESLint, the iOS bundle export, and `git diff --check` passed. A simulated Play and storage check covered restoring and removing players, duplicate and blank names, non-repeating picks, rapid shake taps, Reduce Motion, mode/type filtering, long bilingual card text, and deletion of the active custom card.
- Project-wide Expo lint still reports the existing error in `src/hooks/use-color-scheme.web.ts`. iPhone animation, on-device storage, and layout checks remain manual.
