// Player class for Chemistry Dash
class Player {
    constructor(x, y, level = 1) {
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
        
        // Molecule progression system
        this.currentLevel = level;
        this.moleculeData = this.getMoleculeForLevel(level);
        
        // Adjust size based on molecule complexity
        this.adjustSizeForMolecule();
        
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
    
    // Get molecule data based on level
    getMoleculeForLevel(level) {
        // Educational progression from simple to complex organic molecules:
        // H → H₂ → H₂O → NH₃ → CH₄ → CH₃OH → CH₃NH₂ → C₂H₆ → C₂H₅OH → C₂H₅NH₂ → C₃H₈ → ...
        // This teaches: atoms → diatomic → inorganic → simple organic → functional groups → chains
        const molecules = [
            // Level 1: Single atom - Hydrogen
            { 
                name: 'Hydrogen', 
                formula: 'H', 
                atoms: [{ symbol: 'H', x: 0, y: 0, color: '#ffffff' }],
                description: 'Single Hydrogen Atom'
            },
            // Level 2: Two atoms - Hydrogen molecule
            { 
                name: 'Hydrogen Molecule', 
                formula: 'H₂', 
                atoms: [
                    { symbol: 'H', x: -8, y: 0, color: '#ffffff' },
                    { symbol: 'H', x: 8, y: 0, color: '#ffffff' }
                ],
                description: 'Diatomic Hydrogen'
            },
            // Level 3: Three atoms - Water
            { 
                name: 'Water', 
                formula: 'H₂O', 
                atoms: [
                    { symbol: 'O', x: 0, y: 0, color: '#ff0d0d' },
                    { symbol: 'H', x: -12, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: 12, y: -8, color: '#ffffff' }
                ],
                description: 'Water Molecule'
            },
            // Level 4: Four atoms - Ammonia
            { 
                name: 'Ammonia', 
                formula: 'NH₃', 
                atoms: [
                    { symbol: 'N', x: 0, y: 0, color: '#3050f8' },
                    { symbol: 'H', x: -10, y: -10, color: '#ffffff' },
                    { symbol: 'H', x: 10, y: -10, color: '#ffffff' },
                    { symbol: 'H', x: 0, y: 12, color: '#ffffff' }
                ],
                description: 'Ammonia Molecule'
            },
            // Level 5: Five atoms - Methane
            { 
                name: 'Methane', 
                formula: 'CH₄', 
                atoms: [
                    { symbol: 'C', x: 0, y: 0, color: '#909090' },
                    { symbol: 'H', x: -12, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 12, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: -12, y: 12, color: '#ffffff' },
                    { symbol: 'H', x: 12, y: 12, color: '#ffffff' }
                ],
                description: 'Methane Molecule'
            },
            // Level 6: Six atoms - Methanol (CH₃OH)
            { 
                name: 'Methanol', 
                formula: 'CH₃OH', 
                atoms: [
                    { symbol: 'C', x: -6, y: 0, color: '#909090' },
                    { symbol: 'O', x: 8, y: 0, color: '#ff0d0d' },
                    { symbol: 'H', x: -14, y: -10, color: '#ffffff' },
                    { symbol: 'H', x: -14, y: 10, color: '#ffffff' },
                    { symbol: 'H', x: -6, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 16, y: 0, color: '#ffffff' }
                ],
                description: 'Methanol - Wood Alcohol'
            },
            // Level 7: Six atoms - Methylamine (CH₃NH₂)
            { 
                name: 'Methylamine', 
                formula: 'CH₃NH₂', 
                atoms: [
                    { symbol: 'C', x: -8, y: 0, color: '#909090' },
                    { symbol: 'N', x: 8, y: 0, color: '#3050f8' },
                    { symbol: 'H', x: -16, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: -16, y: 8, color: '#ffffff' },
                    { symbol: 'H', x: -8, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 16, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: 16, y: 8, color: '#ffffff' }
                ],
                description: 'Methylamine - Simple Amine'
            },
            // Level 8: Eight atoms - Ethane (C₂H₆)
            { 
                name: 'Ethane', 
                formula: 'C₂H₆', 
                atoms: [
                    { symbol: 'C', x: -8, y: 0, color: '#909090' },
                    { symbol: 'C', x: 8, y: 0, color: '#909090' },
                    { symbol: 'H', x: -16, y: -10, color: '#ffffff' },
                    { symbol: 'H', x: -16, y: 10, color: '#ffffff' },
                    { symbol: 'H', x: -8, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 16, y: -10, color: '#ffffff' },
                    { symbol: 'H', x: 16, y: 10, color: '#ffffff' },
                    { symbol: 'H', x: 8, y: 12, color: '#ffffff' }
                ],
                description: 'Ethane - Two Carbon Chain'
            },
            // Level 9: Nine atoms - Ethanol (C₂H₅OH)
            { 
                name: 'Ethanol', 
                formula: 'C₂H₅OH', 
                atoms: [
                    { symbol: 'C', x: -12, y: 0, color: '#909090' },
                    { symbol: 'C', x: 0, y: 0, color: '#909090' },
                    { symbol: 'O', x: 12, y: 0, color: '#ff0d0d' },
                    { symbol: 'H', x: -20, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: -20, y: 8, color: '#ffffff' },
                    { symbol: 'H', x: -12, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 0, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 0, y: 12, color: '#ffffff' },
                    { symbol: 'H', x: 20, y: 0, color: '#ffffff' }
                ],
                description: 'Ethanol - Drinking Alcohol'
            },
            // Level 10: Ten atoms - Ethylamine (C₂H₅NH₂)
            { 
                name: 'Ethylamine', 
                formula: 'C₂H₅NH₂', 
                atoms: [
                    { symbol: 'C', x: -12, y: 0, color: '#909090' },
                    { symbol: 'C', x: 0, y: 0, color: '#909090' },
                    { symbol: 'N', x: 12, y: 0, color: '#3050f8' },
                    { symbol: 'H', x: -20, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: -20, y: 8, color: '#ffffff' },
                    { symbol: 'H', x: -12, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 0, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 0, y: 12, color: '#ffffff' },
                    { symbol: 'H', x: 20, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: 20, y: 8, color: '#ffffff' }
                ],
                description: 'Ethylamine - Primary Amine'
            },
            // Level 11: Eleven atoms - Propane (C₃H₈)
            { 
                name: 'Propane', 
                formula: 'C₃H₈', 
                atoms: [
                    { symbol: 'C', x: -16, y: 0, color: '#909090' },
                    { symbol: 'C', x: 0, y: 0, color: '#909090' },
                    { symbol: 'C', x: 16, y: 0, color: '#909090' },
                    { symbol: 'H', x: -24, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: -24, y: 8, color: '#ffffff' },
                    { symbol: 'H', x: -16, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 0, y: -12, color: '#ffffff' },
                    { symbol: 'H', x: 0, y: 12, color: '#ffffff' },
                    { symbol: 'H', x: 24, y: -8, color: '#ffffff' },
                    { symbol: 'H', x: 24, y: 8, color: '#ffffff' },
                    { symbol: 'H', x: 16, y: 12, color: '#ffffff' }
                ],
                description: 'Propane - Three Carbon Chain'
            }
        ];
        
        // Return molecule for level, or continue with more complex molecules
        const moleculeIndex = Math.min(level - 1, molecules.length - 1);
        
        // For levels beyond our predefined molecules, create increasingly complex alkanes
        if (level > molecules.length) {
            const extraCarbons = level - molecules.length;
            const carbonCount = 3 + extraCarbons; // Start from C4 (butane) and beyond
            const hydrogenCount = (carbonCount * 2) + 2; // Alkane formula CnH2n+2
            
            const complexMolecule = {
                name: `Alkane C${carbonCount}`,
                formula: `C${carbonCount}H${hydrogenCount}`,
                atoms: [],
                description: `${carbonCount}-Carbon Alkane Chain`
            };
            
            // Create linear alkane chain
            for (let i = 0; i < carbonCount; i++) {
                const carbonX = (i - (carbonCount - 1) / 2) * 16;
                complexMolecule.atoms.push({
                    symbol: 'C',
                    x: carbonX,
                    y: 0,
                    color: '#909090'
                });
                
                // Add hydrogens - terminal carbons get 3, middle carbons get 2
                const hydrogensOnThisCarbon = (i === 0 || i === carbonCount - 1) ? 3 : 2;
                
                for (let j = 0; j < hydrogensOnThisCarbon; j++) {
                    let hydrogenX, hydrogenY;
                    
                    if (i === 0) { // First carbon
                        if (j === 0) { hydrogenX = carbonX - 8; hydrogenY = -10; }
                        else if (j === 1) { hydrogenX = carbonX - 8; hydrogenY = 10; }
                        else { hydrogenX = carbonX - 16; hydrogenY = 0; }
                    } else if (i === carbonCount - 1) { // Last carbon
                        if (j === 0) { hydrogenX = carbonX + 8; hydrogenY = -10; }
                        else if (j === 1) { hydrogenX = carbonX + 8; hydrogenY = 10; }
                        else { hydrogenX = carbonX + 16; hydrogenY = 0; }
                    } else { // Middle carbons
                        if (j === 0) { hydrogenX = carbonX; hydrogenY = -12; }
                        else { hydrogenX = carbonX; hydrogenY = 12; }
                    }
                    
                    complexMolecule.atoms.push({
                        symbol: 'H',
                        x: hydrogenX,
                        y: hydrogenY,
                        color: '#ffffff'
                    });
                }
            }
            
            return complexMolecule;
        }
        
        const selectedMolecule = molecules[moleculeIndex];
        console.log(`Level ${level}: ${selectedMolecule.name} (${selectedMolecule.formula}) - ${selectedMolecule.atoms.length} atoms`);
        return selectedMolecule;
    }
    
    // Adjust player size based on molecule complexity
    adjustSizeForMolecule() {
        const atomCount = this.moleculeData.atoms.length;
        
        // Calculate bounding box of the molecule
        let minX = 0, maxX = 0, minY = 0, maxY = 0;
        this.moleculeData.atoms.forEach(atom => {
            minX = Math.min(minX, atom.x - 8);
            maxX = Math.max(maxX, atom.x + 8);
            minY = Math.min(minY, atom.y - 8);
            maxY = Math.max(maxY, atom.y + 8);
        });
        
        // Set size based on molecule bounds with some padding
        this.width = Math.max(30, maxX - minX + 16);
        this.height = Math.max(30, maxY - minY + 16);
    }
    
    // Update molecule when level changes
    updateMolecule(level) {
        if (level !== this.currentLevel) {
            this.currentLevel = level;
            this.moleculeData = this.getMoleculeForLevel(level);
            this.adjustSizeForMolecule();
            this.lastMoleculeChange = performance.now(); // Timestamp for showing name
            
            // Update color based on primary atom
            const primaryAtom = this.moleculeData.atoms[0];
            if (primaryAtom) {
                this.color = primaryAtom.color;
                this.glowColor = primaryAtom.color.replace(')', ', 0.5)').replace('rgb', 'rgba');
            }
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
        
        // Draw bonds between atoms first (if more than one atom)
        if (this.moleculeData.atoms.length > 1) {
            ctx.shadowBlur = 0;
            ctx.strokeStyle = '#666666';
            ctx.lineWidth = 2;
            
            // Draw bonds - simple approach: connect each atom to the center atom
            const centerAtom = this.moleculeData.atoms[0];
            for (let i = 1; i < this.moleculeData.atoms.length; i++) {
                const atom = this.moleculeData.atoms[i];
                ctx.beginPath();
                ctx.moveTo(centerAtom.x, centerAtom.y);
                ctx.lineTo(atom.x, atom.y);
                ctx.stroke();
            }
            
            // For molecules with 3+ atoms, draw some additional bonds
            if (this.moleculeData.atoms.length >= 3) {
                for (let i = 1; i < this.moleculeData.atoms.length - 1; i++) {
                    const atom1 = this.moleculeData.atoms[i];
                    const atom2 = this.moleculeData.atoms[i + 1];
                    const distance = Math.sqrt((atom1.x - atom2.x) ** 2 + (atom1.y - atom2.y) ** 2);
                    if (distance < 25) { // Only draw bond if atoms are close
                        ctx.beginPath();
                        ctx.moveTo(atom1.x, atom1.y);
                        ctx.lineTo(atom2.x, atom2.y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Draw atoms
        this.moleculeData.atoms.forEach((atom, index) => {
            ctx.shadowColor = this.jumpsRemaining > 1 ? 'rgba(78, 204, 163, 0.8)' : this.glowColor;
            ctx.shadowBlur = index === 0 ? glowIntensity : glowIntensity * 0.7; // Main atom glows more
            
            // Draw atom body
            ctx.fillStyle = atom.color;
            ctx.beginPath();
            ctx.arc(atom.x, atom.y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw atom symbol
            ctx.shadowBlur = 0;
            ctx.fillStyle = atom.color === '#ffffff' ? '#000000' : '#ffffff'; // Contrast text
            ctx.font = 'bold 8px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(atom.symbol, atom.x, atom.y);
        });
        
        // Draw eyes on the main atom (first atom)
        if (this.moleculeData.atoms.length > 0) {
            const mainAtom = this.moleculeData.atoms[0];
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#1a1a2e';
            
            // Adjust eye positions based on atom size
            const eyeOffset = 3;
            ctx.beginPath();
            ctx.arc(mainAtom.x - eyeOffset, mainAtom.y - 2, 1.5, 0, Math.PI * 2);
            ctx.arc(mainAtom.x + eyeOffset, mainAtom.y - 2, 1.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw smile
            ctx.strokeStyle = '#1a1a2e';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(mainAtom.x, mainAtom.y + 1, 3, 0, Math.PI);
            ctx.stroke();
        }
        
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
        
        // Draw molecule name above player (for first few seconds or on level change)
        const gameTime = performance.now();
        if (this.lastMoleculeChange && gameTime - this.lastMoleculeChange < 3000) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.moleculeData.name, this.x + this.width/2, this.y - 15);
            ctx.font = '10px Arial';
            ctx.fillText(this.moleculeData.formula, this.x + this.width/2, this.y - 5);
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
        this.lastMoleculeChange = performance.now(); // Show molecule name on reset
    }
}