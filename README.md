# Battle Facilities Assistant

Pokemon Battle Facilities probability calculator for Emerald (Gen III), Platinum/HeartGold/SoulSilver (Gen IV), and Black/White/Black2/White2 Battle Subway (Gen V).

## Setup Instructions

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (LTS version recommended)
   - Verify installation: `node --version` and `npm --version`

2. **Install dependencies**
   ```bash
   cd battle-frontier-app
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at http://localhost:3000
   - If it doesn't open automatically, navigate to that URL manually

## How to Use

1. Select **Generation III** (Emerald), **Generation IV** (PtHGSS), or **Generation V** (BW/BW2 Subway)
2. For Gen III only: Select **Level 50** or **Level 100**
3. Search for and select a trainer
4. View initial probabilities and alarm stats
5. Click on a Pokemon species card to see all possible sets
6. Select the specific set you encountered
7. Repeat for Pokemon #2 and #3
8. The probabilities update after each selection

## Features

- **Multi-Generation Support**: Switch between Gen III, IV, and V
- **Level Selection**: Gen III supports both Level 50 and 100 (Gen IV & V are always Level 50)
- **Pokemon Sprites**: Visual identification with official sprites (Gen I-V)
- **Alarm Warnings**: Highlights sets with dangerous moves
- **Generation-Specific Alarms**: Different alarm sets for each generation
- **Probability Calculations**: Shows exact odds for each remaining Pokemon
- **Gray-out 0% sets**: Impossible sets are grayed out for easy identification
- **Dark Theme**: Easy on the eyes for late-night gaming

## Generation Differences

### Gen III (Emerald)
- Alarm 1: Sheer Cold, Horn Drill, Fissure, Guillotine, Reversal
- Alarm 2: Swords Dance, Dragon Dance, Double Team
- Alarm 3: Counter, Mirror Coat, Psych Up
- Alarm Items: BrightPowder, Lax Incense, Quick Claw
- Entry limits: ≤850 for Level 50, all sets for Level 100

### Gen IV (HGSS)
- Alarm 1: Sheer Cold, Horn Drill, Fissure, Guillotine, Reversal
- Alarm 2: Swords Dance, Dragon Dance, Double Team
- Alarm 3: Counter, Mirror Coat, Psych Up
- Alarm Items: Brightpowder, Lax Incense, Focus Sash, Choice Scarf, Quick Claw
- Entry limit: ≤1000 (always Level 50)

### Gen V (B/W Battle Subway)
- Alarm 1 (Priority Moves): Fake Out, Quick Attack, Mach Punch, Bullet Punch, Aqua Jet, Ice Shard, Shadow Sneak, Sucker Punch, ExtremeSpeed
- Alarm 2 (Weather/TR): Rain Dance, Hail, Trick Room, Sunny Day, Sandstorm
- Alarm 3: Counter, Mirror Coat, Fling
- Alarm Items: Brightpowder, Lax Incense, Focus Sash, Choice Scarf, Quick Claw
- Entry limit: ≤1000 (always Level 50)

## Project Structure

```
battle-frontier-app/
├── package.json          # Dependencies and scripts
├── public/
│   └── index.html       # HTML template
└── src/
    ├── index.js         # React entry point
    ├── App.js           # Main application component
    └── data.js          # Pokemon and trainer data
```

## Troubleshooting

- **Port already in use**: If port 3000 is taken, the app will prompt to use another port
- **npm install fails**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- **Sprites not loading**: Check your internet connection (sprites load from GitHub)

## Contributing

Found a bug or have a suggestion? DM me @ em_baby (Discord) or potatobagel (Smogon)
