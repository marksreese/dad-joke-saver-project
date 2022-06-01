//declare consts for main DOM elements
const nextBtn = document.getElementById("gen")
const likeBtn = document.getElementById("fav-gen");
const mainDisp = document.getElementById("quote");
const faveDisp = document.getElementsByClassName("fav-list");

//array to store saved jokes
const saved = [];

//todo: checks to see if it is in favorites, and displays the joke if it is not redundant - how to do without while?
const dispNewJoke = () => {
    fetch("https://icanhazdadjoke.com/slack", {
        Method: "GET",
        Header: {
            "Accept": "application/json",
            "User-Agent": "Mark & Sam's project https://github.com/marksreese/quote-saver-project"
        },
    }
    ).then(resp => resp.json()).then(joke => {
        mainDisp.textContent = joke.attachments[0].fallback;
        // console.log(joke)
    })
}

//event listener for next joke button
nextBtn.addEventListener("click", () => {
    dispNewJoke();
})

//display initial joke on load
document.addEventListener("DOMContentLoaded", () => {
    dispNewJoke();
})

//event listener for like button
likeBtn.addEventListener("click", () => {
    saved.push(mainDisp.textContent);

    //append joke with delete button 
    //event listener for delete button (inline)

})