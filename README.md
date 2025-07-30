# Chemistry Dash 🧪

A browser-based endless runner game with a chemistry theme! Navigate through a dynamic chemistry lab as different molecules, starting as a hydrogen atom and evolving into complex molecules as you progress through levels. Features complex level topology, moving obstacles, and authentic chemistry education.

## 🎮 Gameplay

- **Jump**: Press `SPACE` or `UP ARROW` to jump
- **Double Jump**: Press `SPACE` again while in mid-air for a second jump
- **Pause/Resume**: Press `P` or `ESC` to pause the game
- **Debug Controls**: Press `N` to advance level (for testing molecule progression)
- **Touch Support**: Tap screen to jump on mobile devices
- **Objective**: Collect chemical elements while avoiding obstacles and navigating complex terrain
- **Survival**: Stay alive by avoiding hazards and not falling off-screen

## 🏗️ Complex Level Topology

The game features sophisticated level generation with:

### Solid Obstacles
- **Walls**: Impenetrable brick walls with enhanced visibility and glow effects
- **Barriers**: Energy barriers with warning stripes and visual effects
- **Horizontal Bars**: Metallic platforms you can land on but not pass through

### Dynamic Platforms
- **Moving Platforms**: Vertical and horizontal moving platforms
- **Disappearing Platforms**: Temporary platforms that vanish after use
- **Ice Platforms**: Slippery surfaces that affect movement

### Moving Hazards
- **Moving Spikes**: Vertically oscillating danger zones
- **Swinging Blades**: Pendulum-style rotating hazards
- **Floating Mines**: Circular-moving explosive obstacles

### Complex Structures
- **Corridors**: Narrow passages with walls above and below
- **Jumping Puzzles**: Multi-platform challenges requiring precise timing
- **Dead Ends**: Blocked paths forcing alternative routes
- **Maze Sections**: Multi-level structures with various pathways

## 🔄 Lives & Respawn System

- **3 Lives**: Start with three chances to survive
- **Automatic Respawn**: Fall off-screen and respawn at a safe location
- **Invulnerability**: Brief protection after taking damage
- **Visual Feedback**: Flashing effect during invulnerability periods

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

## 🎁 Molecule Bonuses

When forming molecules, players receive random bonuses:

- **Extra Life**: Gain an additional life (if not at maximum)
- **Invulnerability**: 10 seconds of damage immunity
- **Speed Reduction**: 15 seconds of slower game speed
- **Bonus Points**: 100 extra points if already at max lives

## 🧬 Features

- **Dynamic Player Character**: Progress from simple atoms to complex molecules
- **Complex Level Topology**: Walls, moving platforms, corridors, and maze-like structures
- **Advanced Obstacle System**: Moving hazards, solid barriers, and interactive platforms
- **Lives & Respawn System**: Multiple chances with automatic respawn when falling off-screen
- **Chemistry Theme**: Authentic chemical formulas and molecular structures
- **Molecule Formation**: Collect elements to form real chemical compounds (H2O, CO2, etc.)
- **Bonus System**: Random rewards for forming molecules
- **Progressive Difficulty**: Game speed and complexity increase over time
- **Enhanced Visuals**: Improved wall visibility, particle effects, and smooth animations
- **Chemistry Lab Obstacles**: Avoid beakers, acid containers, flasks, and Bunsen burners
- **Educational Content**: Learn about real chemical compounds and their structures
- **Multiple Difficulty Levels**: Easy, Medium, and Hard modes with different spawn rates

## 🎯 Difficulty Levels

### Easy Mode
- Base speed: 3
- Slower obstacle spawning (2400ms intervals)
- More common elements (2x weight multiplier)

### Medium Mode (Default)
- Base speed: 4
- Normal obstacle spawning (1800ms intervals)
- Normal element distribution

### Hard Mode
- Base speed: 5.5
- Faster obstacle spawning (1200ms intervals)
- More rare elements (0.7x weight multiplier)

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

### Enhanced Obstacle System

- **Classic Obstacles**: Beakers, acid containers, flasks, Bunsen burners
- **Solid Walls**: Impenetrable brick walls with enhanced visibility
- **Energy Barriers**: Dangerous barriers with warning stripes and glow effects
- **Moving Hazards**: Spikes, blades, and mines with various movement patterns
- **Interactive Platforms**: Moving, disappearing, and slippery surfaces

### Collectible Elements

- 21 different periodic table elements
- Each element has authentic colors from chemistry
- Form molecules for bonus points and special abilities

### Advanced Physics

