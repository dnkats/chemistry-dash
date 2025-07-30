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
        
        // Moving platform properties
        this.moving = false;
        this.movementType = 'none'; // 'vertical', 'horizontal', 'circular'
        this.movementSpeed = 0;
        this.movementRange = 0;
        this.movementTime = 0;
        this.originalX = x;
        this.originalY = y;
        
        // Disappearing platform properties
        this.disappearing = false;
        this.disappearDelay = 0; // Time before disappearing after player lands
        this.disappearTimer = 0;
        this.landed = false;
        this.visible = true;
        
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
            case 'moving_vertical':
                this.color = '#2ecc71';
                this.accentColor = '#27ae60';
                this.edgeColor = '#16a085';
                this.glow = true;
                this.glowColor = 'rgba(46, 204, 113, 0.4)';
                this.moving = true;
                this.movementType = 'vertical';
                this.movementSpeed = 1;
                this.movementRange = 60;
                break;
            case 'moving_horizontal':
                this.color = '#e67e22';
                this.accentColor = '#f39c12';
                this.edgeColor = '#d35400';
                this.glow = true;
                this.glowColor = 'rgba(230, 126, 34, 0.4)';
                this.moving = true;
                this.movementType = 'horizontal';
                this.movementSpeed = 0.8;
                this.movementRange = 80;
                break;
            case 'disappearing':
                this.color = '#e74c3c';
                this.accentColor = '#c0392b';
                this.edgeColor = '#a93226';
                this.glow = true;
                this.glowColor = 'rgba(231, 76, 60, 0.4)';
                this.disappearing = true;
                this.disappearDelay = 1000; // 1 second before disappearing
                break;
            case 'ice':
                this.color = 'rgba(174, 214, 241, 0.8)';
                this.accentColor = 'rgba(133, 193, 233, 0.9)';
                this.edgeColor = '#85c1e9';
                this.glow = true;
                this.glowColor = 'rgba(174, 214, 241, 0.5)';
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
        
        // Handle moving platforms
        if (this.moving) {
            this.movementTime += deltaTime * 0.001; // Convert to seconds
            
            switch(this.movementType) {
                case 'vertical':
                    this.y = this.originalY + Math.sin(this.movementTime * this.movementSpeed) * this.movementRange;
                    break;
                case 'horizontal':
                    // For horizontal movement, we need to account for the game speed
                    const horizontalOffset = Math.sin(this.movementTime * this.movementSpeed) * this.movementRange;
                    this.x = this.originalX + horizontalOffset - (gameSpeed * this.movementTime * 60); // Approximate frame rate
                    break;
                case 'circular':
                    const circleX = Math.cos(this.movementTime * this.movementSpeed) * this.movementRange;
                    const circleY = Math.sin(this.movementTime * this.movementSpeed) * this.movementRange;
                    this.x = this.originalX + circleX - (gameSpeed * this.movementTime * 60);
                    this.y = this.originalY + circleY;
                    break;
            }
        }
        
        // Handle disappearing platforms
        if (this.disappearing && this.landed) {
            this.disappearTimer += deltaTime;
            if (this.disappearTimer > this.disappearDelay) {
                this.visible = false;
            } else {
                // Flash effect as it's about to disappear
                const flashInterval = 200; // Flash every 200ms
                this.visible = Math.floor(this.disappearTimer / flashInterval) % 2 === 0;
            }
        }
        
        // Update animation for glowing platforms
        if (this.glow) {
            this.animationTime += deltaTime * 0.003;
            this.glowIntensity = Math.sin(this.animationTime) * 0.3 + 0.7;
        }
    }
    
    render(ctx) {
        if (!this.visible) return; // Don't render invisible platforms
        
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
        } else if (this.type === 'moving_vertical' || this.type === 'moving_horizontal') {
            // Draw movement indicators
            ctx.fillStyle = this.glowColor;
            const arrowCount = 3;
            for (let i = 0; i < arrowCount; i++) {
                const arrowX = this.x + (this.width / arrowCount) * i + (this.width / arrowCount / 2);
                const arrowY = this.y + this.height/2;
                
                // Draw arrow based on movement type
                ctx.beginPath();
                if (this.type === 'moving_vertical') {
                    ctx.moveTo(arrowX, arrowY - 3);
                    ctx.lineTo(arrowX - 2, arrowY - 1);
                    ctx.lineTo(arrowX + 2, arrowY - 1);
                    ctx.moveTo(arrowX, arrowY + 3);
                    ctx.lineTo(arrowX - 2, arrowY + 1);
                    ctx.lineTo(arrowX + 2, arrowY + 1);
                } else {
                    ctx.moveTo(arrowX - 3, arrowY);
                    ctx.lineTo(arrowX - 1, arrowY - 2);
                    ctx.lineTo(arrowX - 1, arrowY + 2);
                    ctx.moveTo(arrowX + 3, arrowY);
                    ctx.lineTo(arrowX + 1, arrowY - 2);
                    ctx.lineTo(arrowX + 1, arrowY + 2);
                }
                ctx.fill();
            }
        } else if (this.type === 'disappearing') {
            // Draw warning pattern for disappearing platforms
            if (this.landed) {
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = 0.3;
                const stripeWidth = 5;
                for (let i = 0; i < this.width; i += stripeWidth * 2) {
                    ctx.fillRect(this.x + i, this.y, stripeWidth, this.height);
                }
                ctx.globalAlpha = 1;
            }
        } else if (this.type === 'ice') {
            // Draw ice crystals
            ctx.strokeStyle = this.edgeColor;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.4;
            
            const crystalCount = Math.floor(this.width / 30);
            for (let i = 0; i < crystalCount; i++) {
                const crystalX = this.x + i * 30 + 15;
                const crystalY = this.y + this.height/2;
                
                ctx.beginPath();
                ctx.moveTo(crystalX, crystalY - 4);
                ctx.lineTo(crystalX - 3, crystalY);
                ctx.lineTo(crystalX, crystalY + 4);
                ctx.lineTo(crystalX + 3, crystalY);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
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
        
        // Check horizontal overlap first
        const horizontalOverlap = playerBounds.x < platformBounds.x + platformBounds.width &&
                                  playerBounds.x + playerBounds.width > platformBounds.x;
        
        if (!horizontalOverlap) return false;
        
        // Check if player is falling (positive velocity)
        if (player.velocityY <= 0) return false;
        
        // Check if player's previous position was above the platform
        const playerPreviousBottom = playerBounds.y + playerBounds.height - player.velocityY;
        const playerCurrentBottom = playerBounds.y + playerBounds.height;
        const platformTop = platformBounds.y;
        
        // Player should have been above platform in previous frame and now intersecting or below
        return playerPreviousBottom <= platformTop && playerCurrentBottom >= platformTop;
    }
    
    // Handle landing on platform
    handleLanding(player) {
        // Snap player to platform surface
        player.y = this.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
        player.jumpsRemaining = player.maxJumps; // Reset double jump when landing
        
        // Handle special platform types
        if (this.type === 'disappearing' && !this.landed) {
            this.landed = true;
            this.disappearTimer = 0; // Start disappearing timer
        }
        
        // Ice platforms could be slippery (but we don't have friction implemented yet)
        // TODO: Implement friction system if needed
    }
    
    // Check if platform should be removed (disappeared)
    shouldBeRemoved() {
        return this.disappearing && !this.visible;
    }
}
