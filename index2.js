// Create a video element
let video = document.createElement('video');

// Create a MediaSource object
let mediaSource = new MediaSource();

// Set the video source
video.src = URL.createObjectURL(mediaSource);

// Create a source buffer
let sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

// Create an audio element
let audio = document.createElement('audio');

// Set the audio source
audio.src = URL.createObjectURL(mediaSource);

// Create a source buffer
let audioSourceBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');

// Create an HTML file to store the video and audio sources
let htmlFile = document.createElement('html');

// Add the video and audio sources to the HTML file
htmlFile.innerHTML = `<video src="video.mp4"></video>
<audio src="audio.mp4"></audio>`;

// Create a select element to choose the audio
let select = document.createElement('select');

// Add the audio sources to the select element
htmlFile.querySelectorAll('audio').forEach(audio => {
    let option = document.createElement('option');
    option.value = audio.src;
    option.innerText = audio.src;
    select.appendChild(option);
});

// Add an event listener to the select element
select.addEventListener('change', e => {
    // Set the audio source
    audio.src = e.target.value;
});