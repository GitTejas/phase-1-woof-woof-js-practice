const dogAPI = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const filterDogs = document.getElementById('good-dog-filter')

let dogList = []

let currentDogID = null

const headers = {
    Accept: "application/json",
    "Content-Type": "application,json",
}

fetch(dogAPI)
.then(resp => resp.json())
.then(json => {
    dogList = json
    renderDogs()
})

function renderDogs() {
    dogBar.innerHTML = " ";
    dogList.forEach(renderDog)
}

function renderDog(dog) {
    const span = document.createElement('span')
    span.textContent = dog.name
    dogBar.appendChild(span)

    span.addEventListener('click', () => {
        // currentDogID = dog.id
        populateDog(dog)
    })
}

function populateDog(dog) {
    dogInfo.innerHTML = " "
    const dogImage = document.createElement('img')
    dogImage.src = dog.image
    const pupName = document.createElement('h2')
    pupName.textContent = dog.name
    const dogButton = document.createElement('button')
    dogButton.textContent = dog.isGoodDog? "Good Dog!" : "Bad Dog!"
    dogInfo.append(dogImage, pupName, dogButton)
    dogButton.addEventListener('click', () => {
        currentDogID = dog.id
        // changeDog(dog, dogButton)
        dogButton.textContent = dog.isGoodDog? "Bad Dog!" : "Good Dog!"
        let newIsGoodDogValue = !dog.isGoodDog
        fetch(`${dogAPI}/${currentDogID}`, {
            headers,
            method: 'PATCH',
            body: JSON.stringify({
                isGoodDog: newIsGoodDogValue
            })
        })
        .then(resp => resp.json())
        .then(json => {
            dogList[currentDogID].isGoodDog = json.isGoodDog
            renderDogs()
        })
    })}

let filterToggle = true

    filterDogs.addEventListener('click', () => {
        filterToggle = !filterToggle
        filterDogs.textContent = filterToggle? "Filter good dogs: OFF" : "Filter good dogs: ON"
        const puppyFilter = dogList.filter(dog => dog.isGoodDog === true)
        console.log(puppyFilter)
    })



/*
### STEP 4: TOGGLE GOOD DOG

When a user clicks the Good Dog/Bad Dog button, two things should happen:

- The button's text should change from Good to Bad or Bad to Good
- The corresponding pup object in the database should be updated to reflect the
  new isGoodDog value

You can update a dog by making a `PATCH` request to `/pups/:id` and including
the updated `isGoodDog` status in the body of the request.

### BONUS! STEP 5: FILTER GOOD DOGS

When a user clicks on the Filter Good Dogs button, two things should happen:

- The button's text should change from "Filter good dogs: OFF" to "Filter good
  dogs: ON", or vice versa.
- If the button now says "ON" (meaning the filter is on), then the Dog Bar
  should only show pups whose isGoodDog attribute is true. If the filter is off,
  the Dog Bar should show all pups (like normal).

```*/
