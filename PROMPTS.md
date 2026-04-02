# Prompts Used During Development

## Initial Game Implementation Prompt

```
crate a game which is having build a small arcade-style mobile game called Emoji Dodge.
In this game, the player controls a character positioned at the bottom of the screen and must avoid falling emojis. The objective is to survive as long as possible while obstacles continuously fall from the top of the screen.
The final result should be a complete and playable game.

6. Functional Requirements
6.1 Home Screen
The application should start with a simple home screen displaying:
Game title
Short description
Start button
Example layout:

Plain Text
Plain Text
Emoji Dodge
Avoid the falling emojis!
[ Start Game ]

Pressing Start Game should begin gameplay.
6.2 Gameplay Screen
During gameplay:
The player character appears at the bottom of the screen.
Emojis spawn randomly at the top.
Emojis continuously fall toward the bottom.
Example concept:

Plain Text
Plain Text
Score: 12
😈      😈
   😈
        🙂

The player must avoid collisions with falling emojis.
6.3 Player Movement
The player must be able to move horizontally across the screen.
Accepted control methods include:
drag gesture
tapping left/right side of screen
arrow buttons
Any method is acceptable as long as the player can avoid obstacles.
6.4 Obstacle Spawning
The game must include:
random emoji generation
spawning from the top of the screen
continuous downward movement
Multiple obstacles should appear during gameplay.
6.5 Collision Detection
If a falling emoji touches the player:
the game should end immediately
the final score should be displayed.
6.6 Scoring System
The game must include a scoring system.
Score can be calculated based on either:
survival time
or
number of obstacles avoided.
The score should be visible during gameplay.
6.7 Game Over Screen
When a collision occurs, display a game over screen.
Example:

Plain Text
Plain Text
Game Over
Score: 28
[ Play Again ]

The player should be able to restart the game.
```

## Documentation Creation Prompt

```
create
README.md
The README file must include:
project overview
technology stack used
steps to run the project
brief explanation of the development approach
11. TOOLS.md
This file must list the AI tools used during development.
Example:

Plain Text
Plain Text
AI Tools Used
ChatGPT
GitHub Copilot
Cursor

12. PROMPTS.md
This file must contain the prompts used with AI tools during development.
```