# Photo Comparison Voting Application

## Introduction

This is a JavaScript-based photo pair voting application. The application displays two photos at a time and allows users to vote for their favorite photo. The votes are stored in the browser's local storage and are updated each time a user votes.
#### You can find a demo here (https://costantinos.github.io/photo-comp/). 

## Features

1. Display two photos at a time
2. Allow users to vote for their favorite photo
3. Store votes in the browser's local storage
4. Display the current vote count for each photo
5. Display the total vote count for all photo pairs when all photo pairs have been displayed

## Requirements

- A modern web browser that supports JavaScript and local storage
- Two directories containing photos to be used in the voting process
  - You need a server for the fetch to work correctly
## Usage

1. Call the **createPairs** function with the two directories containing the photos. This will create an array of photo pairs to be displayed.
2. Call the **updateDisplay** function to display the first photo pair and initialize the vote count display.
3. Use the "Next" button to display the next photo pair.
4. Use the "Vote 1" and "Vote 2" buttons to vote for the photos.

## Implementation Details

1. The **getPhotos** function retrieves the list of photos from a directory and returns an array of photo URLs.
2. The **createPairs** function retrieves the photos from two directories and creates an array of photo pairs by taking the minimum of the number of photos in each directory.
3. The **updateDisplay** function updates the photo display and vote count display. It also adds click event listeners to the "Vote 1" and "Vote 2" buttons to allow users to vote.
4. The "Next" button has a click event listener that advances to the next photo pair.
5. The votes for each photo are stored in the browser's local storage using the key **photo1-${currentPair}-votes** for photo 1 and **photo2-${currentPair}-votes** for photo 2. The vote count for each photo is updated each time a user votes.
6. The total vote count for all photo pairs is displayed when all photo pairs have been displayed.