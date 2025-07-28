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
            default:
                this.color = '#95a5a6';
                this.accentColor = '#bdc3c7';
                this.dangerLevel = 'low';
        }
    }
    
    update(deltaTime, gameSpeed) {
        // Move obstacle to the left
        this.x -= gameSpeed;
        
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