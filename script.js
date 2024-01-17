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
    let scoreElement = document.getElementById("score");

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

    function endGame() {
        alert(`Spillet er over! Du fikk ${totalScore} av 500 mulige poeng!`);

        // Retrieve existing scores from local storage, or initialize if not present
        let scores = JSON.parse(localStorage.getItem('scores')) || {};
        let scoreRange = Math.floor(totalScore / 1000) * 1000;
        if (scoreRange === 0) scoreRange = 1000; // Minimum range if score is below 1000
        scores[scoreRange.toString()] = (scores[scoreRange.toString()] || 0) + 1; // Increment score count
        localStorage.setItem('scores', JSON.stringify(scores));

        localStorage.setItem(gameStatusKey, JSON.stringify({ lastPlayed: today }));
        window.location.href = 'endscreen/index.html';
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
            endGame();
        }
    });
});