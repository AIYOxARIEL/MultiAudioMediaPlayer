document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById('myVideo');
    var audioSelector = document.getElementById('audioSelector');
  
    // Read the video source from the HTML
    var videoSource = video.querySelector('source').getAttribute('src');
  
    // Read the audio sources from the HTML
    var audioSources = Array.from(audioSelector.children).map(function(option) {
      return option.value;
    });
  
    // Create a MediaSource object
    var mediaSource = new MediaSource();
  
    // Event handler for when the media source is open
    mediaSource.addEventListener('sourceopen', function() {
      var videoSourceBuffer = mediaSource.addSourceBuffer('video/mp4');
      var audioSourceBuffer;
  
      // Set the MediaSource as the source for the video element
      video.src = URL.createObjectURL(mediaSource);
  
      // Fetch the video file and append it to the source buffer
      fetch(videoSource)
        .then(function(response) {
          return response.arrayBuffer();
        })
        .then(function(videoData) {
          console.log('Appending video data:', videoData.byteLength);
          videoSourceBuffer.appendBuffer(videoData);
        })
        .catch(function(error) {
          console.error('Error loading video:', error);
        });
    });
  
    // Event handler for audio track selection change
    audioSelector.addEventListener('change', function() {
      var selectedTrackIndex = parseInt(audioSelector.value);
      var selectedTrack = audioSources[selectedTrackIndex];
  
      if (mediaSource.readyState !== 'open') {
        console.log(mediaSource.readyState);
        mediaSource.addEventListener('sourceopen', function() {
          appendAudio();
        });
      } else {
        appendAudio();
      }
  
      function appendAudio() {
        var audioSourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
  
        // Fetch the selected audio track and append it to the source buffer
        fetch(selectedTrack)
          .then(function(response) {
            return response.arrayBuffer();
          })
          .then(function(audioData) {
            console.log('Appending audio data:', audioData.byteLength);
            audioSourceBuffer.appendBuffer(audioData);
          })
          .catch(function(error) {
            console.error('Error loading audio track:', error);
          });
      }
    });
  });
  