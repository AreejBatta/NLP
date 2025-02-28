import { isValidUrl } from "./nameChecker.js";
export function handleSubmit(event) {
    event.preventDefault();

  
    const url = document.getElementById('name').value;
  
    // Validate the URL before proceeding
    if (!isValidUrl(url)) {
      displayError('Please enter a valid URL.');
      return;
    }
  
    // Prepare the data to send
    const data = { url };
  
    // Perform the POST request
    fetch('http://localhost:8081/api', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          // Handle HTTP errors
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Server Error');
          });
        }
        return response.json();
      })
      .then(apiData => {
        // Update the UI with the received data
        updateUI(apiData);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        displayError(`An error occurred: ${error.message}`);
      });
  }
  
  
  // Function to update the UI with the data received
  function updateUI(data) {
    document.getElementById('text').innerHTML = `<strong>Text:</strong> ${data.text}`;
    document.getElementById('agreement').innerHTML = `<strong>Agreement:</strong> ${data.agreement}`;
    document.getElementById('subjectivity').innerHTML = `<strong>Subjectivity:</strong> ${data.subjectivity}`;
    document.getElementById('confidence').innerHTML = `<strong>Confidence:</strong> ${data.confidence}`;
    document.getElementById('score_tag').innerHTML = `<strong>Score Tag:</strong> ${data.score_tag}`;
  }
  
  // Function to display errors to the user
  function displayError(message) {
    const errorElement = document.getElementById('error');
    const alarmSection = document.getElementById('alarm');

    if (message) {
      // Display the error message and show the section
      errorElement.textContent = message;
      alarmSection.classList.add('showMe');
    }
  }
  
  