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
        'I': { name: 'Iodine', atomicNumber: 53, color: '#940094', category: 'halogen' }
    },
    
    // Common molecules that can be formed - greatly expanded list
    molecules: {
        // Simple diatomic molecules
        'H2': { name: 'Hydrogen Gas', elements: ['H', 'H'], points: 50 },
        'O2': { name: 'Oxygen Gas', elements: ['O', 'O'], points: 60 },
        'N2': { name: 'Nitrogen Gas', elements: ['N', 'N'], points: 60 },
        'Cl2': { name: 'Chlorine Gas', elements: ['Cl', 'Cl'], points: 70 },
        'F2': { name: 'Fluorine Gas', elements: ['F', 'F'], points: 70 },
        'Br2': { name: 'Bromine Gas', elements: ['Br', 'Br'], points: 80 },
        'I2': { name: 'Iodine Gas', elements: ['I', 'I'], points: 80 },
        
        // Simple compounds (2 atoms)
        'HF': { name: 'Hydrogen Fluoride', elements: ['H', 'F'], points: 80 },
        'HCl': { name: 'Hydrogen Chloride', elements: ['H', 'Cl'], points: 90 },
        'HBr': { name: 'Hydrogen Bromide', elements: ['H', 'Br'], points: 90 },
        'HI': { name: 'Hydrogen Iodide', elements: ['H', 'I'], points: 90 },
        'CO': { name: 'Carbon Monoxide', elements: ['C', 'O'], points: 100 },
        'NO': { name: 'Nitric Oxide', elements: ['N', 'O'], points: 100 },
        'NaCl': { name: 'Sodium Chloride (Salt)', elements: ['Na', 'Cl'], points: 120 },
        'KCl': { name: 'Potassium Chloride', elements: ['K', 'Cl'], points: 120 },
        'CaO': { name: 'Calcium Oxide (Lime)', elements: ['Ca', 'O'], points: 130 },
        'MgO': { name: 'Magnesium Oxide', elements: ['Mg', 'O'], points: 130 },
        
        // Three-atom compounds
        'H2O': { name: 'Water', elements: ['H', 'H', 'O'], points: 150 },
        'CO2': { name: 'Carbon Dioxide', elements: ['C', 'O', 'O'], points: 180 },
        'SO2': { name: 'Sulfur Dioxide', elements: ['S', 'O', 'O'], points: 180 },
        'NO2': { name: 'Nitrogen Dioxide', elements: ['N', 'O', 'O'], points: 180 },
        'H2S': { name: 'Hydrogen Sulfide', elements: ['H', 'H', 'S'], points: 160 },
        'SO3': { name: 'Sulfur Trioxide', elements: ['S', 'O', 'O', 'O'], points: 220 },
        
        // Four-atom compounds
        'NH3': { name: 'Ammonia', elements: ['N', 'H', 'H', 'H'], points: 200 },
        'CH4': { name: 'Methane', elements: ['C', 'H', 'H', 'H', 'H'], points: 250 },
        'CCl4': { name: 'Carbon Tetrachloride', elements: ['C', 'Cl', 'Cl', 'Cl', 'Cl'], points: 350 },
        'SiH4': { name: 'Silane', elements: ['Si', 'H', 'H', 'H', 'H'], points: 260 },
        'PH3': { name: 'Phosphine', elements: ['P', 'H', 'H', 'H'], points: 210 },
        
        // Acids and bases
        'HNO3': { name: 'Nitric Acid', elements: ['H', 'N', 'O', 'O', 'O'], points: 300 },
        'H2SO4': { name: 'Sulfuric Acid', elements: ['H', 'H', 'S', 'O', 'O', 'O', 'O'], points: 400 },
        'H3PO4': { name: 'Phosphoric Acid', elements: ['H', 'H', 'H', 'P', 'O', 'O', 'O', 'O'], points: 450 },
        'HClO4': { name: 'Perchloric Acid', elements: ['H', 'Cl', 'O', 'O', 'O', 'O'], points: 380 },
        'NaOH': { name: 'Sodium Hydroxide', elements: ['Na', 'O', 'H'], points: 200 },
        'KOH': { name: 'Potassium Hydroxide', elements: ['K', 'O', 'H'], points: 200 },
        'Ca(OH)2': { name: 'Calcium Hydroxide', elements: ['Ca', 'O', 'H', 'O', 'H'], points: 280 },
        
        // Carbonates and sulfates
        'CaCO3': { name: 'Calcium Carbonate', elements: ['Ca', 'C', 'O', 'O', 'O'], points: 320 },
        'Na2CO3': { name: 'Sodium Carbonate', elements: ['Na', 'Na', 'C', 'O', 'O', 'O'], points: 340 },
        'CaSO4': { name: 'Calcium Sulfate', elements: ['Ca', 'S', 'O', 'O', 'O', 'O'], points: 350 },
        'Na2SO4': { name: 'Sodium Sulfate', elements: ['Na', 'Na', 'S', 'O', 'O', 'O', 'O'], points: 380 },
        'MgSO4': { name: 'Magnesium Sulfate', elements: ['Mg', 'S', 'O', 'O', 'O', 'O'], points: 360 },
        
        // Organic compounds
        'C2H6': { name: 'Ethane', elements: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'H'], points: 400 },
        'C2H4': { name: 'Ethylene', elements: ['C', 'C', 'H', 'H', 'H', 'H'], points: 350 },
        'C2H2': { name: 'Acetylene', elements: ['C', 'C', 'H', 'H'], points: 300 },
        'C3H8': { name: 'Propane', elements: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], points: 500 },
        'C6H6': { name: 'Benzene', elements: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H'], points: 600 },
        
        // Alcohols and organic oxygen compounds
        'CH3OH': { name: 'Methanol', elements: ['C', 'H', 'H', 'H', 'O', 'H'], points: 320 },
        'C2H5OH': { name: 'Ethanol', elements: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'O', 'H'], points: 450 },
        'CH3CHO': { name: 'Acetaldehyde', elements: ['C', 'C', 'H', 'H', 'H', 'H', 'O'], points: 400 },
        'CH3COOH': { name: 'Acetic Acid', elements: ['C', 'C', 'H', 'H', 'H', 'O', 'O', 'H'], points: 450 },
        
        // Nitrogen compounds
        'NH4Cl': { name: 'Ammonium Chloride', elements: ['N', 'H', 'H', 'H', 'H', 'Cl'], points: 350 },
        'NH4NO3': { name: 'Ammonium Nitrate', elements: ['N', 'H', 'H', 'H', 'H', 'N', 'O', 'O', 'O'], points: 500 },
        '(NH4)2SO4': { name: 'Ammonium Sulfate', elements: ['N', 'H', 'H', 'H', 'H', 'N', 'H', 'H', 'H', 'H', 'S', 'O', 'O', 'O', 'O'], points: 700 },
        
        // Phosphorus compounds
        'P2O5': { name: 'Phosphorus Pentoxide', elements: ['P', 'P', 'O', 'O', 'O', 'O', 'O'], points: 450 },
        'PCl3': { name: 'Phosphorus Trichloride', elements: ['P', 'Cl', 'Cl', 'Cl'], points: 280 },
        'PCl5': { name: 'Phosphorus Pentachloride', elements: ['P', 'Cl', 'Cl', 'Cl', 'Cl', 'Cl'], points: 400 },
        
        // Metal compounds
        'FeCl3': { name: 'Iron(III) Chloride', elements: ['Fe', 'Cl', 'Cl', 'Cl'], points: 300 },
        'FeSO4': { name: 'Iron(II) Sulfate', elements: ['Fe', 'S', 'O', 'O', 'O', 'O'], points: 380 },
        'CuSO4': { name: 'Copper(II) Sulfate', elements: ['Cu', 'S', 'O', 'O', 'O', 'O'], points: 390 },
        'ZnSO4': { name: 'Zinc Sulfate', elements: ['Zn', 'S', 'O', 'O', 'O', 'O'], points: 380 },
        'AgNO3': { name: 'Silver Nitrate', elements: ['Ag', 'N', 'O', 'O', 'O'], points: 350 },
        
        // Silicon compounds
        'SiO2': { name: 'Silicon Dioxide (Quartz)', elements: ['Si', 'O', 'O'], points: 200 },
        'SiCl4': { name: 'Silicon Tetrachloride', elements: ['Si', 'Cl', 'Cl', 'Cl', 'Cl'], points: 350 },
        
        // Halogen compounds
        'ClO2': { name: 'Chlorine Dioxide', elements: ['Cl', 'O', 'O'], points: 200 },
        'BrF3': { name: 'Bromine Trifluoride', elements: ['Br', 'F', 'F', 'F'], points: 280 },
        'IF5': { name: 'Iodine Pentafluoride', elements: ['I', 'F', 'F', 'F', 'F', 'F'], points: 400 },
        
        // Additional simple compounds
        'BeO': { name: 'Beryllium Oxide', elements: ['Be', 'O'], points: 140 },
        'BaO': { name: 'Barium Oxide', elements: ['Ba', 'O'], points: 150 },
        'SrO': { name: 'Strontium Oxide', elements: ['Sr', 'O'], points: 150 },
        'Al2O3': { name: 'Aluminum Oxide', elements: ['Al', 'Al', 'O', 'O', 'O'], points: 320 },
        'Fe2O3': { name: 'Iron(III) Oxide (Rust)', elements: ['Fe', 'Fe', 'O', 'O', 'O'], points: 340 },
        'FeO': { name: 'Iron(II) Oxide', elements: ['Fe', 'O'], points: 160 },
        'CuO': { name: 'Copper(II) Oxide', elements: ['Cu', 'O'], points: 170 },
        'ZnO': { name: 'Zinc Oxide', elements: ['Zn', 'O'], points: 160 },
        'TiO2': { name: 'Titanium Dioxide', elements: ['Ti', 'O', 'O'], points: 200 },
        
        // More chlorides and bromides
        'CaCl2': { name: 'Calcium Chloride', elements: ['Ca', 'Cl', 'Cl'], points: 220 },
        'MgCl2': { name: 'Magnesium Chloride', elements: ['Mg', 'Cl', 'Cl'], points: 210 },
        'AlCl3': { name: 'Aluminum Chloride', elements: ['Al', 'Cl', 'Cl', 'Cl'], points: 300 },
        'FeCl2': { name: 'Iron(II) Chloride', elements: ['Fe', 'Cl', 'Cl'], points: 240 },
        'CuCl2': { name: 'Copper(II) Chloride', elements: ['Cu', 'Cl', 'Cl'], points: 250 },
        'ZnCl2': { name: 'Zinc Chloride', elements: ['Zn', 'Cl', 'Cl'], points: 240 },
        'NaBr': { name: 'Sodium Bromide', elements: ['Na', 'Br'], points: 130 },
        'KBr': { name: 'Potassium Bromide', elements: ['K', 'Br'], points: 130 },
        'CaBr2': { name: 'Calcium Bromide', elements: ['Ca', 'Br', 'Br'], points: 240 },
        'NaI': { name: 'Sodium Iodide', elements: ['Na', 'I'], points: 140 },
        'KI': { name: 'Potassium Iodide', elements: ['K', 'I'], points: 140 },
        
        // Nitrates and nitrites
        'NaNO3': { name: 'Sodium Nitrate', elements: ['Na', 'N', 'O', 'O', 'O'], points: 320 },
        'KNO3': { name: 'Potassium Nitrate', elements: ['K', 'N', 'O', 'O', 'O'], points: 320 },
        'Ca(NO3)2': { name: 'Calcium Nitrate', elements: ['Ca', 'N', 'O', 'O', 'O', 'N', 'O', 'O', 'O'], points: 550 },
        'Mg(NO3)2': { name: 'Magnesium Nitrate', elements: ['Mg', 'N', 'O', 'O', 'O', 'N', 'O', 'O', 'O'], points: 540 },
        'NaNO2': { name: 'Sodium Nitrite', elements: ['Na', 'N', 'O', 'O'], points: 260 },
        'KNO2': { name: 'Potassium Nitrite', elements: ['K', 'N', 'O', 'O'], points: 260 },
        
        // Phosphates
        'Na3PO4': { name: 'Sodium Phosphate', elements: ['Na', 'Na', 'Na', 'P', 'O', 'O', 'O', 'O'], points: 500 },
        'K3PO4': { name: 'Potassium Phosphate', elements: ['K', 'K', 'K', 'P', 'O', 'O', 'O', 'O'], points: 500 },
        'Ca3(PO4)2': { name: 'Calcium Phosphate', elements: ['Ca', 'Ca', 'Ca', 'P', 'O', 'O', 'O', 'O', 'P', 'O', 'O', 'O', 'O'], points: 800 },
        
        // More organic compounds
        'C4H10': { name: 'Butane', elements: ['C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], points: 700 },
        'C5H12': { name: 'Pentane', elements: ['C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], points: 850 },
        'C3H6': { name: 'Propene', elements: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H'], points: 450 },
        'C4H8': { name: 'Butene', elements: ['C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], points: 600 },
        'C2H6O': { name: 'Diethyl Ether', elements: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'O'], points: 460 },
        'C3H6O': { name: 'Acetone', elements: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'O'], points: 500 },
        'C6H12O6': { name: 'Glucose', elements: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'O', 'O', 'O'], points: 1200 },
        'C12H22O11': { name: 'Sucrose (Sugar)', elements: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], points: 2000 },
        
        // Amino acids (simplified)
        'C2H5NO2': { name: 'Glycine', elements: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'N', 'O', 'O'], points: 500 },
        'C3H7NO2': { name: 'Alanine', elements: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'N', 'O', 'O'], points: 650 },
        
        // Nitrogen oxides
        'N2O': { name: 'Nitrous Oxide', elements: ['N', 'N', 'O'], points: 180 },
        'N2O3': { name: 'Dinitrogen Trioxide', elements: ['N', 'N', 'O', 'O', 'O'], points: 300 },
        'N2O4': { name: 'Dinitrogen Tetroxide', elements: ['N', 'N', 'O', 'O', 'O', 'O'], points: 360 },
        'N2O5': { name: 'Dinitrogen Pentoxide', elements: ['N', 'N', 'O', 'O', 'O', 'O', 'O'], points: 420 },
        
        // Sulfur compounds
        'H2S': { name: 'Hydrogen Sulfide', elements: ['H', 'H', 'S'], points: 160 },
        'CS2': { name: 'Carbon Disulfide', elements: ['C', 'S', 'S'], points: 200 },
        'SF6': { name: 'Sulfur Hexafluoride', elements: ['S', 'F', 'F', 'F', 'F', 'F', 'F'], points: 450 },
        'SO2Cl2': { name: 'Sulfuryl Chloride', elements: ['S', 'O', 'O', 'Cl', 'Cl'], points: 320 },
        
        // Peroxides
        'H2O2': { name: 'Hydrogen Peroxide', elements: ['H', 'H', 'O', 'O'], points: 200 },
        'Na2O2': { name: 'Sodium Peroxide', elements: ['Na', 'Na', 'O', 'O'], points: 280 },
        'BaO2': { name: 'Barium Peroxide', elements: ['Ba', 'O', 'O'], points: 250 },
        
        // Complex metal compounds
        'K2Cr2O7': { name: 'Potassium Dichromate', elements: ['K', 'K', 'Cr', 'Cr', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], points: 700 },
        'KMnO4': { name: 'Potassium Permanganate', elements: ['K', 'Mn', 'O', 'O', 'O', 'O'], points: 450 },
        'CaCO3': { name: 'Calcium Carbonate (Limestone)', elements: ['Ca', 'C', 'O', 'O', 'O'], points: 320 },
        'NaHCO3': { name: 'Sodium Bicarbonate', elements: ['Na', 'H', 'C', 'O', 'O', 'O'], points: 350 },
        'KHCO3': { name: 'Potassium Bicarbonate', elements: ['K', 'H', 'C', 'O', 'O', 'O'], points: 350 },
        
        // Fluorides
        'CaF2': { name: 'Calcium Fluoride', elements: ['Ca', 'F', 'F'], points: 220 },
        'MgF2': { name: 'Magnesium Fluoride', elements: ['Mg', 'F', 'F'], points: 210 },
        'AlF3': { name: 'Aluminum Fluoride', elements: ['Al', 'F', 'F', 'F'], points: 300 },
        'NaF': { name: 'Sodium Fluoride', elements: ['Na', 'F'], points: 120 },
        'KF': { name: 'Potassium Fluoride', elements: ['K', 'F'], points: 120 },
        
        // Hydrates (simplified without explicit water notation)
        'CuSO4·5H2O': { name: 'Copper Sulfate Pentahydrate', elements: ['Cu', 'S', 'O', 'O', 'O', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O'], points: 900 },
        'FeSO4·7H2O': { name: 'Iron Sulfate Heptahydrate', elements: ['Fe', 'S', 'O', 'O', 'O', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O', 'H', 'H', 'O'], points: 1100 },
        
        // Acetates
        'CH3COONa': { name: 'Sodium Acetate', elements: ['C', 'H', 'H', 'H', 'C', 'O', 'O', 'Na'], points: 450 },
        'CH3COOK': { name: 'Potassium Acetate', elements: ['C', 'H', 'H', 'H', 'C', 'O', 'O', 'K'], points: 450 },
        '(CH3COO)2Ca': { name: 'Calcium Acetate', elements: ['C', 'H', 'H', 'H', 'C', 'O', 'O', 'C', 'H', 'H', 'H', 'C', 'O', 'O', 'Ca'], points: 750 },
        
        // More alcohols
        'C3H7OH': { name: 'Propanol', elements: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'H'], points: 600 },
        'C4H9OH': { name: 'Butanol', elements: ['C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'H'], points: 750 },
        
        // Esters
        'CH3COOC2H5': { name: 'Ethyl Acetate', elements: ['C', 'H', 'H', 'H', 'C', 'O', 'O', 'C', 'C', 'H', 'H', 'H', 'H', 'H'], points: 700 },
        
        // Amines
        'C2H5NH2': { name: 'Ethylamine', elements: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'N', 'H', 'H'], points: 500 },
        'C3H7NH2': { name: 'Propylamine', elements: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'N', 'H', 'H'], points: 650 },
        '(CH3)2NH': { name: 'Dimethylamine', elements: ['C', 'H', 'H', 'H', 'C', 'H', 'H', 'H', 'N', 'H'], points: 500 },
        '(CH3)3N': { name: 'Trimethylamine', elements: ['C', 'H', 'H', 'H', 'C', 'H', 'H', 'H', 'C', 'H', 'H', 'H', 'N'], points: 650 },
        
        // Aromatic compounds
        'C6H5OH': { name: 'Phenol', elements: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'O', 'H'], points: 750 },
        'C6H5NH2': { name: 'Aniline', elements: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'N', 'H', 'H'], points: 800 },
        'C7H8': { name: 'Toluene', elements: ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], points: 750 },
        
        // Biological molecules (simplified)
        'C4H6O4': { name: 'Succinic Acid', elements: ['C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'O'], points: 700 },
        'C6H8O7': { name: 'Citric Acid', elements: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], points: 1000 }
    },
    
    // Check if collected elements can form a molecule and remove used atoms
    checkForMolecules: function(collectedElements) {
        const elementCounts = {};
        collectedElements.forEach(element => {
            elementCounts[element] = (elementCounts[element] || 0) + 1;
        });
        
        const formedMolecules = [];
        const remainingElements = [...collectedElements]; // Copy array
        
        // Sort molecules by complexity (more complex = higher points = check first)
        const sortedMolecules = Object.entries(this.molecules).sort((a, b) => b[1].points - a[1].points);
        
        for (const [formula, moleculeData] of sortedMolecules) {
            const requiredCounts = {};
            moleculeData.elements.forEach(element => {
                requiredCounts[element] = (requiredCounts[element] || 0) + 1;
            });
            
            // Check if we have enough of each required element
            let canForm = true;
            for (const [element, required] of Object.entries(requiredCounts)) {
                const availableCount = remainingElements.filter(e => e === element).length;
                if (availableCount < required) {
                    canForm = false;
                    break;
                }
            }
            
            if (canForm) {
                // Remove the used elements from remaining elements
                for (const [element, required] of Object.entries(requiredCounts)) {
                    for (let i = 0; i < required; i++) {
                        const index = remainingElements.indexOf(element);
                        if (index > -1) {
                            remainingElements.splice(index, 1);
                        }
                    }
                }
                
                formedMolecules.push({
                    formula: formula,
                    name: moleculeData.name,
                    points: moleculeData.points,
                    elements: moleculeData.elements
                });
                
                // Only form one molecule at a time for better gameplay
                break;
            }
        }
        
        return {
            molecules: formedMolecules,
            remainingElements: remainingElements,
            elementsUsed: collectedElements.length - remainingElements.length
        };
    },
    
    // Get random element for spawning (with weighted probabilities)
    getRandomElement: function() {
        // Define weights for common elements (higher weight = more likely to spawn)
        const elementWeights = {
            'H': 5,  // Hydrogen - very common
            'C': 4,  // Carbon - very common  
            'O': 4,  // Oxygen - very common
            'N': 2,  // Nitrogen - common
            'Cl': 2, // Chlorine - common
            'Na': 2, // Sodium - common
            'Ca': 2, // Calcium - common
            'S': 1.5, // Sulfur - somewhat common
            'P': 1.5, // Phosphorus - somewhat common
            'K': 1.5, // Potassium - somewhat common
            'Mg': 1.5, // Magnesium - somewhat common
        };
        
        // Create weighted array
        const weightedElements = [];
        const elementKeys = Object.keys(this.elements);
        
        elementKeys.forEach(elementKey => {
            const weight = elementWeights[elementKey] || 1; // Default weight is 1
            // Add element multiple times based on weight (multiply by 10 for integer weights)
            const count = Math.round(weight * 10);
            for (let i = 0; i < count; i++) {
                weightedElements.push(elementKey);
            }
        });
        
        // Select random element from weighted array
        const randomKey = weightedElements[Math.floor(Math.random() * weightedElements.length)];
        return {
            symbol: randomKey,
            data: this.elements[randomKey]
        };
    }
};