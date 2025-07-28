// Player class for Chemistry Dash
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.velocityX = 0;
        this.velocityY = 0;
        this.grounded = false;
        this.jumpPower = -18; // Increased jump power
        this.color = '#4ecca3';
        this.glowColor = 'rgba(78, 204, 163, 0.5)';
        
        // Double jump mechanics
        this.jumpsRemaining = 2; // Can jump twice
        this.maxJumps = 2;
        
        // Animation properties
        this.animationTime = 0;
        this.bounceOffset = 0;
        this.rotation = 0;
        
        // Add roundRect fallback for older browsers
        if (!CanvasRenderingContext2D.prototype.roundRect) {
            CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
                this.beginPath();
                this.moveTo(x + radius, y);
                this.lineTo(x + width - radius, y);
                this.quadraticCurveTo(x + width, y, x + width, y + radius);
                this.lineTo(x + width, y + height - radius);
                this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                this.lineTo(x + radius, y + height);
                this.quadraticCurveTo(x, y + height, x, y + height - radius);
                this.lineTo(x, y + radius);
                this.quadraticCurveTo(x, y, x + radius, y);
                this.closePath();
            };
        }
    }
    
    update(deltaTime) {
        // Update animation
        this.animationTime += deltaTime * 0.005;
        this.bounceOffset = Math.sin(this.animationTime) * 1;
        
        // Add rotation based on velocity (Geometry Dash style)
        if (!this.grounded && this.velocityY !== 0) {
            this.rotation += deltaTime * 0.008; // Rotate while in air
        } else {
            // Gradually return to normal rotation when grounded
            this.rotation *= 0.9;
        }
        
        // Apply physics
        Physics.applyGravity(this, deltaTime);
        Physics.updatePosition(this, deltaTime);
        
        // Reset grounded state (will be set by collision detection)
        this.grounded = false;
    }
    
    jump() {
        // Can jump if grounded OR if we have jumps remaining (double jump)
        if (this.grounded || this.jumpsRemaining > 0) {
            this.velocityY = this.jumpPower;
            
            // Use up a jump only if we're not grounded
            if (!this.grounded) {
                this.jumpsRemaining--;
                // Add extra visual effect for double jump
                this.rotation += Math.PI / 6; // Extra spin for double jump
            }
            
            this.grounded = false;
        }
    }
    
    render(ctx) {
        ctx.save();
        
        // Move to center for rotation
        const centerX = this.x + this.width/2;
        const centerY = this.y + this.height/2 + this.bounceOffset;
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);
        
        // Draw glow effect (brighter if double jump available)
        const glowIntensity = this.jumpsRemaining > 1 ? 20 : 15;
        ctx.shadowColor = this.jumpsRemaining > 1 ? 'rgba(78, 204, 163, 0.8)' : this.glowColor;
        ctx.shadowBlur = glowIntensity;
        
        // Draw player body (rounded rectangle) - centered
        ctx.fillStyle = this.color;
        ctx.roundRect(-this.width/2, -this.height/2, this.width, this.height, 6);
        ctx.fill();
        
        // Draw eyes
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.arc(-8, -6, 3, 0, Math.PI * 2);
        ctx.arc(8, -6, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw smile
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI);
        ctx.stroke();
        
        // Draw chemical symbol on body
        ctx.fillStyle = '#1a1a2e';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('C', 0, this.height/2 - 4);
        
        ctx.restore();
        
        // Draw double jump indicator (small dots next to player)
        if (!this.grounded && this.jumpsRemaining > 0) {
            ctx.fillStyle = 'rgba(78, 204, 163, 0.8)';
            for (let i = 0; i < this.jumpsRemaining; i++) {
                ctx.beginPath();
                ctx.arc(this.x - 10, this.y + 5 + (i * 8), 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
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
    
    // Reset player position
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.grounded = false;
        this.animationTime = 0;
        this.rotation = 0;
        this.jumpsRemaining = this.maxJumps; // Reset double jump
    }
}