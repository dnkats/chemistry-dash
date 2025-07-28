// Molecule class for Chemistry Dash
class Molecule {
    constructor(elements = []) {
        this.elements = elements;
        this.formula = this.generateFormula();
        this.name = this.getMoleculeName();
        this.bondStructure = this.generateBondStructure();
        this.visualScale = 1;
        this.animationTime = 0;
    }
    
    // Add an element to the molecule
    addElement(elementSymbol) {
        this.elements.push(elementSymbol);
        this.updateMolecule();
    }
    
    // Remove an element from the molecule
    removeElement(elementSymbol) {
        const index = this.elements.indexOf(elementSymbol);
        if (index > -1) {
            this.elements.splice(index, 1);
            this.updateMolecule();
        }
    }
    
    // Update molecule properties when elements change
    updateMolecule() {
        this.formula = this.generateFormula();
        this.name = this.getMoleculeName();
        this.bondStructure = this.generateBondStructure();
        this.calculateVisualScale();
    }
    
    // Generate chemical formula from elements
    generateFormula() {
        if (this.elements.length === 0) return '';
        
        const elementCounts = {};
        this.elements.forEach(element => {
            elementCounts[element] = (elementCounts[element] || 0) + 1;
        });
        
        let formula = '';
        // Sort elements by common chemical formula convention
        const sortedElements = Object.keys(elementCounts).sort((a, b) => {
            const order = ['C', 'H', 'N', 'O', 'S', 'P', 'F', 'Cl', 'Br', 'I'];
            const aIndex = order.indexOf(a);
            const bIndex = order.indexOf(b);
            
            if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        });
        
        sortedElements.forEach(element => {
            const count = elementCounts[element];
            formula += element + (count > 1 ? count : '');
        });
        
        return formula;
    }
    
    // Get molecule name if it's a known compound
    getMoleculeName() {
        const knownMolecules = {
            'H2O': 'Water',
            'CO2': 'Carbon Dioxide', 
            'NH3': 'Ammonia',
            'CH4': 'Methane',
            'C2H6': 'Ethane',
            'H2SO4': 'Sulfuric Acid',
            'HCl': 'Hydrochloric Acid',
            'NaCl': 'Sodium Chloride',
            'CaCO3': 'Calcium Carbonate',
            'C6H12O6': 'Glucose'
        };
        
        return knownMolecules[this.formula] || 'Unknown Compound';
    }
    
    // Generate a simple bond structure for visualization
    generateBondStructure() {
        if (this.elements.length <= 1) {
            return [{ element: this.elements[0] || 'Empty', x: 0, y: 0, bonds: [] }];
        }
        
        const atoms = [];
        const bondLength = 40;
        
        // Simple circular arrangement
        this.elements.forEach((element, index) => {
            const angle = (index / this.elements.length) * 2 * Math.PI;
            const radius = Math.min(bondLength * Math.sqrt(this.elements.length - 1), 80);
            
            atoms.push({
                element: element,
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                bonds: []
            });
        });
        
        // Add bonds between adjacent atoms
        for (let i = 0; i < atoms.length; i++) {
            const nextIndex = (i + 1) % atoms.length;
            if (atoms.length > 2 || i === 0) {
                atoms[i].bonds.push(nextIndex);
            }
        }
        
        return atoms;
    }
    
    // Calculate visual scale based on molecule size
    calculateVisualScale() {
        const baseScale = 1;
        const elementCount = this.elements.length;
        
        if (elementCount <= 2) {
            this.visualScale = baseScale;
        } else if (elementCount <= 5) {
            this.visualScale = baseScale * 1.2;
        } else if (elementCount <= 10) {
            this.visualScale = baseScale * 1.5;
        } else {
            this.visualScale = baseScale * 2;
        }
    }
    
    // Update animation
    update(deltaTime) {
        this.animationTime += deltaTime * 0.001;
    }
    
    // Render the molecule structure
    render(ctx, x, y, scale = 1) {
        if (this.elements.length === 0) {
            // Draw empty molecule placeholder
            ctx.save();
            ctx.strokeStyle = '#4ecca3';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(x - 25, y - 25, 50, 50);
            ctx.setLineDash([]);
            
            ctx.fillStyle = '#4ecca3';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Empty', x, y);
            ctx.restore();
            return;
        }
        
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale * this.visualScale, scale * this.visualScale);
        
        // Rotate molecule slowly
        ctx.rotate(this.animationTime * 0.5);
        
        // Draw bonds first
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        this.bondStructure.forEach((atom, atomIndex) => {
            atom.bonds.forEach(bondIndex => {
                const bondedAtom = this.bondStructure[bondIndex];
                ctx.beginPath();
                ctx.moveTo(atom.x, atom.y);
                ctx.lineTo(bondedAtom.x, bondedAtom.y);
                ctx.stroke();
            });
        });
        
        // Draw atoms
        this.bondStructure.forEach(atom => {
            const elementData = ChemistryData.elements[atom.element];
            if (elementData) {
                // Draw atom circle
                ctx.fillStyle = elementData.color;
                ctx.shadowColor = elementData.color;
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(atom.x, atom.y, 15, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw element symbol
                ctx.shadowBlur = 0;
                ctx.fillStyle = this.getContrastColor(elementData.color);
                ctx.font = 'bold 12px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(atom.element, atom.x, atom.y);
            }
        });
        
        ctx.restore();
    }
    
    // Get contrasting color for text
    getContrastColor(hexColor) {
        if (!hexColor || hexColor.length < 7) return '#ffffff';
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    }
    
    // Get molecule complexity score
    getComplexityScore() {
        const uniqueElements = [...new Set(this.elements)].length;
        const totalAtoms = this.elements.length;
        return uniqueElements * 10 + totalAtoms * 5;
    }
    
    // Check if molecule is complete (forms a known compound)
    isKnownCompound() {
        return this.name !== 'Unknown Compound';
    }
    
    // Get points value for this molecule
    getPointsValue() {
        const complexityScore = this.getComplexityScore();
        const knownBonus = this.isKnownCompound() ? 100 : 0;
        return complexityScore + knownBonus;
    }
}