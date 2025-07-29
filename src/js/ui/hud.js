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
                <span class="hud-label">Level:</span>
                <span id="level-value">1</span>
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
            <div class="molecule-display">
                <h4>Current Molecule</h4>
                <div id="molecule-info">
                    <div id="molecule-formula">No elements</div>
                    <div id="molecule-name">Start collecting!</div>
                </div>
            </div>
            <div class="debug-controls" style="font-size: 10px; color: #888; margin-top: 10px;">
                Debug: Press N/P to advance/go back levels
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
    
    // Add collected element
    addElement(elementSymbol) {
        this.collectedElements.push(elementSymbol);
        this.currentMolecule.addElement(elementSymbol);
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
    
    // Update molecule display
    updateMoleculeDisplay() {
        const formulaElement = document.getElementById('molecule-formula');
        const nameElement = document.getElementById('molecule-name');
        
        if (this.currentMolecule.elements.length === 0) {
            formulaElement.textContent = 'No elements';
            nameElement.textContent = 'Start collecting!';
        } else {
            formulaElement.textContent = this.currentMolecule.formula;
            nameElement.textContent = this.currentMolecule.name;
            
            // Add special styling for known compounds
            if (this.currentMolecule.isKnownCompound()) {
                formulaElement.style.color = '#4ecca3';
                nameElement.style.color = '#4ecca3';
            } else {
                formulaElement.style.color = '#ffffff';
                nameElement.style.color = '#cccccc';
            }
        }
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
        this.updateSpeed(0);
        this.updateElementsDisplay();
        this.updateMoleculeDisplay();
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
}