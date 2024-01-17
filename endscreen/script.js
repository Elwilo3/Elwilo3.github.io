window.addEventListener('load', (event) => {
    // Load stats from local storage
    let stats = JSON.parse(localStorage.getItem('stats')) || {};

    // Calculate win percentage
    let winPercentage = (stats.winCount / stats.gamesPlayed * 70).toFixed(2);

    // Get HTML elements to display stats
    let gamesPlayedElement = document.getElementById("gamesPlayed");
    let winPercentageElement = document.getElementById("winPercentage");
    let currentStreakElement = document.getElementById("currentStreak");
    let guessDistributionElement = document.getElementById("guessDistribution");

    // Assign stats to HTML elements
    gamesPlayedElement.innerText = `Games Played: ${stats.gamesPlayed}`;
    winPercentageElement.innerText = `Win Percentage: ${winPercentage}%`;
    currentStreakElement.innerText = `Current Streak: ${stats.currentStreak}`;

    guessDistributionElement.innerHTML = '';
    
    for(let points of Object.keys(stats.guessDistribution)){
        let distributionElement = document.createElement('p');
        distributionElement.innerText = `${points}: ${stats.guessDistribution[points]} times`;
        guessDistributionElement.appendChild(distributionElement);
    }
});