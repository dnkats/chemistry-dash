// Platform class for Chemistry Dash
class Platform {
    constructor(x, y, width, height, type = 'basic') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.velocityX = 0;
        this.velocityY = 0;
        
        // Visual properties based on type
        this.setPlatformProperties();
        
        // Animation properties for visual effects
        this.animationTime = 0;
        this.glowIntensity = 0;
    }
    
    setPlatformProperties() {
        switch(this.type) {
            case 'basic':
                this.color = '#34495e';
                this.accentColor = '#95a5a6';
                this.edgeColor = '#2c3e50';
                this.glow = false;
                break;
            case 'glass':
                this.color = 'rgba(52, 152, 219, 0.3)';
                this.accentColor = 'rgba(52, 152, 219, 0.6)';
                this.edgeColor = '#3498db';
                this.glow = true;
                this.glowColor = 'rgba(52, 152, 219, 0.4)';
                break;
            case 'metal':
                this.color = '#7f8c8d';
                this.accentColor = '#bdc3c7';
                this.edgeColor = '#34495e';
                this.glow = false;
                break;
            case 'crystal':
                this.color = '#9b59b6';
                this.accentColor = '#e74c3c';
                this.edgeColor = '#8e44ad';
                this.glow = true;
                this.glowColor = 'rgba(155, 89, 182, 0.4)';
                break;
            case 'energy':
                this.color = '#f1c40f';
                this.accentColor = '#f39c12';
                this.edgeColor = '#e67e22';
                this.glow = true;
                this.glowColor = 'rgba(241, 196, 15, 0.5)';
                break;
            default:
                this.color = '#95a5a6';
                this.accentColor = '#bdc3c7';
                this.edgeColor = '#7f8c8d';
                this.glow = false;
        }
    }
    
    update(deltaTime, gameSpeed) {
        // Move platform to the left with game speed
        this.x -= gameSpeed;
        
        // Update animation for glowing platforms
        if (this.glow) {
            this.animationTime += deltaTime * 0.003;
            this.glowIntensity = Math.sin(this.animationTime) * 0.3 + 0.7;
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Draw glow effect for special platforms
        if (this.glow) {
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 10 * this.glowIntensity;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
        
        // Draw main platform body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw top surface with accent color
        ctx.fillStyle = this.accentColor;
        ctx.fillRect(this.x, this.y, this.width, Math.max(2, this.height * 0.1));
        
        // Draw edges for depth
        ctx.fillStyle = this.edgeColor;
        // Right edge
        ctx.fillRect(this.x + this.width - 2, this.y, 2, this.height);
        // Bottom edge
        ctx.fillRect(this.x, this.y + this.height - 2, this.width, 2);
        
        // Add decorative patterns for special platforms
        if (this.type === 'glass') {
            // Draw subtle grid pattern
            ctx.strokeStyle = this.edgeColor;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.3;
            
            for (let i = 0; i < this.width; i += 20) {
                ctx.beginPath();
                ctx.moveTo(this.x + i, this.y);
                ctx.lineTo(this.x + i, this.y + this.height);
                ctx.stroke();
            }
            
            for (let j = 0; j < this.height; j += 20) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + j);
                ctx.lineTo(this.x + this.width, this.y + j);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
        } else if (this.type === 'crystal') {
            // Draw crystal-like facets
            ctx.strokeStyle = this.edgeColor;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.5;
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.height/2);
            ctx.lineTo(this.x + this.width/3, this.y);
            ctx.lineTo(this.x + 2*this.width/3, this.y + this.height);
            ctx.lineTo(this.x + this.width, this.y + this.height/2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        } else if (this.type === 'energy') {
            // Draw energy sparks
            ctx.fillStyle = this.glowColor;
            const sparkleCount = 3;
            for (let i = 0; i < sparkleCount; i++) {
                const sparkX = this.x + (this.width / sparkleCount) * i + (this.width / sparkleCount / 2);
                const sparkY = this.y + Math.sin(this.animationTime * 2 + i) * 3;
                
                ctx.beginPath();
                ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
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
    
    // Check if platform is off screen
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    // Check if player can land on this platform (top collision)
    canLandOn(player) {
        const playerBounds = player.getBounds();
        const platformBounds = this.getBounds();
        
        // Check if player is above platform and falling
        return player.velocityY > 0 && 
               playerBounds.x < platformBounds.x + platformBounds.width &&
               playerBounds.x + playerBounds.width > platformBounds.x &&
               playerBounds.y + playerBounds.height > platformBounds.y &&
               playerBounds.y + playerBounds.height < platformBounds.y + platformBounds.height/2;
    }
    
    // Handle landing on platform
    handleLanding(player) {
        player.y = this.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
        player.jumpsRemaining = player.maxJumps; // Reset double jump when landing
    }
}
