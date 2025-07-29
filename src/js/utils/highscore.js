// High Score Manager for Chemistry Dash
class HighScoreManager {
    constructor() {
        this.storageKey = 'chemistry-dash-highscores';
        this.maxScores = 10; // Keep top 10 scores
        this.highScores = this.loadHighScores();
    }

    // Load high scores from localStorage
    loadHighScores() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const scores = JSON.parse(stored);
                // Validate and ensure all scores have required properties
                return scores.filter(score => 
                    score.score && 
                    score.date && 
                    score.level &&
                    score.difficulty
                ).slice(0, this.maxScores);
            }
        } catch (error) {
            console.warn('Error loading high scores:', error);
        }
        return [];
    }

    // Save high scores to localStorage
    saveHighScores() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.highScores));
        } catch (error) {
            console.warn('Error saving high scores:', error);
        }
    }

    // Add a new score and return if it's a high score
    addScore(scoreData) {
        const newScore = {
            score: scoreData.score,
            level: scoreData.level,
            difficulty: scoreData.difficulty,
            date: new Date().toISOString(),
            formedMolecules: scoreData.formedMolecules || [],
            elementsCollected: scoreData.elementsCollected || 0,
            playerName: scoreData.playerName || 'Anonymous'
        };

        // Check if this is a high score
        const isHighScore = this.isHighScore(newScore.score);
        
        // Add to array
        this.highScores.push(newScore);
        
        // Sort by score (descending)
        this.highScores.sort((a, b) => b.score - a.score);
        
        // Keep only top scores
        this.highScores = this.highScores.slice(0, this.maxScores);
        
        // Save to localStorage
        this.saveHighScores();
        
        return {
            isHighScore,
            rank: this.highScores.findIndex(score => score === newScore) + 1,
            newScore
        };
    }

    // Check if a score qualifies as a high score
    isHighScore(score) {
        if (this.highScores.length < this.maxScores) {
            return true;
        }
        return score > this.highScores[this.highScores.length - 1].score;
    }

    // Get all high scores
    getHighScores() {
        return [...this.highScores];
    }

    // Get high scores filtered by difficulty
    getHighScoresByDifficulty(difficulty) {
        return this.highScores.filter(score => score.difficulty === difficulty);
    }

    // Get the best score for a difficulty
    getBestScore(difficulty = null) {
        if (difficulty) {
            const difficultyScores = this.getHighScoresByDifficulty(difficulty);
            return difficultyScores.length > 0 ? difficultyScores[0] : null;
        }
        return this.highScores.length > 0 ? this.highScores[0] : null;
    }

    // Clear all high scores
    clearHighScores() {
        this.highScores = [];
        this.saveHighScores();
    }

    // Format score for display
    formatScore(score) {
        return score.toLocaleString();
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    // Get difficulty emoji
    getDifficultyEmoji(difficulty) {
        const emojis = {
            easy: '🟢',
            medium: '🟡',
            hard: '🔴'
        };
        return emojis[difficulty] || '⚪';
    }

    // Get statistics
    getStats() {
        if (this.highScores.length === 0) {
            return {
                totalGames: 0,
                bestScore: 0,
                averageScore: 0,
                totalMolecules: 0,
                favoritesDifficulty: 'medium'
            };
        }

        const totalGames = this.highScores.length;
        const bestScore = this.highScores[0].score;
        const averageScore = Math.round(this.highScores.reduce((sum, score) => sum + score.score, 0) / totalGames);
        const totalMolecules = this.highScores.reduce((sum, score) => sum + (score.formedMolecules?.length || 0), 0);
        
        // Find most played difficulty
        const difficultyCounts = this.highScores.reduce((counts, score) => {
            counts[score.difficulty] = (counts[score.difficulty] || 0) + 1;
            return counts;
        }, {});
        
        const favoriteDifficulty = Object.keys(difficultyCounts).reduce((a, b) => 
            difficultyCounts[a] > difficultyCounts[b] ? a : b, 'medium'
        );

        return {
            totalGames,
            bestScore,
            averageScore,
            totalMolecules,
            favoriteDifficulty
        };
    }
}