- Realistic gravity simulation
- Complex collision detection for solid obstacles
- Platform landing mechanics
- Boundary detection and respawn system
- Smooth 60 FPS gameplay

## 📁 Project Structure

```
chemistry-dash/
├── index.html              # Main game entry point
├── src/
│   ├── index.html          # Game HTML file
│   ├── css/
│   │   └── styles.css      # Game styling and UI
│   └── js/
│       ├── main.js         # Game initialization
│       ├── game.js         # Core game engine with enhanced features
│       ├── components/
│       │   ├── player.js   # Player character with molecule progression
│       │   ├── obstacle.js # Enhanced obstacles with moving elements
│       │   ├── platform.js # Dynamic platform system
│       │   └── molecule.js # Collectible elements
│       ├── levels/
│       │   ├── level1.js   # Level definitions
│       │   └── level2.js   # Additional level configurations
│       ├── ui/
│       │   ├── menu.js     # Enhanced menu system with difficulty
│       │   └── hud.js      # Heads-up display with lives
│       └── utils/
│           ├── physics.js        # Advanced physics engine
│           ├── chemistry-data.js # Comprehensive periodic table data
│           ├── highscore.js     # Score tracking system
│           └── level-generator.js # Complex level generation
├── assets/                 # Game assets
│   ├── fonts/             # Font files
│   ├── audio/             # Sound effects and music
│   └── images/            # Sprites and backgrounds
├── package.json           # Project metadata
└── README.md              # This documentation
```

## 🧪 Chemistry Education

This game incorporates extensive chemistry concepts:

- **Periodic Table Elements**: All 21 collectible elements use authentic chemical data
- **Molecular Formulas**: Form real chemical compounds with proper bonding
- **Laboratory Equipment**: Realistic chemistry lab obstacles and hazards
- **Color Coding**: Elements use standard chemistry color schemes
- **Progressive Complexity**: Learn from simple atoms to complex organic molecules

## 🎯 Development

### Technologies Used

- **HTML5 Canvas**: Advanced 2D graphics rendering with complex animations
- **JavaScript ES6**: Modern game logic with classes and modules
- **CSS3**: Responsive styling and UI animations
- **Vanilla JS**: No external frameworks - pure performance

### Key Classes

- `Game`: Enhanced game engine with lives, bonuses, and complex level generation
- `Player`: Advanced character with molecule progression and physics
- `Obstacle`: Comprehensive obstacle system with moving elements and solid barriers
- `Platform`: Dynamic platform system with various behaviors
- `LevelGenerator`: Sophisticated algorithm for creating complex level structures
- `Physics`: Advanced collision detection and movement mechanics
- `ChemistryData`: Extensive periodic table and molecular data
- `HUD`: Enhanced interface with lives, molecule display, and notifications
- `Menu`: Complete menu system with difficulty selection

## 🏆 Enhanced Scoring System

- **Survival**: 10 points per obstacle passed
- **Element Collection**: 50 points per element collected
- **Molecule Formation**: Bonus points for completing compounds:
  - Water (H2O): 100 points + random bonus
  - Carbon Dioxide (CO2): 150 points + random bonus
  - Ammonia (NH3): 200 points + random bonus
  - Methane (CH4): 250 points + random bonus
  - And many more complex molecules!
- **Bonus Rewards**: Extra lives, invulnerability, or speed reduction
- **Difficulty Multiplier**: Higher scores in harder difficulty modes

## 🎨 Enhanced Visual Features

- **Dynamic Backgrounds**: Chemistry lab atmosphere with gradient effects
- **Enhanced Obstacle Visibility**: Bright walls with glow effects and improved contrast
- **Particle Effects**: Glowing elements and smooth animations
- **Advanced Rendering**: Complex obstacle patterns and moving elements
- **Responsive Design**: Adapts to different screen sizes
- **Chemistry Aesthetic**: Authentic lab equipment and periodic table theming
- **Visual Feedback**: Lives display, invulnerability effects, and bonus notifications

## 🐛 Known Issues

- None currently reported
- Active development with regular updates and improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Play Now

Ready to test your chemistry knowledge and reflexes? Open `index.html` in your browser and start jumping through the enhanced chemistry lab!

### Game Features Summary

- ✅ Complex level topology with walls, corridors, and moving platforms
- ✅ Lives and respawn system
- ✅ Enhanced obstacle visibility
- ✅ Multiple difficulty levels
- ✅ Molecule bonus system
- ✅ Advanced physics and collision detection
- ✅ Educational chemistry content

---

Made with ⚗️ and ❤️ for chemistry education and gaming fun!
