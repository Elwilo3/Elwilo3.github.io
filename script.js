    window.addEventListener('load', (event) => {
        let images = [
            {src: "images/image1.jpg", publishedYear: 1945, name: "Mushroom Cloud", publishedBy: "Lieutenant Charles Levy"},
            {src: "images/image2.jpg", publishedYear: 2023, name: "The Eras Tour", publishedBy: "Chris Pizzello"},
            {src: "images/image3.jpg", publishedYear: 2015, name: "Windows 10", publishedBy: "Microsoft"},
            {src: "images/image4.jpg", publishedYear: 1976, name: "Down with Apartheid San Francisco", publishedBy: "Bancroft Library"},
            {src: "images/image5.jpg", publishedYear: 1972, name: "Mao 95", publishedBy: "Andy Warhol Mao"},
        ];

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
            remainingImagesElement.innerText =  images.length + "/" + (images.length - currentIndex);
        }

        loadNextImage();
        updateRemainingImages();

        let slider = document.getElementById("year-slider");
        let selectedYearInput = document.getElementById("selected-year");

        // When the slider changes, update the selected-year input
        slider.addEventListener('input', function() {
            selectedYearInput.value = this.value;
        });
        
        // When the selected-year input changes, update the slider
        selectedYearInput.addEventListener('input', function() {
            slider.value = this.value;
        });

        let button = document.getElementById("confirm-button");
        button.addEventListener('click', function() {
            let selectedYear = selectedYearInput.value; // Adjust this to get value from input field
            let difference = Math.abs(correctYear - selectedYear);
            if(difference > 100) difference = 100;
            let roundScore = Math.max(0, 100 - difference);
            totalScore += roundScore;
            scoreElement.innerText = "Current Score: " + totalScore;

            currentIndex = currentIndex + 1;
            updateRemainingImages();
            
            if (currentIndex < images.length) {
                loadNextImage();
            } else {
                alert(`Spillet er over! Du fikk ${totalScore} av 500 velidg brannpunkt!`);
            }
        });
    });