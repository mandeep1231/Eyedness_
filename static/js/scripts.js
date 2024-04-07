const videoElement = document.getElementById('videoElement');
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const uploadButton = document.getElementById('uploadButton');
const canvas = document.getElementById('canvas');
const constraints = { video: true };

let mediaRecorder;
let chunks = [];

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
    videoElement.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function(event) {
        chunks.push(event.data);
    }

    mediaRecorder.onstop = function() {
        const blob = new Blob(chunks, { 'type' : 'video/mp4' });
        chunks = [];
        const videoURL = URL.createObjectURL(blob);
        uploadButton.disabled = false;
        uploadButton.onclick = function() {
            uploadVideo(blob);
        };
    }
});

recordButton.onclick = function() {
    mediaRecorder.start();
    stopButton.disabled = false;
    recordButton.disabled = true;
}

stopButton.onclick = function() {
    mediaRecorder.stop();
    stopButton.disabled = true;
    recordButton.disabled = false;
}

function uploadVideo(videoBlob) {
    // Add code here to upload the video
    alert('Video uploaded successfully!');
}

