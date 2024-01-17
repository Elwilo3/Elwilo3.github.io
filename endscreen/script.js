window.addEventListener('load', () => {
    const statsContainer = document.getElementById("statsContainer");

    let stats = JSON.parse(localStorage.getItem('stats'));

    if (!stats || stats.gamesPlayed === 0) {
        statsContainer.innerHTML = "<h2>Please play some games to view your statistics!</h2>";
    } else {
        const gamesPlayed = document.createElement('p');
        gamesPlayed.innerText = `Number of games played: ${stats.gamesPlayed}`;
        statsContainer.appendChild(gamesPlayed);

        const winPercentage = document.createElement('p');
        winPercentage.innerText = `Win percentage: ${((stats.winCount / stats.gamesPlayed) * 100).toFixed(2)}%`;
        statsContainer.appendChild(winPercentage);

        const currentStreak = document.createElement('p');
        currentStreak.innerText = `Current win streak: ${stats.currentStreak}`;
        statsContainer.appendChild(currentStreak);

        const guessDistributionHeader = document.createElement('h2');
        guessDistributionHeader.innerText = "Guess Distribution";
        statsContainer.appendChild(guessDistributionHeader);

        const guessDistribution = document.createElement('div');
        Object.keys(stats.guessDistribution).forEach(score => {
            let para = document.createElement('p');
            para.innerText = `Score: ${score}, Times: ${stats.guessDistribution[score]}`;
            guessDistribution.appendChild(para);
        });
        statsContainer.appendChild(guessDistribution);
    }
});