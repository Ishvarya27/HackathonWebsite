// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', async function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  const response = generateResponse(input);
  

});

// Generate chatbot response function
function generateResponse(input) {

      const response = fetch('/get_response', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ input: input })
      });
      response.then((data) => {
        if (data.ok) {
            // If the response status is OK (e.g., 200), parse the response JSON or text
            // You can use either data.json() or data.text() based on the expected response type
            data.json().then((responseData) => {
                // Use responseData as your response data
               
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

                message = document.createElement('div');
                message.classList.add('chatbot-message','chatbot');
                message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${responseData}</p>`;
                conversation.appendChild(message);
                message.scrollIntoView({behavior: "smooth"});
                return responseData;
            }).catch((error) => {
                console.error('Error parsing JSON response:', error);
            });
        } else {
            // Handle non-OK responses (e.g., 404, 500, etc.) here
            console.error('Response was not OK:', data.status, data.statusText);
        }
    }).catch((error) => {
        // Handle fetch error here
        console.error('Fetch error:', error);
    });
 
  }