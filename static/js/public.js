document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const fileInput = document.getElementById('fileInput');
    const crimeDetails = document.getElementById('crimeDetails').value;
  
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('crimeDetails', crimeDetails);
  
    // Simulate sending data to server (replace with actual server-side code)
    // Here, we're just logging the data to the console
    console.log('Uploading file:', fileInput.files[0]);
    console.log('Crime details:', crimeDetails);
  
    // Show a success message
    alert('Your recording has been shared anonymously.');
  
    // Clear form fields after submission
    fileInput.value = '';
    document.getElementById('crimeDetails').value = '';
  });