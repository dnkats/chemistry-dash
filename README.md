# Chemistry Dash 🧪

A browser game with a chemistry theme! Navigate through a chemistry lab as different molecules, starting as a hydrogen atom and evolving into complex molecules as you progress through levels.

## 🎮 Gameplay

- **Jump**: Press `SPACE` or `UP ARROW` to jump
- **Double Jump**: Press `SPACE` again while in mid-air for a second jump
- **Debug Controls**: Press `N` to advance level / `P` to go back level (for testing molecule progression)
- **Objective**: Collect chemical elements while avoiding obstacles
- **Scoring**: Gain points for surviving, collecting elements, and forming molecules

## 🧬 Molecule Progression System

The player character evolves through different molecules as levels progress:

- **Level 1**: Hydrogen atom (H)
- **Level 2**: Hydrogen gas (H₂)
- **Level 3**: Water molecule (H₂O)
- **Level 4**: Ammonia (NH₃)
- **Level 5**: Methane (CH₄)
- **Level 6**: Methanol (CH₃OH) - Wood alcohol
- **Level 7**: Methylamine (CH₃NH₂) - Simple amine
- **Level 8**: Ethane (C₂H₆) - Two carbon chain
- **Level 9**: Ethanol (C₂H₅OH) - Drinking alcohol
- **Level 10**: Ethylamine (C₂H₅NH₂) - Primary amine
- **Level 11**: Propane (C₃H₈) - Three carbon chain
- **Level 12+**: Longer alkane chains (butane, pentane, etc.)

Each molecule is visually represented with:
- Individual atoms with element-specific colors
- Chemical bonds connecting atoms
- Animated eyes and expression on the primary atom
- Molecule name and formula displayed on level transitions

## 🧬 Features

- **Dynamic Player Character**: Progress from simple atoms to complex molecules
- **Chemistry Theme**: Authentic chemical formulas and molecular structures
- **Molecule Formation**: Collect elements to form real chemical compounds (H2O, CO2, etc.)
- **Progressive Difficulty**: Game speed increases over time
- **Visual Effects**: Particle effects, glowing elements, and smooth animations
- **Chemistry Lab Obstacles**: Avoid beakers, acid containers, flasks, and Bunsen burners
- **Educational Content**: Learn about real chemical compounds and their structures

## 🚀 Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- No additional dependencies required!

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chemistry-dash
```

2. Open the game:
```bash
# Simply open index.html in your browser
open src/index.html
# Or use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000/src/
```

## 🎨 Game Mechanics

### Player Character
- Carbon atom with animated eyes and chemistry lab coat aesthetic
- Rotates while jumping
- Glows brighter when double jump is available

### Obstacles
- **Beakers**: Laboratory glassware with liquid contents
- **Acid Containers**: Dangerous chemicals with warning symbols
- **Flasks**: Round-bottom laboratory flasks with cork stoppers
- **Bunsen Burners**: Gas burners with animated flame effects

### Collectible Elements
- 21 different periodic table elements
- Each element has authentic colors from chemistry
- Form molecules for bonus points (H2O, CO2, NH3, CH4, etc.)

### Physics
- Realistic gravity simulation
- Collision detection for obstacles and elements
- Smooth 60 FPS gameplay

## 📁 Project Structure

```
chemistry-dash/
├── src/
│   ├── index.html          # Main game file
│   ├── css/
│   │   └── styles.css      # Game styling and UI
│   └── js/
│       ├── main.js         # Game initialization
│       ├── game.js         # Core game engine
│       ├── components/
│       │   ├── player.js   # Player character class
│       │   ├── obstacle.js # Obstacle and element classes
│       │   └── molecule.js # Molecule formation logic
│       ├── ui/
│       │   ├── menu.js     # Menu system
│       │   └── hud.js      # Heads-up display
│       └── utils/
│           ├── physics.js     # Physics engine
│           └── chemistry-data.js # Periodic table data
├── assets/                 # Game assets (planned)
├── package.json           # Project metadata
└── README.md              # This file
```

## 🧪 Chemistry Education

This game incorporates real chemistry concepts:

- **Periodic Table Elements**: All 21 collectible elements use authentic chemical data
- **Molecular Formulas**: Form real chemical compounds
- **Laboratory Equipment**: Realistic chemistry lab obstacles
- **Color Coding**: Elements use standard chemistry color schemes

## 🎯 Development

### Technologies Used
- **HTML5 Canvas**: 2D graphics rendering
- **JavaScript ES6**: Game logic and physics
- **CSS3**: Styling and animations
- **Vanilla JS**: No external frameworks required

### Key Classes
- `Game`: Main game engine with game loop
- `Player`: Character with jump mechanics and physics
- `Obstacle`: Chemistry lab equipment obstacles
- `CollectibleElement`: Periodic table elements
- `Physics`: Gravity, collision detection, and movement
- `ChemistryData`: Periodic table and molecule data

## 🏆 Scoring System

- **Survival**: 10 points per obstacle passed
- **Element Collection**: 50 points per element
- **Molecule Formation**: Bonus points for completing compounds
  - Water (H2O): 100 points
  - Carbon Dioxide (CO2): 150 points
  - Ammonia (NH3): 200 points
  - Methane (CH4): 250 points
  - And more!

## 🎨 Visual Features

- **Gradient Backgrounds**: Chemistry lab atmosphere
- **Particle Effects**: Glowing elements and smooth animations
- **Responsive Design**: Adapts to different screen sizes
- **Chemistry Aesthetic**: Lab equipment and periodic table theming

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Play Now!

Ready to test your chemistry knowledge and reflexes? Open `src/index.html` in your browser and start jumping!

---

Made with ⚗️ and ❤️ for chemistry education and gaming fun!
