"use strict";

*********************************************************************/

let animals = ["aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

let buttons = [];
const NUM_OPTIONS = 5;
let $correctButton;

$(document).ready(setup);


function setup() {

  $(document).one("click", newRound);

  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'hello :name': helloFunction,
      'howdy': helloFunction
    };
    var commands2 = {
      'hi': helloFunction
    };
    var commands3 = {
      'I give up': iGiveUp
    };
    var commands4 = {
      'Say it again': sayItAgain
    };
    var commands5 = {
      'I think it is *animalVocalized': handleSpokenAnswer
    };


    annyang.addCommands(commands);
    annyang.addCommands(commands2);
    annyang.addCommands(commands3);
    annyang.addCommands(commands4);
    annyang.addCommands(commands5);


    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }


}

function addButton(label) {

  let $button = $('<div></div>');
  $button.addClass("guess");
  $button.text(label); // Are we dealing with multiple arrays here?
  $button.button();
  $button.appendTo("body");
  $button.on("click", handleGuess);
  return $button;

}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}


function newRound() {
  buttons = [];

  for (let i = 0; i < NUM_OPTIONS; i++) {

// Five animals chosen from the animals array at random here.
    let animalName = getRandomElement(animals);

// Now we'll create these buttons and add the names they return one at a time.
    let $button = addButton(animalName);

// Add these buttons to their own array. We have an array in an array.
    buttons.push($button);

  }


// The correct button is one of the buttons chosen from the array at random.
  $correctButton = getRandomElement(buttons);

// We call on RV to say the name of the correct button.
// He says the backwards text.
// This has to return a string, which is the name of the correct animal.
  sayBackwards($correctButton.text());

}

// This tells us what happens if the correct button is clicked.
function handleGuess() {
  if ($(this).text() === $correctButton.text()) {
    $(".guess").remove();
    setTimeout(newRound, 100);

  }
}

// This function
function sayBackwards(text) {
  let backwardsText = text.split('').reverse().join('');

  responsiveVoice.speak(backwardsText, "UK English Male", {
    pitch: 0.9,
    rate: 1

  });

}

function helloFunction() {
  responsiveVoice.speak("Hello, how's it going?");
}

function iGiveUp() {
  responsiveVoice.speak("You give up? Why?");
  $(".guess").fadeOut(1000);
  $(".guess").remove();
  setTimeout(newRound, 100);

}

function sayItAgain() {

sayBackwards($correctButton.text());

}

function handleSpokenAnswer(animalVocalized) {
console.log("annyang is listening to your spoken answer");
// If the player says the wrong answer shake the buttons
 // If they get it, start a new round
 if (animalVocalized !== $correctButton.text()) {
   responsiveVoice.speak("Idiot!");
   $('.guess').effect('pulsate');
   // And say the correct animal again to "help" them
   sayBackwards($correctButton.text());
 }

 else if (animalVocalized === $correctButton.text()) {
  responsiveVoice.speak("Nice job!");
  $(".guess").fadeOut(1000);
  $(".guess").remove();
  setTimeout(newRound, 100);
 }
}
