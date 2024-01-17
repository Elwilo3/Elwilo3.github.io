window.addEventListener('load', (event) => {
    let images = [
        {src: "images/image1.jpg", publishedYear: 1945, name: "Mushroom Cloud", publishedBy: "Lieutenant Charles Levy"},
        {src: "images/image2.jpg", publishedYear: 2023, name: "The Eras Tour", publishedBy: "Chris Pizzello"},
        {src: "images/image3.jpg", publishedYear: 2015, name: "Windows 10", publishedBy: "Microsoft"},
        {src: "images/image4.jpg", publishedYear: 1976, name: "Down with Apartheid San Francisco", publishedBy: "Bancroft Library"},
        {src: "images/image5.jpg", publishedYear: 1972, name: "Mao 95", publishedBy: "Andy Warhol Mao"},
    ];

    const today = new Date().toDateString();
    const gameStatusKey = 'pudaguessrGameStatus';
    const gameStatus = JSON.parse(localStorage.getItem(gameStatusKey));
    
    let correctYear;
    let currentIndex = 0;
    let totalScore = 0;

    if (gameStatus && gameStatus.lastPlayed === today) {
        totalScore = JSON.parse(localStorage.getItem('score')) || totalScore;
    }
    
    let scoreElement = document.getElementById("score");
    scoreElement.innerText = "Current Score: " + totalScore;

    // Initialize global stats object
    let stats = JSON.parse(localStorage.getItem('stats')) || {
        gamesPlayed: 0,
        winCount: 0,
        currentStreak: 0,
        guessDistribution: {
            '100': 0,
            '200': 0,
            '300': 0,
            '400': 0,
            '500': 0,
        }
    };

    // Game logic methods like loadNextImage(), updateRemainingImages(), etc.

    function loadNextImage() {
        let imageContainer = document.getElementById("image");
        let imageContext = document.getElementById("image-context");
        correctYear = images[currentIndex].publishedYear;

        imageContainer.src = images[currentIndex].src;
        imageContext.innerText = `Name: ${images[currentIndex].name}, Published by: ${images[currentIndex].publishedBy}`;
    }

    function updateRemainingImages() {
        let remainingImagesElement = document.getElementById("remaining-images");
        remainingImagesElement.innerText = "Images left: " + (images.length - currentIndex);
    }

    loadNextImage();
    updateRemainingImages();

    let slider = document.getElementById("year-slider");
    let selectedYearInput = document.getElementById("selected-year");

    slider.addEventListener('input', function() {
        selectedYearInput.value = this.value;
    });

    selectedYearInput.addEventListener('input', function() {
        slider.value = this.value;
    });

    function endGame(totalScore) {
        localStorage.setItem('score', JSON.stringify(totalScore));

        // place the rest of your endGame code here

        localStorage.setItem('gameStatus', JSON.stringify({ lastPlayed: today }));
        window.location.href = 'endscreen/index.html';
    }

    let button = document.getElementById("confirm-button");
    button.addEventListener('click', function() {
        let selectedYear = parseInt(selectedYearInput.value);
        let difference = Math.abs(correctYear - selectedYear);
        let scoreForThisRound = Math.max(0, 100 - (Math.min(difference, 100)));
        
        totalScore += scoreForThisRound;
        scoreElement.innerText = "Current Score: " + totalScore;

        currentIndex += 1;
        updateRemainingImages();
        
        if (currentIndex < images.length) {
            loadNextImage();
        } else {
            endGame(totalScore);
        }
    });
});