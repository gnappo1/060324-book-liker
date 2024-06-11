// document.addEventListener("DOMContentLoaded", function() {});
//! Global Variables

const targetUl = document.querySelector("#list")
const displayDetails = document.querySelector("#show-panel")

//! Helper Functions
function addLiToPage(text, placeOnPage) {
    const userLi = document.createElement("li")
    userLi.innerText = text
    placeOnPage.appendChild(userLi)
}

function showDetailsOntoPage(e, bookObj) {
    const img = document.createElement("img")
    img.alt = `${bookObj.title} - ${bookObj.subtitle}`
    img.src = bookObj.img_url
    //! title
    const h2 = document.createElement("h2")
    h2.innerText = bookObj.title
    //! subtitle
    const h3Subtitle = document.createElement("h3")
    h3Subtitle.innerText = bookObj.subtitle
    //! author
    const h3 = document.createElement("h3")
    h3.innerText = bookObj.author
    //! description
    const p = document.createElement("p")
    p.innerText = bookObj.description

    //! user names
    const userUl = document.createElement("ul")
    bookObj.users.forEach(userObj => addLiToPage(userObj.username, userUl))

    //! LIKE button
    const likeBtn = document.createElement("button")
    likeBtn.innerText = "LIKE"
    likeBtn.addEventListener("click", () => addLiToPage("Erica", userUl))
    displayDetails.innerHTML = ""
    displayDetails.append(img, h2, h3Subtitle, h3, p, userUl, likeBtn)
}

function displayBookTitle(bookObj) {
    //! create a new element
    const li = document.createElement("li")
    //! Extract title data from object
    const title = bookObj["title"]
    //! Set the el's text to be the title data
    li.innerText = title
    //! Attach the click here -> why? Because we have both the target (li) and the data (bookObj)
    li.addEventListener("click", (e) => showDetailsOntoPage(e, bookObj))
    //! time to put the newly created el onto the DOM
    targetUl.append(li)
}

function getData(url) {
    fetch(url)
    .then((resp) => {
        if (resp.ok) {
            return resp.json()
        }
    })
    .then(books => books.forEach(displayBookTitle))
    .catch(error => console.log(error))
}

//! Invoke functions 
getData("http://localhost:3000/books")