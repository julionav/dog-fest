async function getData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.message;
}

async function getDogs(breed) {
  return getData(`https://dog.ceo/api/breed/${breed}/images/random/10`);
}

async function getBreeds() {
  const data = await getData("https://dog.ceo/api/breeds/list/all");
  return Object.keys(data);
}

function createDogImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "dog";
  return img;
}

function removeChildren(element) {
  element.innerHTML = "";
}

function addBreedOptions(breeds) {
  const select = document.querySelector(".form-select");
  for (let breed of breeds) {
    const breedOption = document.createElement("option");
    breedOption.value = breed;
    breedOption.textContent = breed;
    select.appendChild(breedOption);
  }
}

async function init() {
  const breeds = await getBreeds();
  await addBreedOptions(breeds);
}

const select = document.querySelector("#breed");
select.addEventListener("change", async () => {
  const selectedBreed = select.value;
  const dogsImages = await getDogs(selectedBreed);
  const dogsElements = dogsImages.map(createDogImage);
  const dogsContainer = document.querySelector(".dogs");
  removeChildren(dogsContainer);
  dogsElements.forEach((dogElement) => dogsContainer.appendChild(dogElement));
});

init();