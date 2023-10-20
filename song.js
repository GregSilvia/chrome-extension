document.addEventListener('DOMContentLoaded', function (){
  const startRecognitionButton = document.getElementById('startButton');
  const recognizedText = document.getElementById('recognized-text');

  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onresult = function (event) {
      const transcript  = event.results[0][0].transcript;
      recognizedText.textContent = transcript;
    }
    startRecognitionButton.addEventListener('click', function (){
      recognizedText.textContent = ''
      recognition.start();
    });
  } else {
    recognizedText.textContent = "ERROR: Speech recognition not enabled on your browser";
  }
});









/*
//speech to text api
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  speechRecognitionList.addFromString(grammar, 1);

  recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");
const hints = document.querySelector(".hints");

let colorHTML = "";
colors.forEach((color, i) => {
  console.log(color, i);
  colorHTML += `<span style="background-color:${color};"> ${color} </span>`;
});
hints.innerHTML = `Tap or click then say a color to change the background color of the app. Try ${colorHTML}.`;

document.body.onclick = () => {
  recognition.start();
  console.log("Ready to receive a color command.");
};

recognition.onresult = (event) => {
    const color = event.results[0][0].transcript;
    diagnostic.textContent = `Result received: ${color}.`;
    bg.style.backgroundColor = color;
    console.log(`Confidence: ${event.results[0][0].confidence}`);
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onnomatch = (event) => {
    diagnostic.textContent = "I didn't recognize that color.";
  };

  recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
  };

  
//then text to search
*/