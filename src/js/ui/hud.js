// HUD (Heads-Up Display) for Chemistry Dash
class HUD {
    constructor() {
        this.hudElement = document.getElementById('hud');
        this.score = 0;
        this.level = 1;
        this.collectedElements = [];
        this.currentMolecule = new Molecule();
        this.lives = 3;
        this.speed = 0;
        
        this.initializeHUD();
    }
    
    initializeHUD() {
        this.hudElement.innerHTML = `
            <div class="hud-item">
                <span class="hud-label">Score:</span>
                <span id="score-value">0</span>
            </div>
            <div class="hud-item">
                <span class="hud-label">Lives:</span>
                <span id="lives-value">3</span>
            </div>
            <div class="hud-item">
                <span class="hud-label">Level:</span>
                <span id="level-value">1</span>
            </div>
            <div class="hud-item">
                <span class="hud-label">Difficulty:</span>
                <span id="difficulty-value">Medium</span>
            </div>
            <div class="hud-item">
                <span class="hud-label">Speed:</span>
                <span id="speed-value">0</span>
            </div>
            <div class="hud-item">
                <span class="hud-label">Player Molecule:</span>
                <span id="player-molecule">Hydrogen (H)</span>
            </div>
            <div class="hud-item">
                <span class="hud-label">Elements:</span>
                <div id="collected-elements" class="collected-elements"></div>
            </div>
            <div class="controls-info" style="font-size: 12px; color: #888; margin-top: 10px; border-top: 1px solid #444; padding-top: 8px;">
                Controls: SPACE/↑ = Jump | P/ESC = Pause
            </div>
        `;
    }
    
    // Update score
    updateScore(newScore) {
        this.score = newScore;
        document.getElementById('score-value').textContent = this.score.toLocaleString();
    }
    
    // Update level
    updateLevel(newLevel) {
        this.level = newLevel;
        document.getElementById('level-value').textContent = this.level;
    }

    // Update lives
    updateLives(newLives) {
        this.lives = newLives;
        const livesElement = document.getElementById('lives-value');
        
        // Create heart symbols for lives
        let heartsDisplay = '';
        for (let i = 0; i < this.lives; i++) {
            heartsDisplay += '❤️';
        }
        // Add empty hearts for lost lives
        for (let i = this.lives; i < 3; i++) {
            heartsDisplay += '🖤';
        }
        
        livesElement.innerHTML = heartsDisplay;
        
        // Change color based on lives remaining
        if (this.lives <= 1) {
            livesElement.style.color = '#e74c3c'; // Red for critical
        } else if (this.lives <= 2) {
            livesElement.style.color = '#f39c12'; // Orange for warning
        } else {
            livesElement.style.color = '#4ecca3'; // Green for safe
        }
    }
    
    // Update player molecule display
    updatePlayerMolecule(moleculeData) {
        const playerMoleculeElement = document.getElementById('player-molecule');
        if (playerMoleculeElement && moleculeData) {
            playerMoleculeElement.textContent = `${moleculeData.name} (${moleculeData.formula})`;
        }
    }
    
    // Update speed display
    updateSpeed(newSpeed) {
        this.speed = Math.round(newSpeed * 10) / 10;
        document.getElementById('speed-value').textContent = this.speed;
    }
    
    // Update difficulty display
    updateDifficulty(difficulty) {
        const difficultyNames = {
            easy: '🟢 Easy',
            medium: '🟡 Medium', 
            hard: '🔴 Hard'
        };
        document.getElementById('difficulty-value').textContent = difficultyNames[difficulty] || difficulty;
    }

    // Add collected element
    addElement(elementSymbol) {
        this.collectedElements.push(elementSymbol);
        this.currentMolecule.addElement(elementSymbol);
        this.updateElementsDisplay();
        this.updateMoleculeDisplay();
    }
    
    // Update collected elements list (used when compounds are formed and elements are consumed)
    updateCollectedElements(newElementsList) {
        this.collectedElements = [...newElementsList];
        this.updateElementsDisplay();
        this.updateMoleculeDisplay();
    }
    
    // Update the collected elements display
    updateElementsDisplay() {
        const elementsContainer = document.getElementById('collected-elements');
        elementsContainer.innerHTML = '';
        
        // Count occurrences of each element
        const elementCounts = {};
        this.collectedElements.forEach(element => {
            elementCounts[element] = (elementCounts[element] || 0) + 1;
        });
        
        // Display each unique element with count
        Object.entries(elementCounts).forEach(([element, count]) => {
            const elementChip = document.createElement('div');
            elementChip.className = 'element-chip';
            
            const elementData = ChemistryData.elements[element];
            if (elementData) {
                elementChip.style.backgroundColor = elementData.color;
                elementChip.style.color = this.getContrastColor(elementData.color);
                elementChip.textContent = count > 1 ? `${element}${count}` : element;
                elementChip.title = `${elementData.name} (${elementData.atomicNumber})`;
            } else {
                elementChip.textContent = element;
            }
            
            elementsContainer.appendChild(elementChip);
        });
        
        if (this.collectedElements.length === 0) {
            elementsContainer.innerHTML = '<span style="color: #888;">None collected</span>';
        }
    }
    
    // Update molecule display (removed from UI)
    updateMoleculeDisplay() {
        // This method is intentionally empty since we removed the molecule display from the UI
    }
    
    // Reset HUD for new game
    reset() {
        this.score = 0;
        this.level = 1;
        this.collectedElements = [];
        this.currentMolecule = new Molecule();
        this.lives = 3;
        this.speed = 0;
        
        this.updateScore(0);
        this.updateLevel(1);
        this.updateLives(3);
        this.updateSpeed(0);
        this.updateElementsDisplay();
        this.updateMoleculeDisplay();
        this.updatePauseState(false); // Clear pause indicator
    }
    
    // Get contrast color for text
    getContrastColor(hexColor) {
        if (!hexColor || hexColor.length < 7) return '#ffffff';
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
   }

    // Update pause state display
    updatePauseState(isPaused) {
        // Add or remove pause indicator
        let pauseIndicator = document.getElementById('pause-indicator');
        
        if (isPaused) {
            if (!pauseIndicator) {
                pauseIndicator = document.createElement('div');
                pauseIndicator.id = 'pause-indicator';
                pauseIndicator.className = 'pause-indicator';
                pauseIndicator.innerHTML = '⏸️ PAUSED - Press P or ESC to resume';
                this.hudElement.appendChild(pauseIndicator);
            }
        } else {
            if (pauseIndicator) {
                pauseIndicator.remove();
            }
        }
    }
}