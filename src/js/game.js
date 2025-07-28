// Main Game class for Chemistry Dash
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.lastTime = 0;
        this.accumulator = 0;
        this.timeStep = 1000 / 60; // 60 FPS
        
        this.width = 800;
        this.height = 400;
        
        this.player = null;
        this.obstacles = [];
        this.elements = [];
        this.collectedElements = [];
        
        this.score = 0;
        this.speed = 4; // Slightly faster base speed
        this.spawnRate = 1800; // More frequent spawning
        this.lastSpawnTime = 0;
        this.lastElementSpawnTime = 0;
        
        this.running = false;
        this.paused = false;
        this.level = 1;
        
        this.hud = null;
        this.menu = null;
        
        // Game state
        this.gameStartTime = 0;
        this.currentTime = 0;
    }
    
    init() {
        console.log('Game: Initializing...');
        
        // Set canvas size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Create player
        this.player = new Player(80, this.height - 70); // Moved further from edge, adjusted height
        console.log('Game: Player created');
        
        // Initialize HUD
        this.hud = new HUD();
        console.log('Game: HUD created');
        
        // Initialize Menu
        this.menu = new Menu();
        this.menu.setGameInstance(this);
        console.log('Game: Menu created');
        
        // Set up controls
        this.setupControls();
        
        // Load chemistry data
        this.elementData = ChemistryData.elements;
        
        console.log('Game initialized successfully!');
    }
    
    setupControls() {
        window.addEventListener('keydown', (e) => {
            if ((e.code === 'Space' || e.code === 'ArrowUp') && this.running && !this.paused) {
                e.preventDefault();
                this.player.jump();
            }
        });
        
        // Add touch support for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.running && !this.paused) {
                this.player.jump();
            }
        });
    }
    
    start() {
        console.log('Game: Starting...');
        this.running = true;
        this.paused = false;
        this.gameStartTime = performance.now();
        this.lastTime = performance.now();
        this.lastSpawnTime = 0;
        this.lastElementSpawnTime = 0;
        
        // Reset game state
        this.reset();
        
        console.log('Game: Player position:', this.player ? `${this.player.x}, ${this.player.y}` : 'null');
        console.log('Game: Canvas size:', this.canvas.width, 'x', this.canvas.height);
        
        // Spawn initial obstacles and elements to make movement visible immediately
        this.spawnObstacle();
        this.spawnElement();
        
        console.log('Game: Initial spawn complete, obstacles:', this.obstacles.length, 'elements:', this.elements.length);
        console.log('Game: Starting game loop...');
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    stop() {
        console.log('Game: Stopping...');
        this.running = false;
        this.paused = false;
    }
    
    pause() {
        console.log('Game: Pausing...');
        this.paused = true;
    }
    
    resume() {
        console.log('Game: Resuming...');
        this.paused = false;
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    reset() {
        this.obstacles = [];
        this.elements = [];
        this.collectedElements = [];
        this.score = 0;
        this.speed = 4;
        this.level = 1;
        this.spawnRate = 1800;
        
        this.player.reset(80, this.height - 70);
        
        if (this.hud) {
            this.hud.reset();
        }
        
        console.log('Game reset!');
    }
    
    gameLoop(currentTime) {
        if (!this.running) return;
        if (this.paused) return;
        
        // Calculate delta time
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.currentTime = currentTime - this.gameStartTime;
        
        // Fixed time step accumulator
        this.accumulator += deltaTime;
        
        while (this.accumulator >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulator -= this.timeStep;
        }
        
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        // Update player
        this.player.update(deltaTime);
        
        // Handle ground collision
        if (this.player.y + this.player.height > this.height - 20) {
            this.player.y = this.height - 20 - this.player.height;
            if (!this.player.grounded) {
                // Just landed, reset jumps
                this.player.jumpsRemaining = this.player.maxJumps;
            }
            this.player.grounded = true;
            this.player.velocityY = 0;
        }
        
        // Spawn obstacles
        if (this.currentTime - this.lastSpawnTime > this.spawnRate) {
            this.spawnObstacle();
            this.lastSpawnTime = this.currentTime;
        }
        
        // Spawn elements less frequently
        if (this.currentTime - this.lastElementSpawnTime > this.spawnRate * 2) { // Even less frequent
            if (Math.random() < 0.8) { // Higher chance when they do spawn
                this.spawnElement();
            }
            this.lastElementSpawnTime = this.currentTime;
        }
        
        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.update(deltaTime, this.speed);
            
            // Remove off-screen obstacles
            if (obstacle.isOffScreen()) {
                this.obstacles.splice(i, 1);
                this.score += 10;
                continue;
            }
            
            // Check collision with player
            if (Physics.checkCollision(this.player.getBounds(), obstacle.getBounds())) {
                this.gameOver();
                return;
            }
        }
        
        // Update elements
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const element = this.elements[i];
            element.update(deltaTime, this.speed);
            
            // Remove off-screen elements
            if (element.isOffScreen()) {
                this.elements.splice(i, 1);
                continue;
            }
            
            // Check collision with player
            if (Physics.checkCollision(this.player.getBounds(), element.getBounds())) {
                this.collectElement(element);
                this.elements.splice(i, 1);
            }
        }
        
        // Increase difficulty over time
        this.speed += 0.002;
        this.spawnRate = Math.max(800, this.spawnRate - 0.5);
        
        // Level progression
        const newLevel = Math.floor(this.score / 500) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.hud.updateLevel(this.level);
        }
        
        // Update HUD
        this.hud.updateScore(this.score);
        this.hud.updateSpeed(this.speed);
    }
    
    render() {
        // Clear canvas with gradient background (restored)
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#232f3e');
        gradient.addColorStop(1, '#0f3460');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw ground with some texture
        this.ctx.fillStyle = '#4ecca3';
        this.ctx.fillRect(0, this.height - 20, this.width, 20);
        
        // Add some ground texture
        this.ctx.fillStyle = '#3db88a';
        for (let i = 0; i < this.width; i += 40) {
            this.ctx.fillRect(i, this.height - 15, 20, 10);
        }
        
        // Draw player (with fallback if player.render fails)
        if (this.player) {
            try {
                this.player.render(this.ctx);
            } catch (e) {
                console.error('Player render error:', e);
                // Fallback player rendering
                this.ctx.fillStyle = '#4ecca3';
                this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
            }
        }
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            try {
                obstacle.render(this.ctx);
            } catch (e) {
                console.error('Obstacle render error:', e);
                // Fallback obstacle rendering
                this.ctx.fillStyle = '#ff6b6b';
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
        });
        
        // Draw elements
        this.elements.forEach(element => {
            try {
                element.render(this.ctx);
            } catch (e) {
                console.error('Element render error:', e);
                // Fallback element rendering
                this.ctx.fillStyle = '#f39c12';
                this.ctx.fillRect(element.x, element.y, element.width, element.height);
            }
        });
        
        // Simplified debug information (top-right corner)
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Score: ${this.score}`, this.width - 10, 25);
        this.ctx.fillText(`Speed: ${this.speed.toFixed(1)}`, this.width - 10, 45);
        this.ctx.fillText(`Level: ${this.level}`, this.width - 10, 65);
        
        // Instructions (bottom-left)
        this.ctx.textAlign = 'left';
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.fillText('SPACE to jump (double jump available!)', 10, this.height - 30);
    }
    
    spawnObstacle() {
        const obstacleTypes = ['beaker', 'acid', 'flask'];
        const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        
        // Make obstacles more reasonable for jumping
        const height = 25 + Math.random() * 35; // Reduced from 40-100 to 25-60
        const width = 25 + Math.random() * 20;  // Reduced from 30-60 to 25-45
        
        const obstacle = new Obstacle(
            this.width,
            this.height - 20 - height, // Ground level minus obstacle height
            width,
            height,
            randomType
        );
        
        this.obstacles.push(obstacle);
    }
    
    spawnElement() {
        // Get random element
        const randomElement = ChemistryData.getRandomElement();
        
        // Make elements more accessible - spawn at various heights
        const elementHeight = 50 + Math.random() * 150; // Higher up for jumping to collect
        
        const element = new CollectibleElement(
            this.width,
            this.height - 20 - elementHeight, // From ground level
            25,
            25,
            randomElement.symbol,
            randomElement.data
        );
        
        this.elements.push(element);
    }
    
    collectElement(element) {
        this.collectedElements.push(element.symbol);
        this.score += 50;
        
        // Add to HUD
        this.hud.addElement(element.symbol);
        
        // Check for completed molecules
        const possibleMolecules = ChemistryData.checkForMolecules(this.collectedElements);
        if (possibleMolecules.length > 0) {
            // Award bonus points for completing molecules
            const bestMolecule = possibleMolecules[0];
            this.score += bestMolecule.points;
            
            console.log(`Molecule formed: ${bestMolecule.formula} - ${bestMolecule.name}`);
        }
    }
    
    gameOver() {
        this.running = false;
        
        console.log('Game Over!');
        console.log(`Final Score: ${this.score}`);
        console.log(`Elements Collected: ${this.collectedElements.length}`);
        
        // Show game over menu
        this.menu.showGameOver(
            this.score,
            this.level,
            this.collectedElements,
            this.hud.currentMolecule
        );
    }
}