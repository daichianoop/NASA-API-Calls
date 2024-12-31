const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key  
const apiUrl = 'https://epic.gsfc.nasa.gov/api/natural';  

document.getElementById('fetchImageButton').addEventListener('click', fetchLatestImage);  

function fetchLatestImage() {  
    fetch(apiUrl)  
        .then(response => {  
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }  
            return response.json();  
        })  
        .then(data => {  
            displayImageData(data);  
        })  
        .catch(error => {  
            console.error('There was a problem with the fetch operation:', error);  
            document.getElementById('imageData').innerHTML = '<p>Error fetching data.</p>';  
        });  
}  

function displayImageData(data) {  
    const imageDataDiv = document.getElementById('imageData');  
    imageDataDiv.innerHTML = ''; // Clear previous data  

    if (data.length === 0) {  
        imageDataDiv.innerHTML = '<p>No image data available.</p>';  
        return;  
    }  

    const latestImage = data[0]; // Get the most recent image data  
    const imageName = latestImage.image; // e.g., "epic_1b_20231211000000"  
    const date = latestImage.date; // e.g., "2023-12-11"  
    const caption = latestImage.caption;  

    const imageInfo = `  
        <h3>${caption}</h3>  
        <p><strong>Date:</strong> ${date}</p>  
        <p><strong>Image Name:</strong> ${imageName}</p>  
    `;  
    imageDataDiv.innerHTML = imageInfo;  

    // Construct the image URL  
    const [year, month, day] = date.split('-'); // Split the date into components  
    const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${imageName}.png`;  
    
    // Display the image  
    const imageContainer = document.getElementById('imageContainer');  
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="${caption}" class="epic-image">`;  
}