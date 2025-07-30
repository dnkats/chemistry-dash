// Menu system for Chemistry Dash
class Menu {
    constructor() {
        this.currentMenu = 'start';
        this.gameInstance = null;
        this.menuInitialized = false;
        this.selectedDifficulty = 'medium'; // Default difficulty
        this.highScoreManager = new HighScoreManager();
    }
    
    initializeMenus() {
        if (this.menuInitialized) return;
        
        this.createStartMenu();
        this.createDifficultyMenu();
        this.createHighScoreMenu();
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
            <button id="select-difficulty-button">Start Game</button>
            <button id="view-highscores-button">High Scores</button>
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

    createHighScoreMenu() {
        const highScoreMenu = document.createElement('div');
        highScoreMenu.className = 'menu-screen';
        highScoreMenu.id = 'highscore-menu';
        highScoreMenu.innerHTML = `
            <h2>🏆 High Scores 🏆</h2>
            <div class="highscore-filters">
                <button class="difficulty-filter active" data-filter="all">All</button>
                <button class="difficulty-filter" data-filter="easy">🟢 Easy</button>
                <button class="difficulty-filter" data-filter="medium">🟡 Medium</button>
                <button class="difficulty-filter" data-filter="hard">🔴 Hard</button>
            </div>
            <div id="highscore-list" class="highscore-list">
                <!-- High scores will be populated here -->
            </div>
            <div class="highscore-stats" id="highscore-stats">
                <!-- Stats will be populated here -->
            </div>
            <div class="menu-buttons">
                <button id="clear-scores-button" style="background-color: #dc3545;">Clear Scores</button>
                <button id="back-from-highscores-button">Back to Menu</button>
            </div>
        `;
        
        document.getElementById('game-container').appendChild(highScoreMenu);
    }

    createGameOverMenu() {
        const gameOverMenu = document.createElement('div');
        gameOverMenu.className = 'menu-screen';
        gameOverMenu.id = 'game-over-menu';
        gameOverMenu.innerHTML = `
            <h2>⚗️ Lab Accident! ⚗️</h2>
            <div id="highscore-notification" class="highscore-notification" style="display: none;">
                <h3>🎉 New High Score! 🎉</h3>
                <div id="highscore-rank"></div>
                <div style="margin: 10px 0;">
                    <input type="text" id="player-name-input" placeholder="Enter your name" maxlength="20" style="padding: 8px; border: 1px solid #666; background: #333; color: white; border-radius: 4px;">
                    <button id="save-highscore-button" style="margin-left: 8px;">Save</button>
                </div>
            </div>
            <div id="final-score-display">
                <div id="final-score">Score: 0</div>
                <div id="final-level">Level: 1</div>
            </div>
            <div id="final-molecule" class="molecule-display">
                <h3>Your Final Molecule</h3>
                <div id="molecule-summary">No elements collected</div>
            </div>
            <button id="view-scores-button">View High Scores</button>
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

        const viewHighscoresButton = document.getElementById('view-highscores-button');
        if (viewHighscoresButton) {
            viewHighscoresButton.addEventListener('click', () => {
                this.showHighScores();
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

        // High score menu buttons
        const backFromHighscoresButton = document.getElementById('back-from-highscores-button');
        if (backFromHighscoresButton) {
            backFromHighscoresButton.addEventListener('click', () => {
                this.showMainMenu();
            });
        }

        const clearScoresButton = document.getElementById('clear-scores-button');
        if (clearScoresButton) {
            clearScoresButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all high scores? This cannot be undone.')) {
                    this.highScoreManager.clearHighScores();
                    this.updateHighScoreDisplay();
                }
            });
        }

        // Difficulty filter buttons
        const difficultyFilters = document.querySelectorAll('.difficulty-filter');
        difficultyFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                difficultyFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                this.updateHighScoreDisplay(filter.dataset.filter);
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

        const viewScoresButton = document.getElementById('view-scores-button');
        if (viewScoresButton) {
            viewScoresButton.addEventListener('click', () => {
                this.showHighScores();
            });
        }

        // High score save functionality
        const saveHighscoreButton = document.getElementById('save-highscore-button');
        if (saveHighscoreButton) {
            saveHighscoreButton.addEventListener('click', () => {
                this.saveHighScore();
            });
        }

        const playerNameInput = document.getElementById('player-name-input');
        if (playerNameInput) {
            playerNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveHighScore();
                }
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
    showGameOver(score, level, collectedElements, finalMolecule, formedMolecules = [], livesRemaining = 0) {
        // Check if this is a high score
        const scoreData = {
            score: score,
            level: level,
            difficulty: this.selectedDifficulty,
            formedMolecules: formedMolecules,
            elementsCollected: collectedElements ? collectedElements.length : 0,
            livesRemaining: livesRemaining
        };

        const isHighScore = this.highScoreManager.isHighScore(score);
        
        this.updateGameOverDisplay(score, level, collectedElements, finalMolecule, formedMolecules);
        
        // Show high score notification if applicable
        if (isHighScore) {
            this.showHighScoreNotification(scoreData);
        }
        
        this.showMenu('game-over-menu');
    }

    // Show high score notification
    showHighScoreNotification(scoreData) {
        const notification = document.getElementById('highscore-notification');
        const rankElement = document.getElementById('highscore-rank');
        const nameInput = document.getElementById('player-name-input');
        
        if (notification && rankElement && nameInput) {
            // Calculate what rank this would be
            const tempScores = [...this.highScoreManager.getHighScores(), { score: scoreData.score }];
            tempScores.sort((a, b) => b.score - a.score);
            const rank = tempScores.findIndex(s => s.score === scoreData.score) + 1;
            
            rankElement.textContent = `Rank #${rank} with ${this.highScoreManager.formatScore(scoreData.score)} points!`;
            nameInput.value = '';
            nameInput.focus();
            notification.style.display = 'block';
            
            // Store score data for saving
            this.pendingHighScore = scoreData;
        }
    }

