//declare consts for main DOM elements
const nextBtn = document.getElementById("gen");
const likeBtn = document.getElementById("fav-gen");
const mainDisp = document.getElementById("quote");
const faveDisp = document.getElementById("fav-list").querySelector("ol");

//array to store saved jokes
const savedJokes = [];

//boolean return for text matching all saved jokes
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
        dispNewJoke;
      }
      // console.log(joke)
    });
};

//drag event functions
const allowDrag = (e) => {
  e.preventDefault();
};
//sets type and value of dragged data
const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
  // console.log("drag id: " + e.target.id);
};
//gets dragged data that is of the same type "text" and appends the element with #data to the drop element
const drop = (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const node = document.getElementById(data);
  // console.log("this is drop data: " + data);
  // console.log("this is the node: " + node);
  faveDisp.insertBefore(node, e.target);
};

const saveJoke = () => {
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
    //enable drag and drop functionality to change ranking of saved items
    content.setAttribute("draggable", true);
    content.setAttribute("ondragstart", "drag(event)");
    content.id = "dragging" + index;
    // console.log("content id: " + content.id);
    // content.ondrop = "drop(event)";
    // content.ondragover = "allowDrag(event)";
    faveDisp.append(content);

    //mouse over & mouse off event listeners to highlight a favorite joke
    content.addEventListener("mouseover", () => {
      content.style.color = "white";
    });
    content.addEventListener("mouseout", () => {
      content.style.color = "black";
    });

    //delete an individual saved item
    delBtn.addEventListener("click", () => {
      content.remove();
      if (mainDisp.textContent === "This joke has already been saved!") {
        mainDisp.textContent = savedJokes[index];
      }
      savedJokes[index] = "";
    });
  }
}

//display a joke on page load
document.addEventListener("DOMContentLoaded", dispNewJoke);

//event listener to add current joke to saved jokes array and display in favorites container
likeBtn.addEventListener("click", saveJoke);

//event listeners for next joke button click and right arrow keypress upstroke
nextBtn.addEventListener("click", dispNewJoke);

document.body.onkeyup = (e) => {
  e.preventDefault();
  switch (true){
    case (e.code == "ArrowRight"):
      dispNewJoke();
      break;
    case (e.code == "ArrowDown"):
      document.getElementById('id01').style.display='block'
      break;
    case (e.code == "ArrowLeft"):
      saveJoke();
      break;
    case (e.code == "ArrowUp"):
      document.getElementById('id01').style.display='none'
      break;
    case (e.code == "Space"):
      saveJoke();
      break;
  }
};
