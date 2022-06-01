//declare consts for main DOM elements
const nextBtn = document.getElementById("gen")
const likeBtn = document.getElementById("fav-gen");
const mainDisp = document.getElementById("quote");
const faveDisp = document.getElementById("fav-list").querySelector("ol");

//array to store saved jokes
const savedJokes = [];

//todo: checks to see if it is in favorites and displays the joke if it is not redundant
const dispNewJoke = () => {
    fetch("https://icanhazdadjoke.com/slack", {
        Method: "GET",
        Header: {
            "Accept": "application/json",
            "User-Agent": "Mark & Sam's project https://github.com/marksreese/quote-saver-project"
        },
    }
    ).then(resp => resp.json()).then(joke => {
        const jokeText = joke.attachments[0].fallback;
        let matches = false;
        savedJokes.forEach(savedJoke => {
            if (savedJoke === jokeText){
                matches = true;
            }
        })
        if (!matches){
             mainDisp.textContent = jokeText;
        }
        else {
            dispNewJoke();
        }
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

//event listener to add current joke to saved jokes array and display in favorites container
likeBtn.addEventListener("click", () => {
    savedJokes.push(mainDisp.textContent);
    const newSaved = document.createElement("li");
    newSaved.textContent = mainDisp.textContent;
    faveDisp.append(newSaved);
    //append joke with delete button 
    //event listener for delete button (inline)

})