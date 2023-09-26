const gameContainer = document.getElementById("game");
const counter = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // a.b. Pick a random index number between 0 and current counter value.
    //a.b. Since choosing an index, need not be same as array.length.
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter -= 1;

    // Swap the value of counter with the value of index
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

 
//a.b. Call the function.
//a.b. ShuflledColors is the new array with new items at new indices.
let shuffledColors = shuffle(COLORS);



//a.b. Create a function that loops over the array shuffledColors
//a.b. When this function is called, will pass in shuffledColors
function createDivsForColors(colorArray) {
  
  for (let color of colorArray) {
    // a.b. Create a new div.
    //a.b. For each item in array, assign it the temporary variable 'color', create a new div element and give it the value of the temporary variable as its class name
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    // add an event listener for each new div
    //a.b. Will specify the the function of event listener below.  
    //a.b. When user clicks on div element, the function handleCardClick will be executed.
    newDiv.addEventListener("click", handleCardClick);

    
    //a.b. Appends the new div with its event listener and new class to the original div in the html
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;
let notClicked = false;
let cardsFlipped = 0;



//a.b. This is function passed in as the second argument in the addEventListener function.  This is the function executed on each click. 
//a.b. pass in the event object
function handleCardClick(event) {
  //a.b. If true, exit the funciton. It means the user has already clicked on something. See beginning of the code where noClicking is assigned false.
 
  if (notClicked) {
    return
  }
   //a.b. If the element clicked on contains 'flipped' as a class, exit the funciton. This keeps the user from firing another event on the same card.
  if (event.target.classList.contains("flipped")) {
    return;
  }

  //a.b. The div element on which the event is fired is assgined the variable 'clickedCard' - either the first or second card.
  
  let clickedCard = event.target;
  //a.b. Set background color of event target/card. The color is determined by its class.
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  //a.b Could this have been used instead?
  //clickedCard.style.backgroundColor = clickedCard.className
  // you can use event.target to see which element was clicked

  //a.b. Check if either card is falsy. If so, execute block.
  //a.b. if either card1 or card2 are null, i.e. if nothing has been assigned to one card or the other or both, execute the block of code - add the class 'flipped' to the event target/card.  We will use this class later to reset the cards.
  
  if (!card1 || !card2) {
    //if either card1 or card2 are null, i.e. if nothing has been assigned to one card or the other or both, execute the block of code - add the class 'flipped' to the event target/card.  We will use this class later to reset the cards.
    clickedCard.classList.add('flipped');
    //a.b. if card1 is still null (if card1 is falsy), assign clickedCard.  Otherwise, leave it as is.
    card1 = card1 || clickedCard;
    //a.b. f card1 and clickedCard have the same value and type, assign null to card2.  If they don't, assign clickedCard to card2.
    card2 = clickedCard === card1 ? null : clickedCard;
    //a.b. The below doesn't work.  Still not quite understanding why.
    /*if(card1 === null) {
      //card1 = clickedCard;
    } else if (card2 === null){
      card2 = clickedCard;
    }
  }*/
  }
  //a.b. if card1 is true (no longer null) and card2 is true (no longer null)..
  //a.b. the card is true if it has been assigned a value.
  if (card1 && card2) {
    //a.b. Assign notClicked the value of true.   Will not allow the user to click on other cards at the moment sincer user, according to the above, has clicked on two of them.
    notClicked = true;
   
    let c1class = card1.className;
    let c2class = card2.className;
    
    //a.b. check to see if the classes of each contain the same color name
    if(c1class === c2class) {
    //a.b. Wrote this part as two separate functions.
    match();
    } else {
    notMatch();
    }
  }
  //a.b. When cardsFlipped equals the array length, the user has matched all the cards.  See the conditional below.
  if (cardsFlipped === shuffledColors) {
    alert('game over')
  }
}
//a.b. if the cards turned over have same class name...
function match() {
  //a.b. Add 2 to cardsFlipped.  Cardsflipped was set to 0 up above.
  cardsFlipped += 2;
  //a.b. notClicked was first assigned false and then became true.  reset it to false.
  notClicked = false;
  //a.b. Reset card1 and card2 to their initial values - null
  card1 = null;
  card2 = null;
  //a.b. If both cards match, remove the event listener on cards1 and 2.  
  //a.b. This keeps the user from firing an event on those two cards/div elements again.
  card1.removeEventListener('click', handleCardClick);
  card2.removeEventListener('click', handleCardClick);
  
}
//a.b. if the two cards do not match...
function notMatch() {
  setTimeout(function(){
    notClicked = false;
    //a.b. their background colors should disappear after 1 second.
    card1.style.backgroundColor = '';
    card2.style.backgroundColor = '';
    //a.b. Remove class name 'flipped' from each;
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    //a.b. Reset card1 and card2 to their initial value - null
    card1 = null;
    card2 = null;

  }, 1000)
}

//a.b. call function and pass in the shuffled array of color names
createDivsForColors(shuffledColors);