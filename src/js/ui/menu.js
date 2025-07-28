// Menu system for Chemistry Dash
class Menu {
    constructor() {
        this.currentMenu = 'start';
        this.gameInstance = null;
        this.menuInitialized = false;
    }
    
    initializeMenus() {
        if (this.menuInitialized) return;
        
        this.createStartMenu();
        this.createGameOverMenu();
        this.setupEventListeners();
        this.menuInitialized = true;
    }
    
    createStartMenu() {
        const startMenu = document.createElement('div');
        startMenu.className = 'menu-screen active';
        startMenu.id = 'start-menu';
        startMenu.innerHTML = `
            <h2>🧪 Chemistry Dash 🧪</h2>
            <p>Collect chemical elements and build molecules!</p>
            <div style="margin: 20px 0;">
                <p>🎮 <strong>How to Play:</strong></p>
                <p>• Use SPACE or UP ARROW to jump</p>
                <p>• Collect elements to build molecules</p>
                <p>• Avoid chemistry lab obstacles</p>
                <p>• Form known compounds for bonus points!</p>
            </div>
            <button id="start-button">Start Game</button>
        `;
        
        document.getElementById('game-container').appendChild(startMenu);
    }
    
    createGameOverMenu() {
        const gameOverMenu = document.createElement('div');
        gameOverMenu.className = 'menu-screen';
        gameOverMenu.id = 'game-over-menu';
        gameOverMenu.innerHTML = `
            <h2>⚗️ Lab Accident! ⚗️</h2>
            <div id="final-score-display">
                <div id="final-score">Score: 0</div>
                <div id="final-level">Level: 1</div>
            </div>
            <div id="final-molecule" class="molecule-display">
                <h3>Your Final Molecule</h3>
                <div id="molecule-summary">No elements collected</div>
            </div>
            <button id="restart-button">Try Again</button>
            <button id="main-menu-button">Main Menu</button>
        `;
        
        document.getElementById('game-container').appendChild(gameOverMenu);
    }
    
    setupEventListeners() {
        // Start menu buttons
        const startButton = document.getElementById('start-button');
        if (startButton) {
            startButton.addEventListener('click', () => {
                console.log('Start button clicked');
                this.startGame();
            });
        }
        
        // Game over menu buttons
        const restartButton = document.getElementById('restart-button');
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                this.restartGame();
            });
        }
        
        const mainMenuButton = document.getElementById('main-menu-button');
        if (mainMenuButton) {
            mainMenuButton.addEventListener('click', () => {
                this.showMainMenu();
            });
        }
    }
    
    // Show a specific menu
    showMenu(menuId) {
        this.hideAllMenus();
        const menu = document.getElementById(menuId);
        if (menu) {
            menu.classList.add('active');
            this.currentMenu = menuId.replace('-menu', '');
        }
    }
    
    // Hide all menus
    hideAllMenus() {
        const menus = document.querySelectorAll('.menu-screen');
        menus.forEach(menu => {
            menu.classList.remove('active');
        });
    }
    
    // Start the game
    startGame() {
        console.log('Menu: Starting game...');
        this.hideAllMenus();
        if (this.gameInstance) {
            this.gameInstance.start();
        }
    }
    
    // Restart the game
    restartGame() {
        this.hideAllMenus();
        if (this.gameInstance) {
            this.gameInstance.reset();
            this.gameInstance.start();
        }
    }
    
    // Show main menu
    showMainMenu() {
        this.showMenu('start-menu');
        if (this.gameInstance) {
            this.gameInstance.stop();
        }
    }
    
    // Show game over screen with results
    showGameOver(score, level, collectedElements, finalMolecule) {
        this.updateGameOverDisplay(score, level, collectedElements, finalMolecule);
        this.showMenu('game-over-menu');
    }
    
    // Update game over display with results
    updateGameOverDisplay(score, level, collectedElements, finalMolecule) {
        const finalScoreEl = document.getElementById('final-score');
        const finalLevelEl = document.getElementById('final-level');
        
        if (finalScoreEl) finalScoreEl.textContent = `Score: ${score.toLocaleString()}`;
        if (finalLevelEl) finalLevelEl.textContent = `Level: ${level}`;
        
        // Update molecule summary
        const moleculeSummary = document.getElementById('molecule-summary');
        if (moleculeSummary) {
            if (finalMolecule && finalMolecule.elements.length > 0) {
                moleculeSummary.innerHTML = `
                    <div style="font-size: 20px; margin-bottom: 10px;">${finalMolecule.formula}</div>
                    <div>${finalMolecule.name}</div>
                    <div style="color: #aaa; font-size: 12px;">
                        ${finalMolecule.elements.length} atoms
                    </div>
                `;
            } else {
                moleculeSummary.textContent = 'No elements collected';
            }
        }
    }
    
    // Set game instance reference
    setGameInstance(gameInstance) {
        this.gameInstance = gameInstance;
        this.initializeMenus();
    }
}