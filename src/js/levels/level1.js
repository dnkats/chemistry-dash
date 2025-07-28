const level1 = {
    layout: [
        // Define the layout of the level using a grid or array
        // Example: 0 = empty space, 1 = ground, 2 = obstacle
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    obstacles: [
        {
            type: 'chemical-spill',
            position: { x: 4, y: 1 },
            image: 'assets/images/obstacles/chemical-spill.png'
        },
        {
            type: 'test-tube',
            position: { x: 1, y: 2 },
            image: 'assets/images/obstacles/test-tube.png'
        }
    ],
    objectives: {
        collect: [
            {
                type: 'element',
                position: { x: 3, y: 0 },
                image: 'assets/images/elements/hydrogen.png'
            },
            {
                type: 'element',
                position: { x: 5, y: 0 },
                image: 'assets/images/elements/oxygen.png'
            }
        ],
        goal: 'Reach the end of the level while collecting elements!'
    },
    onLevelComplete: function() {
        // Logic to grow the molecule after completing the level
        console.log('Level 1 complete! Molecule grows!');
    }
};

export default level1;