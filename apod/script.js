async function fetchData() {  
  const apiKey = "2qobaitzA3U8hGcdDELREL8btPtF8UzIUZBwQaPh";  
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;  

  try {  
    const response = await fetch(url);  
    if (!response.ok) {  
      throw new Error("Network response was not ok " + response.statusText);  
    }  
    const data = await response.json();
    const apodImage = document.getElementById("apodImage");  
    apodImage.src = data.url; 
    apodImage.alt = data.title;

    console.log(data);  
  } catch (error) {  
    console.error("There was a problem with the fetch operation:", error);  
  }  
}  

const ButtonCalling = document.getElementById("button1");  
ButtonCalling.addEventListener("click", fetchData);