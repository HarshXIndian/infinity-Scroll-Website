const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loading");
const cursor = document.querySelector(".cursor");
const errorContainer = document.querySelector(".error");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Fetch Images from Unsplash API
const KEY = `jp3cyOjOe-W0x1qj6_FtAhyAg8A4AfsqQQins7tdg3E`;
const COUNT = 30;
const API = `https://api.unsplash.com/photos/random/?client_id=${KEY}&count=${COUNT}`;

// Functions :

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready = ", ready);
  }
}

// Helper Function to set attributes on DOM elements
function setAttributes(elememt, attributes) {
  for (const key in attributes) {
    elememt.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos , Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images : ", totalImages);
  // Run function for each Object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to unplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create a <img> for photos
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    image.classList.add("loaded-img");
    // Event Listener , check when each image is finished loading
    image.addEventListener("load", imageLoaded);
    // Place <h3> inside the <a>
    item.appendChild(image);
    // Place the <a> inside the imageContainer
    imageContainer.appendChild(item);
  });
}

// API Fetch :

// Get Photos from unsplash API
async function getPhotos() {
  try {
    const res = await fetch(API);
    photosArray = await res.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.error(error);
    errorContainer.hidden = false;
  }
}

// On Page Load
getPhotos();

// Event Listener :

// Check to see if scrolling near bottom of page , Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// Cursor Implementation
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  if (e.target.closest(".text")) cursor.classList.add("cursor__OnText");
  else cursor.classList.remove("cursor__OnText");
});
