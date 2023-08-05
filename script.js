"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Hide Loading
function complet() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quotes = apiQuotes[Math.trunc(Math.random() * apiQuotes.length)];
  // const quotes = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // console.log(quotes.text);
  // console.log(quotes.author);
  // console.log(quotes);

  /** Check if Author is blank and replace it with 'Unknown' */
  if (!quotes.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quotes.author;
  }
  //check Quote length to ddetermine styling
  if (quoteText.length > 150) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loader
  quoteText.textContent = quotes.text;
  complet();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    // console.log(apiQuotes[Math.trunc(Math.random() * apiQuotes.length)]);
  } catch (error) {
    //Catch Error Here
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//EventListners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Load
getQuotes();

// newQuote();
