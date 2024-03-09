const imageContainer = document.querySelector("#image-conatiner");
const loader = document.querySelector("#loader");
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const count = 10;
const apiKey = "czHumbryuUYTccrdwZa53seguPxEc_vUZEZI76YyIaA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all image is loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Function to set images
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes.key);
  }
}

// Function to display images
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Load Event Listener to check if image is loaded
    image.addEventListener("load", imageLoaded);
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

// Funtion to get images
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Adding Scroll Event
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log("load");
  }
});

getPhotos();
