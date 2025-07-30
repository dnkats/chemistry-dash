// Level Generator for creating complex topologies in Chemistry Dash
class LevelGenerator {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.groundLevel = gameHeight - 20;
        
        // Spawn patterns for different difficulty levels
        this.patterns = {
            easy: {
                obstacleTypes: ['beaker', 'flask', 'horizontal_bar'],
                platformTypes: ['basic', 'metal', 'ice'],
                movingObstacleChance: 0.1,
                movingPlatformChance: 0.15,
                wallChance: 0.05,
                complexStructureChance: 0.1
            },
            medium: {
                obstacleTypes: ['beaker', 'acid', 'flask', 'moving_spike', 'horizontal_bar', 'wall'],
                platformTypes: ['basic', 'glass', 'metal', 'moving_vertical', 'disappearing', 'ice'],
                movingObstacleChance: 0.2,
                movingPlatformChance: 0.25,
                wallChance: 0.1,
                complexStructureChance: 0.2
            },
            hard: {
                obstacleTypes: ['acid', 'burner', 'moving_spike', 'swinging_blade', 'floating_mine', 'wall', 'barrier', 'horizontal_bar'],
                platformTypes: ['glass', 'crystal', 'energy', 'moving_vertical', 'moving_horizontal', 'disappearing'],
                movingObstacleChance: 0.3,
                movingPlatformChance: 0.35,
                wallChance: 0.15,
                complexStructureChance: 0.3
            }
        };
    }
    
    // Generate a complex structure (dead end, maze section, etc.)
    generateComplexStructure(x, difficulty = 'medium') {
        const structures = [];
        const pattern = this.patterns[difficulty];
        const structureType = Math.random();
        
        if (structureType < 0.3) {
            // Create a "corridor" with walls on top and bottom
            structures.push(...this.createCorridor(x, pattern));
        } else if (structureType < 0.6) {
            // Create a "jumping puzzle" with platforms at different heights
            structures.push(...this.createJumpingPuzzle(x, pattern));
        } else if (structureType < 0.8) {
            // Create a "dead end" that forces backtracking or specific movement
            structures.push(...this.createDeadEnd(x, pattern));
        } else {
            // Create a "maze section" with multiple paths
            structures.push(...this.createMazeSection(x, pattern));
        }
        
        return structures;
    }
    
    createCorridor(x, pattern) {
        const structures = [];
        const corridorLength = 200 + Math.random() * 300;
        const corridorHeight = 80 + Math.random() * 60;
        const corridorTop = this.groundLevel - corridorHeight - 50;
        
        // Top wall
        structures.push({
            type: 'obstacle',
            object: new Obstacle(x, corridorTop - 20, corridorLength, 20, 'horizontal_bar')
        });
        
        // Bottom wall (if corridor is not at ground level)
        if (corridorTop + corridorHeight < this.groundLevel - 30) {
            structures.push({
                type: 'obstacle',
                object: new Obstacle(x, corridorTop + corridorHeight, corridorLength, 20, 'horizontal_bar')
            });
        }
        
        // Add some hazards inside the corridor
        const hazardCount = Math.floor(corridorLength / 100);
        for (let i = 0; i < hazardCount; i++) {
            const hazardX = x + (i + 1) * (corridorLength / (hazardCount + 1));
            const hazardType = pattern.obstacleTypes[Math.floor(Math.random() * pattern.obstacleTypes.length)];
            
            if (Math.random() < pattern.movingObstacleChance) {
                structures.push({
                    type: 'obstacle',
                    object: new Obstacle(hazardX, corridorTop + 5, 25, 30, 'moving_spike')
                });
            } else {
                structures.push({
                    type: 'obstacle',
                    object: new Obstacle(hazardX, corridorTop + corridorHeight - 35, 30, 35, hazardType)
                });
            }
        }
        
        return structures;
    }
    
    createJumpingPuzzle(x, pattern) {
        const structures = [];
        const puzzleLength = 300 + Math.random() * 200;
        const platformCount = 4 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < platformCount; i++) {
            const platformX = x + (i * puzzleLength / platformCount) + Math.random() * 50;
            const platformY = this.groundLevel - 60 - Math.random() * 120;
            const platformWidth = 80 + Math.random() * 60;
            const platformType = pattern.platformTypes[Math.floor(Math.random() * pattern.platformTypes.length)];
            
            structures.push({
                type: 'platform',
                object: new Platform(platformX, platformY, platformWidth, 15, platformType)
            });
            
            // Add obstacles between platforms
            if (i < platformCount - 1) {
                const obstacleX = platformX + platformWidth + 20 + Math.random() * 30;
                const obstacleType = pattern.obstacleTypes[Math.floor(Math.random() * pattern.obstacleTypes.length)];
                
                structures.push({
                    type: 'obstacle',
                    object: new Obstacle(obstacleX, this.groundLevel - 40, 25, 40, obstacleType)
                });
            }
        }
        
        return structures;
    }
    
    createDeadEnd(x, pattern) {
        const structures = [];
        const deadEndWidth = 150 + Math.random() * 100;
        
        // Create walls that form a dead end
        structures.push({
            type: 'obstacle',
            object: new Obstacle(x + deadEndWidth, this.groundLevel - 200, 30, 200, 'wall')
        });
        
        // Add a platform above the dead end for alternative route
        structures.push({
            type: 'platform',
            object: new Platform(x, this.groundLevel - 150, deadEndWidth + 50, 15, 'basic')
        });
        
        // Add hazards in the dead end
        const hazardCount = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < hazardCount; i++) {
            const hazardX = x + (i + 1) * (deadEndWidth / (hazardCount + 1));
            structures.push({
                type: 'obstacle',
                object: new Obstacle(hazardX, this.groundLevel - 35, 25, 35, 'acid')
            });
        }
        
        return structures;
    }
    
    createMazeSection(x, pattern) {
        const structures = [];
        const mazeWidth = 400 + Math.random() * 200;
        const levelCount = 3;
        
        // Create multiple levels with platforms and walls
        for (let level = 0; level < levelCount; level++) {
            const levelY = this.groundLevel - (level + 1) * 80;
            const platformCount = 2 + Math.floor(Math.random() * 2);
            
            for (let p = 0; p < platformCount; p++) {
                const platformX = x + (p * mazeWidth / platformCount) + Math.random() * 50;
                const platformWidth = 60 + Math.random() * 80;
                
                structures.push({
                    type: 'platform',
                    object: new Platform(platformX, levelY, platformWidth, 15, 'basic')
                });
                
                // Add vertical barriers between some platforms
                if (p < platformCount - 1 && Math.random() < 0.4) {
                    const barrierX = platformX + platformWidth + 20;
                    structures.push({
                        type: 'obstacle',
                        object: new Obstacle(barrierX, levelY - 60, 15, 60, 'barrier')
                    });
                }
            }
        }
        
        // Add some moving hazards throughout the maze
        const movingHazardCount = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < movingHazardCount; i++) {
            const hazardX = x + Math.random() * mazeWidth;
            const hazardY = this.groundLevel - 40 - Math.random() * 160;
            
            structures.push({
                type: 'obstacle',
                object: new Obstacle(hazardX, hazardY, 30, 30, 'floating_mine')
            });
        }
        
        return structures;
    }
    
    // Generate obstacles with more variety
    generateObstacle(x, difficulty = 'medium') {
        const pattern = this.patterns[difficulty];
        const obstacleTypes = pattern.obstacleTypes;
        
        let obstacleType;
        if (Math.random() < pattern.movingObstacleChance) {
            obstacleType = ['moving_spike', 'swinging_blade', 'floating_mine'][Math.floor(Math.random() * 3)];
        } else {
            obstacleType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        }
        
        // Determine size based on type
        let width, height, y;
        
        switch(obstacleType) {
            case 'wall':
                width = 30;
                height = Math.min(200, this.groundLevel - 100); // Much shorter wall, max 200px
                y = this.groundLevel - height;
                break;
            case 'barrier':
                width = 20;
                height = 100 + Math.random() * 80;
                y = this.groundLevel - height;
                break;
            case 'horizontal_bar':
                width = 120 + Math.random() * 180;
                height = 15;
                y = this.groundLevel - 60 - Math.random() * 100;
                break;
            case 'moving_spike':
            case 'swinging_blade':
            case 'floating_mine':
                width = 30;
                height = 30;
                y = this.groundLevel - 40 - Math.random() * 80;
                break;
            default:
                width = 25 + Math.random() * 20;
                height = 25 + Math.random() * 35;
                y = this.groundLevel - height;
        }
        
        return new Obstacle(x, y, width, height, obstacleType);
    }
    
    // Generate platforms with more variety
    generatePlatform(x, difficulty = 'medium') {
        const pattern = this.patterns[difficulty];
        const platformTypes = pattern.platformTypes;
        
        let platformType;
        if (Math.random() < pattern.movingPlatformChance) {
            platformType = ['moving_vertical', 'moving_horizontal'][Math.floor(Math.random() * 2)];
        } else {
            platformType = platformTypes[Math.floor(Math.random() * platformTypes.length)];
        }
        
        // Platform dimensions
        const width = 120 + Math.random() * 180;
        const height = 15 + Math.random() * 10;
        const platformHeight = 60 + Math.random() * 120;
        const y = this.groundLevel - platformHeight;
        
        return new Platform(x, y, width, height, platformType);
    }
    
    // Check if we should spawn a complex structure
    shouldSpawnComplexStructure(difficulty = 'medium') {
        const pattern = this.patterns[difficulty];
        return Math.random() < pattern.complexStructureChance;
    }
}
