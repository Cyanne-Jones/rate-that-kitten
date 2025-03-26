# [Rate! That! KITTEN!](https://rate-that-kitten.cyanne.codes)
### A cat pic rating application: an AI aided experiment 🐈
Using the CaaS (Cats as a Service) [Cat Api](https://thecatapi.com/), bring in photos of kitties so a user can rate them based on various attributes. 

Assume single user, and utilize local storage options (Zustand persistent store, IndexedDB etc) to persist a user's favorite highest-rated kitty cats. 
Keep adding functionality until it gets too unweildy and breaks, take note of triumps and struggles (for learning!)


## What we're workin with so far  💅🏼
![Screenshot 2025-03-26 at 4 41 04 PM](https://github.com/user-attachments/assets/637ca2d6-f781-4c37-b37f-52889ba086fd)

### The good: 
- Quick general file structure
- Great grasp of React state management, quickly handles that functionality
- I love when animations are written for me, this is magic ✨
- Gave commands to remove the node-modules mistakes without me having to Google

### The bad:
- No .gitignore, pushed node-modules (oof!)
- Installed create vite react-ts twice for two src files (yikes!)
- Outdated/incorrect (but effective) use of Zustand persistent local store
- Waaaaaay overengineered styling. These CSS files are giant and kinda gross to work in
- Would overengineer solutions if I didn't keep my requests as strictly scoped as possible.

### Overall
I used gpt-4o-mini for free in Cursor with its Agent mode, and it performed pretty well, but was noticeably harder as the project grew to keep things as specific as possible, but I never got to the point where I couldn't make more progress. 
I had a ton of fun, this app brings me a lot of joy to use, but I don't think this is good code. 
I wanna think this was like me pair programming with a junior eng driving as I navigated, but I had to intercept a whole bunch. If I thought about it that way it was fun and coachable. 
As for the experience, I found myself trying to understand the code written by this thing most of the time so I could get in there and fix the bugs. This tracks with reviewing a junior's code. 
I would like to get this app to the point that it becomes truly unmaintainable though, and see what it's like to run better models also. 
This was a great learning experience



# Readme as written by the AI (edited gently for correctness)

# Rate That Kitten

## Overview

"Rate That Kitten" is a fun web application that allows users to view adorable cat images, rate their cuteness, and save their favorite kittens with additional descriptors. Users can also filter and sort their favorite kittens based on various criteria.

## Features

- View random cat images from The Cat API.
- Rate each cat's cuteness on a scale of 0 to 10.
- Indicate whether you would pet the cat and if it has beans.
- Add descriptors to your favorite kittens.
- Filter favorites by "Would Pet?" and "Has Beans?" options.
- Sort favorites by cuteness rating (low to high or high to low).
- Request a new cat image at any time.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rate-that-kitten.git
   ```

2. Navigate to the project directory:

   ```bash
   cd rate-that-kitten
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your web browser and navigate to `http://localhost:5173` to view the application.

### Using the Application

1. **Rate a Kitten**: When the app loads, a random kitten image will be displayed. You can rate its cuteness using the slider.

2. **Would You Pet?**: Select "Yes" or "No" to indicate if you would pet the kitten.

3. **Has Beans?**: Select "Yes" or "No" to indicate if the kitten has beans.

4. **Descriptors**: Check any descriptors that apply to the kitten.

5. **Add to Favorites**: Click the heart button to add the kitten to your favorites. A confetti animation will play upon successfully adding a favorite.

6. **Request Another Cat**: Click the "Request Another Cat" button to fetch a new random kitten image.

7. **View Favorites**: Click the "View Favorites" button to navigate to the favorites page, where you can see all your saved kittens.

8. **Filter and Sort Favorites**: On the favorites page, you can filter your favorites by "Would Pet?" and "Has Beans?" options. You can also sort your favorites by cuteness rating (low to high or high to low).
