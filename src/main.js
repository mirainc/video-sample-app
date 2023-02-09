import { runtime, devTools } from "@raydiant/sdk";

// Open the console and run devTools.play() to start play the video.
// Enable looping to simulate a single presentation in the playlist
// by running devTools.play(true).
window.devTools = devTools;

// Create the video element and add it to the DOM after setting
// up event listeners. This ensures the canplay listener is always
// fired, triggering runtime.ready().
const video = document.createElement("video");
video.setAttribute('class', 'video')

video.addEventListener("ended", () => {
  runtime.complete();
});

video.addEventListener("error", () => {
  runtime.complete(new Error("Playback error"));
});

runtime.subscribe("play", () => {
  video.play();
});

video.src = "/video.mp4";

// Attach video element to DOM.
const videoContainer = document.querySelector(".video-container");
if (!videoContainer) throw new Error("Missing video container element.");

videoContainer.appendChild(video);
