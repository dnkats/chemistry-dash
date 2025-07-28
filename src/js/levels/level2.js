const level2 = {
    layout: [
        // Define the layout of the level with positions for obstacles and platforms
        { type: 'platform', x: 0, y: 400, width: 800, height: 20 },
        { type: 'obstacle', x: 200, y: 350, width: 50, height: 50, image: 'assets/images/obstacles/acid.png' },
        { type: 'obstacle', x: 400, y: 300, width: 50, height: 50, image: 'assets/images/obstacles/breakable.png' },
        { type: 'platform', x: 600, y: 250, width: 200, height: 20 },
        { type: 'obstacle', x: 700, y: 200, width: 50, height: 50, image: 'assets/images/obstacles/chemical-spill.png' },
    ],
    objectives: [
        // Define the objectives for the level
        { type: 'collect', item: 'element', quantity: 5 },
        { type: 'reach', target: { x: 800, y: 400 } },
    ],
    difficulty: 'medium',
    background: 'assets/images/backgrounds/level2-background.png',
    music: 'assets/audio/music/level2-music.mp3',
};

export default level2;