//declare consts for main DOM elements
const nextBtn = document.getElementById("gen");
const likeBtn = document.getElementById("fav-gen");
const mainDisp = document.getElementById("quote");
const faveDisp = document.getElementById("fav-list").querySelector("ol");

//array to store saved jokes
const savedJokes = [];

const isRedundant = (textToCheck) => {
  let matches = false;
  savedJokes.forEach((savedJoke) => {
    if (savedJoke === textToCheck) {
      matches = true;
    }
  });
  return matches;
};

//checks if the pulled joke is already in favorites, displays if not, and uses recursion to pull a new joke if so
const dispNewJoke = () => {
  fetch("https://icanhazdadjoke.com/slack", {
    Method: "GET",
    Header: {
      Accept: "application/json",
      "User-Agent":
        "Mark & Sam's project https://github.com/marksreese/quote-saver-project",
    },
  })
    .then((resp) => resp.json())
    .then((joke) => {
      const jokeText = joke.attachments[0].fallback;
      if (!isRedundant(jokeText)) {
        mainDisp.textContent = jokeText;
      } else {
        dispNewJoke();
      }
      // console.log(joke)
    });
};

//event listener for next joke button
nextBtn.addEventListener("click", () => {
  dispNewJoke();
});

//display initial joke on load
document.addEventListener("DOMContentLoaded", () => {
  dispNewJoke();
});

//event listener to add current joke to saved jokes array and display in favorites container
likeBtn.addEventListener("click", () => {
  if (isRedundant(mainDisp.textContent)) {
    mainDisp.textContent = "This joke has already been saved!";
  } else if (mainDisp.textContent === "This joke has already been saved!") {
    //can add functionality here, e.g. highlight saved joke in favorites list
  } else {
    //save the index of the joke in the array so it can be spliced later
    const index = savedJokes.length;
    savedJokes.push(mainDisp.textContent);

    //create and append delete button and joke text
    const delBtn = document.createElement("button");
    const content = document.createElement("li");
    content.textContent = mainDisp.textContent;
    delBtn.textContent = "X";
    content.append(delBtn);
    faveDisp.append(content);

    //mouse over function for favorite lists
    content.addEventListener("mouseover", mouseOver);
    content.addEventListener("mouseout", mouseOut);

    function mouseOver() {
      content.style.color = "white";
    }

    function mouseOut() {
      content.style.color = "black";
    }

    //
    delBtn.addEventListener("click", () => {
      content.remove();
      if (mainDisp.textContent === "This joke has already been saved!") {
        mainDisp.textContent = savedJokes[index];
      }
      savedJokes[index] = "";
    });
  }
});
