let d = new Date();
let newDate = d.toDateString();

// The URL to retrieve weather information from his API (country : US)
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// // Personal API Key for OpenWeatherMap API
// &units=metric to get the Celsius Temperature
const apiKey = ',&appid=a00b6d77f931057ba59eea14cf2ef6b5';

// the URL of the server to post data
const server = 'http://localhost:5000';


document.querySelector('.generate').addEventListener('click',()=>{
  // here we see if the user didn't enter a zip code
 if(document.querySelector('.zip').value ===""){
   alert('please ente the Zip code');
  }else{
    generateData()
  }

});

/**
 * // generateData //
 * function to get input values
 * call getWeatherData to fetch the data from API
 * create object from API object by using destructuring
 * post the data in the server
 * get the data to update UI
 */
const generateData = ()=>{
  const zip = document.querySelector('.zip').value;
  
  getWeatherData(zip).then((data)=>{
   if(data){
    const  {
      main: {temp},
      name: city,
      weather: [{description}],
    } = data ;

    const info = {
      newDate,
      city,
      temp: Math.round(temp),
      description,
    }
    postData(server + "/add",info);
    document.querySelector('.show').style.cssText =' opacity: 1; transition: opacity 1s;';
    render();
   };
  })     
};

//Function to GET Web API Data
const getWeatherData = async (zip)=>{
  
  try {
    const res = await fetch(baseUrl + zip  + apiKey);
    console.log(baseUrl + zip  + apiKey)
    const data = await res.json();
    if(data.cod != 200){
      console.log('the data not excist');
      alert('please enter a correct Zip code!!!');
      document.querySelector('.zip').value ="";
    }
    return data;
    
  } catch (error) {
    console.log(error);
  }
}

// Function to POST data
const postData = async( url = "" , info = {})=>{
  const res = await fetch(url,{
    method: "POST",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(info)
  });

  try {
    const newData = res.json();
    console.log(newData);
    return;
  } catch (error) {
    console.log(error);
  }
}

// function to show the data to the user
const render = async()=>{
  const res = await fetch(server + "/all");
  try {
    const saveData = await res.json();
    // 	change to celcius
    temp1 = Math.round(parseFloat(saveData.temp)-273.15);

    document.getElementById('date').innerHTML = saveData.newDate;
    document.getElementById('city').innerHTML = saveData.city;
    document.getElementById('temp').innerHTML = temp1 + '&#8451';
    document.getElementById('description').innerHTML = saveData.description;

  } catch (error) {
    console.log(error);
  }
}