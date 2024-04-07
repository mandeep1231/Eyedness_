let audioRecorder;
let audioChunks = [];
let audioContext;
let analyser;
let canvasContext;
let animationId;

function startRecording() {
  audioChunks = [];
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioRecorder = new MediaRecorder(stream);
      audioRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };
      audioRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById('audioPlayer').src = audioUrl;
        document.getElementById('audioPlayer').style.display = 'block';

        // Clear the canvas
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      };

      // Create audio context and analyzer
      audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      // Start visualization
      canvasContext = document.getElementById('audioVisualizer').getContext('2d');
      canvasContext.fillStyle = '#f0f0f0';
      canvasContext.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      drawWaveform();

      audioRecorder.start();
    })
    .catch(error => {
      console.error('Error accessing microphone:', error);
    });
}

function stopRecording() {
  if (audioRecorder && audioRecorder.state !== 'inactive') {
    audioRecorder.stop();
    cancelAnimationFrame(animationId);
    analyser.disconnect();
    audioContext.close();
  }
}

function drawWaveform() {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = '#007bff';
  canvasContext.beginPath();
  const sliceWidth = canvasContext.canvas.width / bufferLength;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * canvasContext.canvas.height / 2;
    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }
    x += sliceWidth;
  }
  canvasContext.lineTo(canvasContext.canvas.width, canvasContext.canvas.height / 2);
  canvasContext.stroke();

  animationId = requestAnimationFrame(drawWaveform);
}

document.getElementById('recordBtn').addEventListener('click', function() {
  startRecording();
  this.disabled = true;
  document.getElementById('stopBtn').disabled = false;
});

document.getElementById('stopBtn').addEventListener('click', function() {
  stopRecording();
  this.disabled = true;
  document.getElementById('recordBtn').disabled = false;
});