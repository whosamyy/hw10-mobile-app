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
