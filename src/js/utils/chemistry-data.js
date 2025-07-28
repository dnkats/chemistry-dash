// Chemistry data for the game
const ChemistryData = {
    elements: {
        'H': { name: 'Hydrogen', atomicNumber: 1, color: '#ffffff', category: 'nonmetal' },
        'C': { name: 'Carbon', atomicNumber: 6, color: '#909090', category: 'nonmetal' },
        'N': { name: 'Nitrogen', atomicNumber: 7, color: '#3050f8', category: 'nonmetal' },
        'O': { name: 'Oxygen', atomicNumber: 8, color: '#ff0d0d', category: 'nonmetal' },
        'F': { name: 'Fluorine', atomicNumber: 9, color: '#90e050', category: 'halogen' },
        'Na': { name: 'Sodium', atomicNumber: 11, color: '#ab5cf2', category: 'alkali-metal' },
        'Mg': { name: 'Magnesium', atomicNumber: 12, color: '#8aff00', category: 'alkaline-earth' },
        'Al': { name: 'Aluminum', atomicNumber: 13, color: '#bfa6a6', category: 'post-transition' },
        'Si': { name: 'Silicon', atomicNumber: 14, color: '#f0c8a0', category: 'metalloid' },
        'P': { name: 'Phosphorus', atomicNumber: 15, color: '#ff8000', category: 'nonmetal' },
        'S': { name: 'Sulfur', atomicNumber: 16, color: '#ffff30', category: 'nonmetal' },
        'Cl': { name: 'Chlorine', atomicNumber: 17, color: '#1ff01f', category: 'halogen' },
        'K': { name: 'Potassium', atomicNumber: 19, color: '#8f40d4', category: 'alkali-metal' },
        'Ca': { name: 'Calcium', atomicNumber: 20, color: '#3dff00', category: 'alkaline-earth' },
        'Fe': { name: 'Iron', atomicNumber: 26, color: '#e06633', category: 'transition-metal' },
        'Cu': { name: 'Copper', atomicNumber: 29, color: '#c88033', category: 'transition-metal' },
        'Zn': { name: 'Zinc', atomicNumber: 30, color: '#7d80b0', category: 'transition-metal' },
        'Br': { name: 'Bromine', atomicNumber: 35, color: '#a62929', category: 'halogen' },
        'Ag': { name: 'Silver', atomicNumber: 47, color: '#c0c0c0', category: 'transition-metal' },
        'I': { name: 'Iodine', atomicNumber: 53, color: '#940094', category: 'halogen' },
        'Au': { name: 'Gold', atomicNumber: 79, color: '#ffd123', category: 'transition-metal' }
    },
    
    // Common molecules that can be formed
    molecules: {
        'H2O': { name: 'Water', elements: ['H', 'H', 'O'], points: 100 },
        'CO2': { name: 'Carbon Dioxide', elements: ['C', 'O', 'O'], points: 150 },
        'NH3': { name: 'Ammonia', elements: ['N', 'H', 'H', 'H'], points: 200 },
        'CH4': { name: 'Methane', elements: ['C', 'H', 'H', 'H', 'H'], points: 250 },
        'NaCl': { name: 'Salt', elements: ['Na', 'Cl'], points: 120 },
        'CaCO3': { name: 'Calcium Carbonate', elements: ['Ca', 'C', 'O', 'O', 'O'], points: 300 },
        'H2SO4': { name: 'Sulfuric Acid', elements: ['H', 'H', 'S', 'O', 'O', 'O', 'O'], points: 400 }
    },
    
    // Check if collected elements can form a molecule
    checkForMolecules: function(collectedElements) {
        const elementCounts = {};
        collectedElements.forEach(element => {
            elementCounts[element] = (elementCounts[element] || 0) + 1;
        });
        
        const formedMolecules = [];
        
        for (const [formula, moleculeData] of Object.entries(this.molecules)) {
            const requiredCounts = {};
            moleculeData.elements.forEach(element => {
                requiredCounts[element] = (requiredCounts[element] || 0) + 1;
            });
            
            // Check if we have enough of each required element
            let canForm = true;
            for (const [element, required] of Object.entries(requiredCounts)) {
                if (!elementCounts[element] || elementCounts[element] < required) {
                    canForm = false;
                    break;
                }
            }
            
            if (canForm) {
                formedMolecules.push({
                    formula: formula,
                    name: moleculeData.name,
                    points: moleculeData.points,
                    elements: moleculeData.elements
                });
            }
        }
        
        return formedMolecules;
    },
    
    // Get random element for spawning
    getRandomElement: function() {
        const elementKeys = Object.keys(this.elements);
        const randomKey = elementKeys[Math.floor(Math.random() * elementKeys.length)];
        return {
            symbol: randomKey,
            data: this.elements[randomKey]
        };
    }
};