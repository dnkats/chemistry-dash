// Main entry point for Chemistry Dash
window.addEventListener('DOMContentLoaded', () => {
    console.log('Chemistry Dash - Loading...');
    
    // Initialize the game
    const game = new Game();
    game.init();
    
    console.log('Chemistry Dash - Ready to play!');
    
    // Add global reference for debugging
    window.chemistryDash = game;
});