    // Save high score with player name
    saveHighScore() {
        const nameInput = document.getElementById('player-name-input');
        const notification = document.getElementById('highscore-notification');
        
        if (this.pendingHighScore && nameInput) {
            const playerName = nameInput.value.trim() || 'Anonymous';
            this.pendingHighScore.playerName = playerName;
            
            this.highScoreManager.addScore(this.pendingHighScore);
            
            if (notification) {
                notification.style.display = 'none';
            }
            
            this.pendingHighScore = null;
        }
    }

    // Show high scores menu
    showHighScores() {
        this.updateHighScoreDisplay();
        this.showMenu('highscore-menu');
    }

    // Update high score display
    updateHighScoreDisplay(filter = 'all') {
        const highScoreList = document.getElementById('highscore-list');
        const statsContainer = document.getElementById('highscore-stats');
        
        if (!highScoreList || !statsContainer) return;
        
        let scores;
        if (filter === 'all') {
            scores = this.highScoreManager.getHighScores();
        } else {
            scores = this.highScoreManager.getHighScoresByDifficulty(filter);
        }
        
        // Display scores
        if (scores.length === 0) {
            highScoreList.innerHTML = '<div class="no-scores">No high scores yet! Start playing to set your first record!</div>';
        } else {
            let scoresHTML = '';
            scores.forEach((score, index) => {
                scoresHTML += `
                    <div class="highscore-entry ${index < 3 ? 'top-three' : ''}">
                        <div class="rank">#${index + 1}</div>
                        <div class="score-details">
                            <div class="player-name">${score.playerName}</div>
                            <div class="score-info">
                                <span class="score">${this.highScoreManager.formatScore(score.score)}</span>
                                <span class="difficulty">${this.highScoreManager.getDifficultyEmoji(score.difficulty)} ${score.difficulty}</span>
                                <span class="level">Level ${score.level}</span>
                            </div>
                            <div class="molecules-formed">
                                ${score.formedMolecules?.length || 0} molecules formed
                            </div>
                            <div class="date">${this.highScoreManager.formatDate(score.date)}</div>
                        </div>
                    </div>
                `;
            });
            highScoreList.innerHTML = scoresHTML;
        }
        
        // Display stats
        const stats = this.highScoreManager.getStats();
        statsContainer.innerHTML = `
            <h3>📊 Statistics</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${stats.totalGames}</div>
                    <div class="stat-label">Games Played</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.highScoreManager.formatScore(stats.bestScore)}</div>
                    <div class="stat-label">Best Score</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.highScoreManager.formatScore(stats.averageScore)}</div>
                    <div class="stat-label">Average Score</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${stats.totalMolecules}</div>
                    <div class="stat-label">Total Molecules</div>
                </div>
            </div>
        `;
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