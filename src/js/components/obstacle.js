// Obstacle class for Chemistry Dash
class Obstacle {
    constructor(x, y, width, height, type = 'beaker') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.velocityX = 0;
        this.velocityY = 0;
        
        // Moving obstacle properties
        this.moving = false;
        this.movementType = 'none'; // 'vertical', 'horizontal', 'circular', 'pendulum'
        this.movementSpeed = 0;
        this.movementRange = 0;
        this.movementCenter = { x: x, y: y };
        this.movementTime = 0;
        this.originalX = x;
        this.originalY = y;
        
        // Impenetrable walls and barriers
        this.impenetrable = false;
        this.solid = false; // For walls that block movement completely
        
        // Visual properties based on type
        this.setObstacleProperties();
    }
    
    setObstacleProperties() {
        switch(this.type) {
            case 'beaker':
                this.color = '#ff6b6b';
                this.accentColor = '#ff8e8e';
                this.dangerLevel = 'high';
                break;
            case 'acid':
                this.color = '#f39c12';
                this.accentColor = '#f1c40f';
                this.dangerLevel = 'extreme';
                break;
            case 'burner':
                this.color = '#e74c3c';
                this.accentColor = '#ff7675';
                this.dangerLevel = 'high';
                break;
            case 'flask':
                this.color = '#9b59b6';
                this.accentColor = '#bb6bd9';
                this.dangerLevel = 'medium';
                break;
            case 'wall':
                this.color = '#7f8c8d';
                this.accentColor = '#95a5a6';
                this.dangerLevel = 'none';
                this.impenetrable = true;
                this.solid = true;
                break;
            case 'barrier':
                this.color = '#e74c3c';
                this.accentColor = '#c0392b';
                this.dangerLevel = 'extreme';
                this.impenetrable = true;
                this.solid = true;
                break;
            case 'moving_spike':
                this.color = '#8e44ad';
                this.accentColor = '#9b59b6';
                this.dangerLevel = 'extreme';
                this.moving = true;
                this.movementType = 'vertical';
                this.movementSpeed = 2;
                this.movementRange = 80;
                break;
            case 'swinging_blade':
                this.color = '#95a5a6';
                this.accentColor = '#bdc3c7';
                this.dangerLevel = 'extreme';
                this.moving = true;
                this.movementType = 'pendulum';
                this.movementSpeed = 1.5;
                this.movementRange = 60;
                break;
            case 'floating_mine':
                this.color = '#e67e22';
                this.accentColor = '#f39c12';
                this.dangerLevel = 'extreme';
                this.moving = true;
                this.movementType = 'circular';
                this.movementSpeed = 1;
                this.movementRange = 40;
                break;
            case 'horizontal_bar':
                this.color = '#95a5a6';
                this.accentColor = '#bdc3c7';
                this.dangerLevel = 'none';
                this.impenetrable = true;
                this.solid = true;
                break;
            default:
                this.color = '#95a5a6';
                this.accentColor = '#bdc3c7';
                this.dangerLevel = 'low';
        }
    }
    
    update(deltaTime, gameSpeed) {
        // Move obstacle to the left
        this.x -= gameSpeed;
        
        // Handle moving obstacles
        if (this.moving) {
            this.movementTime += deltaTime * 0.001; // Convert to seconds
            
            switch(this.movementType) {
                case 'vertical':
                    this.y = this.originalY + Math.sin(this.movementTime * this.movementSpeed) * this.movementRange;
                    break;
                case 'horizontal':
                    this.x += Math.sin(this.movementTime * this.movementSpeed) * this.movementSpeed;
                    break;
                case 'circular':
                    const circleX = Math.cos(this.movementTime * this.movementSpeed) * this.movementRange;
                    const circleY = Math.sin(this.movementTime * this.movementSpeed) * this.movementRange;
                    this.x = this.originalX + circleX - gameSpeed; // Adjust for game movement
                    this.y = this.originalY + circleY;
                    break;
                case 'pendulum':
                    const pendulumAngle = Math.sin(this.movementTime * this.movementSpeed) * Math.PI / 3; // 60 degree swing
                    this.x = this.originalX + Math.sin(pendulumAngle) * this.movementRange - gameSpeed;
                    this.y = this.originalY + Math.cos(pendulumAngle) * this.movementRange;
                    break;
            }
        }
        
        // Add some visual effects based on type
        if (this.type === 'acid') {
            // Bubbling effect for acid
            this.bubbleOffset = Math.sin(Date.now() * 0.01) * 2;
        }
    }
    
    render(ctx) {
        ctx.save();
        
        switch(this.type) {
            case 'beaker':
                this.renderBeaker(ctx);
                break;
            case 'acid':
                this.renderAcid(ctx);
                break;
            case 'burner':
                this.renderBurner(ctx);
                break;
            case 'flask':
                this.renderFlask(ctx);
                break;
            case 'wall':
                this.renderWall(ctx);
                break;
            case 'barrier':
                this.renderBarrier(ctx);
                break;
            case 'moving_spike':
                this.renderMovingSpike(ctx);
                break;
            case 'swinging_blade':
                this.renderSwingingBlade(ctx);
                break;
            case 'floating_mine':
                this.renderFloatingMine(ctx);
                break;
            case 'horizontal_bar':
                this.renderHorizontalBar(ctx);
                break;
            default:
                this.renderGeneric(ctx);
        }
        
        ctx.restore();
    }
    
    renderBeaker(ctx) {
        // Draw beaker body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 5, this.y, this.width - 10, this.height);
        
        // Draw beaker base
        ctx.fillStyle = this.accentColor;
        ctx.fillRect(this.x, this.y + this.height - 10, this.width, 10);
        
        // Draw liquid inside
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(this.x + 8, this.y + 5, this.width - 16, this.height - 15);
        
        // Draw handle
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x + this.width, this.y + this.height/2, 8, Math.PI/2, 3*Math.PI/2);
        ctx.stroke();
    }
    
    renderAcid(ctx) {
        // Draw acid container
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw bubbling effect
        const bubbleY = this.y + (this.bubbleOffset || 0);
        ctx.fillStyle = this.accentColor;
        ctx.beginPath();
        ctx.arc(this.x + this.width/4, bubbleY + 10, 3, 0, Math.PI * 2);
        ctx.arc(this.x + 3*this.width/4, bubbleY + 15, 2, 0, Math.PI * 2);
        ctx.arc(this.x + this.width/2, bubbleY + 8, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw warning label
        ctx.fillStyle = '#000';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚠', this.x + this.width/2, this.y + this.height/2);
    }
    
    renderFlask(ctx) {
        // Draw flask neck
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + this.width/3, this.y, this.width/3, this.height/3);
        
        // Draw flask body (wider bottom)
        ctx.fillRect(this.x, this.y + this.height/3, this.width, 2*this.height/3);
        
        // Draw liquid inside
        ctx.fillStyle = this.accentColor;
        ctx.fillRect(this.x + 3, this.y + this.height/2, this.width - 6, this.height/2 - 3);
        
        // Draw cork/stopper
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x + this.width/3 + 2, this.y - 3, this.width/3 - 4, 6);
    }
    
    renderBurner(ctx) {
        // Draw burner base
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y + this.height - 15, this.width, 15);
        
        // Draw burner stand
        ctx.fillStyle = this.accentColor;
        ctx.fillRect(this.x + 5, this.y + this.height/2, this.width - 10, 3);
        ctx.fillRect(this.x + this.width/2 - 2, this.y + this.height/2, 4, this.height/2 - 15);
        
        // Draw flame effect
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const flameX = this.x + this.width/4 + i * this.width/4;
            const flameHeight = 15 + Math.sin(Date.now() * 0.01 + i) * 3;
            ctx.ellipse(flameX, this.y + this.height/2 - flameHeight/2, 3, flameHeight, 0, 0, Math.PI * 2);
        }
        ctx.fill();
        
        // Draw inner flame
        ctx.fillStyle = '#ffeb3b';
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const flameX = this.x + this.width/4 + i * this.width/4;
            const flameHeight = 8 + Math.sin(Date.now() * 0.01 + i) * 2;
            ctx.ellipse(flameX, this.y + this.height/2 - flameHeight/2, 2, flameHeight, 0, 0, Math.PI * 2);
        }
        ctx.fill();
    }
    
    renderGeneric(ctx) {
        // Simple rectangle obstacle
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add border
        ctx.strokeStyle = this.accentColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    
    renderWall(ctx) {
        // Solid brick-like wall with enhanced visibility
        
        // Add outer glow for better visibility
        ctx.shadowColor = '#ecf0f1';
        ctx.shadowBlur = 8;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Reset shadow for brick pattern
        ctx.shadowBlur = 0;
        
        // Draw brick pattern with thicker lines
        ctx.strokeStyle = '#bdc3c7';
        ctx.lineWidth = 2;
        
        const brickHeight = 20;
        const brickWidth = 40;
        
        for (let row = 0; row < this.height / brickHeight; row++) {
            for (let col = 0; col < this.width / brickWidth; col++) {
                const offsetX = (row % 2) * (brickWidth / 2);
                const brickX = this.x + col * brickWidth + offsetX;
                const brickY = this.y + row * brickHeight;
                
                if (brickX < this.x + this.width && brickY < this.y + this.height) {
                    ctx.strokeRect(brickX, brickY, Math.min(brickWidth, this.x + this.width - brickX), brickHeight);
                }
            }
        }
        
        // Add bright border for maximum visibility
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Add corner highlights
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x, this.y, 5, 5);
        ctx.fillRect(this.x + this.width - 5, this.y, 5, 5);
        ctx.fillRect(this.x, this.y + this.height - 5, 5, 5);
        ctx.fillRect(this.x + this.width - 5, this.y + this.height - 5, 5, 5);
    }
    
    renderBarrier(ctx) {
        // Energy barrier
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add warning stripes
        ctx.fillStyle = '#f1c40f';
        const stripeWidth = 10;
        for (let i = 0; i < this.width; i += stripeWidth * 2) {
            ctx.fillRect(this.x + i, this.y, stripeWidth, this.height);
        }
        
        // Add glow effect
        ctx.shadowColor = this.accentColor;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = this.accentColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    
    renderMovingSpike(ctx) {
        // Draw spike shape
        ctx.fillStyle = this.color;
        
        // Main spike body
        ctx.fillRect(this.x + 5, this.y + 10, this.width - 10, this.height - 10);
        
        // Spike points
        ctx.beginPath();
        for (let i = 0; i < this.width - 10; i += 8) {
            ctx.moveTo(this.x + 5 + i, this.y + 10);
            ctx.lineTo(this.x + 5 + i + 4, this.y);
            ctx.lineTo(this.x + 5 + i + 8, this.y + 10);
        }
        ctx.fill();
        
        // Add metallic shine
        ctx.fillStyle = this.accentColor;
        ctx.fillRect(this.x + 7, this.y + 12, 2, this.height - 14);
    }
    
    renderSwingingBlade(ctx) {
        // Draw blade attachment point
        ctx.fillStyle = '#34495e';
        ctx.fillRect(this.x + this.width/2 - 2, this.y - 10, 4, 10);
        
        // Draw blade
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add blade edge
        ctx.fillStyle = this.accentColor;
        ctx.fillRect(this.x, this.y, this.width, 3);
        
        // Add warning glow
        ctx.shadowColor = '#e74c3c';
        ctx.shadowBlur = 8;
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    
    renderFloatingMine(ctx) {
        // Draw main mine body (circle)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw spikes around the mine
        ctx.fillStyle = this.accentColor;
        const spikeCount = 8;
        const centerX = this.x + this.width/2;
        const centerY = this.y + this.height/2;
        const radius = this.width/2;
        
        for (let i = 0; i < spikeCount; i++) {
            const angle = (i / spikeCount) * Math.PI * 2;
            const spikeX = centerX + Math.cos(angle) * radius;
            const spikeY = centerY + Math.sin(angle) * radius;
            const spikeEndX = centerX + Math.cos(angle) * (radius + 8);
            const spikeEndY = centerY + Math.sin(angle) * (radius + 8);
            
            ctx.beginPath();
            ctx.moveTo(spikeX, spikeY);
            ctx.lineTo(spikeEndX, spikeEndY);
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        // Add pulsing glow
        const pulseIntensity = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;
        ctx.shadowColor = this.accentColor;
        ctx.shadowBlur = 15 * pulseIntensity;
        ctx.strokeStyle = this.accentColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    renderHorizontalBar(ctx) {
        // Draw horizontal bar (impenetrable platform) with enhanced visibility
        
        // Add outer glow
        ctx.shadowColor = '#ecf0f1';
        ctx.shadowBlur = 6;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Add bright metallic texture highlights
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(this.x, this.y, this.width, 4);
        ctx.fillRect(this.x, this.y + this.height - 4, this.width, 4);
        
        // Add center highlight stripe
        ctx.fillRect(this.x, this.y + this.height/2 - 1, this.width, 2);
        
        // Add rivets for industrial look with bright color
        const rivetSpacing = 30;
        ctx.fillStyle = '#ffffff';
        for (let i = rivetSpacing; i < this.width; i += rivetSpacing) {
            ctx.beginPath();
            ctx.arc(this.x + i, this.y + this.height/2, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Add rivet shadow
            ctx.fillStyle = '#34495e';
            ctx.beginPath();
            ctx.arc(this.x + i + 1, this.y + this.height/2 + 1, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
        }
        
        // Add bright border
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    
    // Get bounding box for collision detection
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    // Check if obstacle is off screen
    isOffScreen() {
        return this.x + this.width < 0;
    }
}

// Collectible Element class
class CollectibleElement {
    constructor(x, y, width, height, symbol, elementData) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.symbol = symbol;
        this.elementData = elementData;
        this.velocityX = 0;
        this.velocityY = 0;
        
        // Animation properties
        this.rotationAngle = 0;
        this.pulseScale = 1;
        this.glowIntensity = 0.5;
    }
    
    update(deltaTime, gameSpeed) {
        // Move element to the left
        this.x -= gameSpeed;
        
        // Update animations
        this.rotationAngle += deltaTime * 0.002;
        this.pulseScale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
        this.glowIntensity = 0.5 + Math.sin(Date.now() * 0.003) * 0.3;
    }
    
    render(ctx) {
        ctx.save();
        
        // Move to center for rotation
        const centerX = this.x + this.width/2;
        const centerY = this.y + this.height/2;
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotationAngle);
        ctx.scale(this.pulseScale, this.pulseScale);
        
        // Draw glow effect
        ctx.shadowColor = this.elementData.color;
        ctx.shadowBlur = 15 * this.glowIntensity;
        
        // Draw element background (periodic table style)
        ctx.fillStyle = this.elementData.color;
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        
        // Draw border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
        
        // Draw element symbol
        ctx.shadowBlur = 0;
        ctx.fillStyle = this.getContrastColor(this.elementData.color);
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        
        // Draw atomic number (smaller)
        ctx.font = '8px Arial';
        ctx.fillText(this.elementData.atomicNumber, 0, 8);
        
        ctx.restore();
    }
    
    // Get contrasting color for text
    getContrastColor(hexColor) {
        // Simple contrast calculation
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    }
    
    // Get bounding box for collision detection
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
    
    // Check if element is off screen
    isOffScreen() {
        return this.x + this.width < 0;
    }
}