// Menu system for Chemistry Dash
class Menu {
    constructor() {
        this.currentMenu = 'start';
        this.gameInstance = null;
        this.menuInitialized = false;
        this.selectedDifficulty = 'medium'; // Default difficulty
    }
    
    initializeMenus() {
        if (this.menuInitialized) return;
        
        this.createStartMenu();
        this.createDifficultyMenu();
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
            <button id="select-difficulty-button">Select Difficulty</button>
        `;
        
        document.getElementById('game-container').appendChild(startMenu);
    }
    
    createDifficultyMenu() {
        const difficultyMenu = document.createElement('div');
        difficultyMenu.className = 'menu-screen';
        difficultyMenu.id = 'difficulty-menu';
        difficultyMenu.innerHTML = `
            <h2>🎚️ Select Difficulty 🎚️</h2>
            <div class="difficulty-options">
                <div class="difficulty-option" data-difficulty="easy">
                    <h3>🟢 Easy</h3>
                    <p>• Slower obstacles</p>
                    <p>• More common elements (H, C, O)</p>
                    <p>• Lower spawn rate</p>
                    <p>• Perfect for learning!</p>
                </div>
                <div class="difficulty-option selected" data-difficulty="medium">
                    <h3>🟡 Medium</h3>
                    <p>• Balanced gameplay</p>
                    <p>• Standard element distribution</p>
                    <p>• Normal obstacle speed</p>
                    <p>• Recommended for most players</p>
                </div>
                <div class="difficulty-option" data-difficulty="hard">
                    <h3>🔴 Hard</h3>
                    <p>• Fast obstacles</p>
                    <p>• More rare elements</p>
                    <p>• Higher spawn rate</p>
                    <p>• For chemistry experts!</p>
                </div>
            </div>
            <div class="difficulty-buttons">
                <button id="start-game-button">Start Game</button>
                <button id="back-to-menu-button">Back</button>
            </div>
        `;
        
        document.getElementById('game-container').appendChild(difficultyMenu);
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
        const selectDifficultyButton = document.getElementById('select-difficulty-button');
        if (selectDifficultyButton) {
            selectDifficultyButton.addEventListener('click', () => {
                this.showMenu('difficulty-menu');
            });
        }
        
        // Difficulty menu buttons
        const startGameButton = document.getElementById('start-game-button');
        if (startGameButton) {
            startGameButton.addEventListener('click', () => {
                this.startGame();
            });
        }
        
        const backToMenuButton = document.getElementById('back-to-menu-button');
        if (backToMenuButton) {
            backToMenuButton.addEventListener('click', () => {
                this.showMainMenu();
            });
        }
        
        // Difficulty option selection
        const difficultyOptions = document.querySelectorAll('.difficulty-option');
        difficultyOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                difficultyOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                option.classList.add('selected');
                // Store selected difficulty
                this.selectedDifficulty = option.dataset.difficulty;
                console.log('Difficulty selected:', this.selectedDifficulty);
            });
        });
        
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
        console.log('Menu: Starting game with difficulty:', this.selectedDifficulty);
        this.hideAllMenus();
        if (this.gameInstance) {
            this.gameInstance.setDifficulty(this.selectedDifficulty);
            this.gameInstance.start();
        }
    }
    
    // Restart the game
    restartGame() {
        this.hideAllMenus();
        if (this.gameInstance) {
            this.gameInstance.setDifficulty(this.selectedDifficulty);
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
    showGameOver(score, level, collectedElements, finalMolecule, formedMolecules = []) {
        this.updateGameOverDisplay(score, level, collectedElements, finalMolecule, formedMolecules);
        this.showMenu('game-over-menu');
    }
    
    // Update game over display with results
    updateGameOverDisplay(score, level, collectedElements, finalMolecule, formedMolecules = []) {
        const finalScoreEl = document.getElementById('final-score');
        const finalLevelEl = document.getElementById('final-level');
        
        if (finalScoreEl) finalScoreEl.textContent = `Score: ${score.toLocaleString()}`;
        if (finalLevelEl) finalLevelEl.textContent = `Level: ${level}`;
        
        // Update molecule summary to show formed molecules and remaining atoms
        const moleculeSummary = document.getElementById('molecule-summary');
        if (moleculeSummary) {
            let summaryHTML = '';
            
            // Show formed molecules (compounds)
            if (formedMolecules.length > 0) {
                summaryHTML += `<div style="margin-bottom: 15px;"><strong>Formed Molecules (${formedMolecules.length}):</strong></div>`;
                formedMolecules.forEach(molecule => {
                    summaryHTML += `
                        <div style="background: rgba(78, 204, 163, 0.1); border: 1px solid #4ecca3; border-radius: 5px; padding: 8px; margin: 5px 0;">
                            <div style="font-size: 16px; color: #4ecca3;">${molecule.formula}</div>
                            <div style="font-size: 12px; color: #cccccc;">${molecule.name}</div>
                            <div style="font-size: 10px; color: #aaa;">+${molecule.points} points</div>
                        </div>
                    `;
                });
            }
            
            // Show remaining individual atoms
            if (finalMolecule && finalMolecule.elements.length > 0) {
                if (formedMolecules.length > 0) {
                    summaryHTML += '<div style="margin: 15px 0 10px 0;"><strong>Remaining Atoms:</strong></div>';
                }
                summaryHTML += `
                    <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid #666; border-radius: 5px; padding: 8px;">
                        <div style="font-size: 16px; color: #ffffff;">${finalMolecule.formula}</div>
                        <div style="font-size: 12px; color: #cccccc;">${finalMolecule.name}</div>
                        <div style="color: #aaa; font-size: 10px;">
                            ${finalMolecule.elements.length} atoms
                        </div>
                    </div>
                `;
            }
            
            // If no molecules were formed and no atoms collected
            if (formedMolecules.length === 0 && (!finalMolecule || finalMolecule.elements.length === 0)) {
                summaryHTML = '<div style="color: #aaa;">No elements collected</div>';
            }
            
            moleculeSummary.innerHTML = summaryHTML;
        }
    }
    
    // Set game instance reference
    setGameInstance(gameInstance) {
        this.gameInstance = gameInstance;
        this.initializeMenus();
    }
}