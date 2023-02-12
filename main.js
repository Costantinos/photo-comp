photo1 = document.getElementById("photo1");
photo2 = document.getElementById("photo2");
vote1Btn = document.getElementById("vote1");
vote2Btn = document.getElementById("vote2");
photo1Votes = document.getElementById("photo1-votes");
photo2Votes = document.getElementById("photo2-votes");
const nextBtn = document.getElementById("next");
const result = document.getElementById("result");

let currentPair = 0;
let photoPairs = [];

// Function to get all photos from a directory
async function getPhotos(directory) {
    return fetch(directory)
        .then((response) => response.json())
        .then((data) => {
            return data.map((photo) => directory + "/" + photo);
        });
}

// Function to create photo pairs from two directories
async function createPairs(directory1, directory2) {
    let photos1 = await getPhotos(directory1);
    let photos2 = await getPhotos(directory2);
    let minLength = Math.min(photos1.length, photos2.length);
    photoPairs = [];

    for (let i = 0; i < minLength; i++) {
        photoPairs.push([photos1[i], photos2[i]]);
    }
}

// Function to update the photos and vote count display
async function updateDisplay() {

    let div1 = document.getElementById("photo1");
    let div2 = document.getElementById("photo2");

    let parent = div1.parentNode;
    let nextSibling = div1.nextSibling;

    // Randomly determine if the order should be swapped
    let shouldSwap = Math.random() >= 0.5;

    var old_element = document.getElementById("vote1");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    old_element = document.getElementById("vote2");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    if (shouldSwap) {
        parent.removeChild(div1);
        parent.insertBefore(div1, div2);
        vote1Btn = document.getElementById("vote2");
        vote2Btn = document.getElementById("vote1");
        photo1Votes = document.getElementById("photo2-votes");
        photo2Votes = document.getElementById("photo1-votes");
    } else {
        parent.removeChild(div2);
        parent.insertBefore(div2, div1);
        photo1Votes = document.getElementById("photo1-votes");
        photo2Votes = document.getElementById("photo2-votes");
        vote1Btn = document.getElementById("vote1");
        vote2Btn = document.getElementById("vote2");
    }

    photo1.src = photoPairs[currentPair][0];
    photo2.src = photoPairs[currentPair][1];

    // Check if the votes are stored in local storage, otherwise initialize to 0
    let photo1Count = localStorage.getItem(`photo1-${currentPair}-votes`) || 0;
    let photo2Count = localStorage.getItem(`photo2-${currentPair}-votes`) || 0;

    photo1Votes.textContent = photo1Count;
    photo2Votes.textContent = photo2Count;


    // Add click event listeners to the vote buttons
    vote1Btn.addEventListener("click", () => {
        let photo1Count = localStorage.getItem(`photo1-${currentPair}-votes`) || 0;
        photo1Count++;
        localStorage.setItem(`photo1-${currentPair}-votes`, photo1Count);
        photo1Votes.textContent = photo1Count;
    });

    vote2Btn.addEventListener("click", () => {
        let photo2Count = localStorage.getItem(`photo2-${currentPair}-votes`) || 0;
        photo2Count++;
        localStorage.setItem(`photo2-${currentPair}-votes`, photo2Count);
        photo2Votes.textContent = photo2Count;

    });
}


// Add click event listener to the next button
nextBtn.addEventListener("click", () => {
    currentPair++;
    // All photo pairs have been displayed
    let totalVotes1 = 0;
    let totalVotes2 = 0;

    for (let i = 0; i < photoPairs.length; i++) {
        totalVotes1 += parseInt(localStorage.getItem(`photo1-${i}-votes`) || 0);
        totalVotes2 += parseInt(localStorage.getItem(`photo2-${i}-votes`) || 0);
    }

    scores = {'1': totalVotes1, '2': totalVotes2}
    document.getElementById("scores").innerHTML = "Results: " + JSON.stringify(scores);

    if (currentPair >= photoPairs.length) {
        // All photo pairs have been displayed
        let totalVotes1 = 0;
        let totalVotes2 = 0;

        for (let i = 0; i < photoPairs.length; i++) {
            totalVotes1 += parseInt(localStorage.getItem(`photo1-${i}-votes`) || 0);
            totalVotes2 += parseInt(localStorage.getItem(`photo2-${i}-votes`) || 0);
        }
        scores = {'1': totalVotes1, '2': totalVotes2}

        var str = '';
        // Display the result based on which directory received more votes
        if (totalVotes1 > totalVotes2) {
            str = "Directory 1 Wins!";
        } else if (totalVotes2 > totalVotes1) {
            str = "Directory 2 Wins!";
        } else {
            str = "It's a Tie!";
        }

        document.getElementById("scores").innerHTML = "Results: " + JSON.stringify(scores) + " - " + str;


        vote1Btn.disabled = true;
        vote2Btn.disabled = true;
        nextBtn.disabled = true;
    } else {
        updateDisplay();
    }
});

document.getElementById("clear-btn").addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Call the createPairs function to initialize the photo pairs
createPairs("photos/iphone.json", "photos/s22.json").then(() => {
    updateDisplay();
});

