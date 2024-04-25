import axios from 'axios';

// The URL to the image of the person you want to animate
const sourceImageUrl = "https://myhost.com/image.jpg";

// D-ID API endpoint for creating a talk
const createTalkEndpoint = "https://api.d-id.com/talks";

// POST request to D-ID API
axios.post(createTalkEndpoint, {
  source_url: "https://service-science.info/wp-content/uploads/2012/08/20180222-Jim_Spohrer-Photo-683x1024.jpg",
  script: {
    type: "text",
    input: generatedSpeech
  }
}, {
  headers: {
    'Authorization': `Bearer ${process.env.D_ID_API_KEY}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  // Handle success
  console.log("Digital person created:", response.data);
  // If D-ID provides a URL or some form of identifier, you can use that to display the talk
})
.catch(error => {
  // Handle error
  console.error("Error creating digital person:", error);
});
