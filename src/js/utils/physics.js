// Physics utility functions for the game
const Physics = {
    // Gravity constant - increased for Geometry Dash feel
    GRAVITY: 1.2,
    
    // Terminal velocity
    TERMINAL_VELOCITY: 20,
    
    // Ground friction
    FRICTION: 0.85,
    
    // Apply gravity to an object
    applyGravity: function(object, deltaTime) {
        const timeMultiplier = deltaTime / 16.67; // Normalize to 60fps
        object.velocityY += this.GRAVITY * timeMultiplier;
        
        // Apply terminal velocity
        if (object.velocityY > this.TERMINAL_VELOCITY) {
            object.velocityY = this.TERMINAL_VELOCITY;
        }
    },
    
    // Apply friction to an object
    applyFriction: function(object) {
        object.velocityX *= this.FRICTION;
    },
    
    // Update object position based on velocity
    updatePosition: function(object, deltaTime) {
        const timeMultiplier = deltaTime / 16.67; // Normalize to 60fps
        object.x += object.velocityX * timeMultiplier;
        object.y += object.velocityY * timeMultiplier;
    },
    
    // Check if two rectangular objects are colliding
    checkCollision: function(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },
    
    // Check if two circular objects are colliding
    checkCircularCollision: function(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < circle1.radius + circle2.radius;
    },
    
    // Get distance between two points
    getDistance: function(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    // Normalize a vector
    normalize: function(x, y) {
        const length = Math.sqrt(x * x + y * y);
        if (length === 0) return { x: 0, y: 0 };
        return { x: x / length, y: y / length };
    },
    
    // Linear interpolation
    lerp: function(start, end, factor) {
        return start + (end - start) * factor;
    },
    
    // Clamp value between min and max
    clamp: function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
};