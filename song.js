document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  const recognizedText = document.getElementById('recognized-text');
  const apiResults = document.getElementById('api-results');
  const loadingSpinner = document.querySelector('.loading-spinner');
  const circlesContainer = document.querySelector('.circles');



  let isListening = false;
  circlesContainer.style.display = 'none'
  

  // SPEECH CHECK
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // SPEECH RESULT
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      recognizedText.textContent = transcript;

      // GET TEXT AND FETCH SONG
      const speechString = transcript;
      getTrackInfo(speechString);
    };

    // BUTTON LOGIC
    startButton.addEventListener('click', function () {
      if (isListening) {
        recognition.stop();
        isListening = false;
        startButton.classList.remove('listening');
        circlesContainer.style.display = 'block'
      } else {
        recognizedText.textContent = '';
        recognition.start();
        isListening = true;
        startButton.classList.add('listening');
        circlesContainer.style.display = 'block'
      }
    });

    // BUTTON END
    recognition.onend = function () {
      isListening = false;
      startButton.classList.remove('listening');
      circlesContainer.style.display = 'none'
    };
  } else {
    recognizedText.textContent = "ERROR: Speech recognition not enabled on your browser";
  }
  // API FETCH
  async function getTrackInfo(string) {
    const encodedString = encodeURIComponent(string);
    const url = `https://spotify-scraper.p.rapidapi.com/v1/track/download?track=${encodedString}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'abc01fe9edmsh081df58d5a2653bp1303e3jsn174d4f80cfd3',
        'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
      }
    };

    try {
      showLoadingSpinner()
      const response = await fetch(url, options);

      if (response.ok) {
        const result = await response.json();
        hideLoadingSpinner()

        console.log(result);

        // CLEAR PREVIOUS
        apiResults.innerHTML = '';

        if (result.status === true && result.spotifyTrack) {
          const track = result.spotifyTrack;
          const trackElement = createTrackElement(track);
        
          console.log(result);
        


          // ADD TRACK TO CONTAINER

          apiResults.appendChild(trackElement);
        } else {
          apiResults.textContent = 'No tracks found.';
        }
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

   // CREATE ARTIST NAME, TRACK NAME, SPOT LINK
   function createTrackElement(track) {
    const trackElement = document.createElement('div');
    trackElement.className = 'track-item';

    const artistName = createTrackInfoElement(track.artists[0].name);
    const trackName = createTrackInfoElement(track.name);

    const spotifyLink = document.createElement('a');
    spotifyLink.textContent = 'Spotify';
    spotifyLink.href = track.shareUrl;
    spotifyLink.target = '_blank';

    if (track.album && track.album.cover && track.album.cover.length > 0) {
      const albumArtwork = document.createElement('img');
      albumArtwork.src = track.album.cover[0].url;
      albumArtwork.alt = 'Album Artwork';
      albumArtwork.classList.add('album-artwork');
      trackElement.appendChild(albumArtwork);
    }

    // ADD ELEMENTS TO TRACK CONTAINER
    trackElement.appendChild(artistName);
    trackElement.appendChild(trackName);
    trackElement.appendChild(spotifyLink);

    return trackElement;
  }

  // HELPER FUNCTION
  function createTrackInfoElement(text) {
    const element = document.createElement('p');
    element.textContent = text;
    return element;
  }
// SHOW LOADING ANIMATION
  function showLoadingSpinner() {
    loadingSpinner.style.display = 'block';
  }
// HIDE LOADING ANIMATION
  function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
  }
// CLEAR API RESULTS
  function clearApiResults() {
    while (apiResults.firstChild) {
      apiResults.removeChild(apiResults.firstChild);
    }
  }
});
