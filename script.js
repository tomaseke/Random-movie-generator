let lastIdVar = 0;
const lastId = () => fetch("https://api.themoviedb.org/3/movie/latest?api_key=c75c2abecfb9f336fcc2d5c8f83a12fb")
.then(response => response.json())
.then(response => response.id)
.then(res => lastIdVar = res);
lastId();
function randomId(){return Math.floor(Math.random() * lastIdVar)};
const getRandomMovie = () => `https://api.themoviedb.org/3/movie/${randomId()}?api_key=c75c2abecfb9f336fcc2d5c8f83a12fb`;
const lang = "en";
const root = document.documentElement;

function fetchRetry(url) {
    // Return a fetch request
    return fetch(url).then(res => {
      // check if successful. If so, return the response transformed to json
      if (res.ok) return res.json()
      // else, return a call to fetchRetry
      return fetchRetry(getRandomMovie())
    })
    .then(res => {
        if(res.original_language == lang && res.poster_path != null && res.vote_average > 0) return res;
        return fetchRetry(getRandomMovie());
    })
};

function displayDetails(){
    fetchRetry(getRandomMovie()).then(res => {
        document.getElementsByTagName("img")[0].src = `http://image.tmdb.org/t/p/w200${res.poster_path}`
        document.getElementById("name").innerHTML = `Title: ${res.original_title}`
        document.getElementById("rating").innerHTML = `Rating: ${res.vote_average}`
        document.getElementsByTagName("button")[0].style.margin = "0px";
        root.style.setProperty('--display', 'inline');
        document.getElementsByTagName("img")[0].style.border = "1px solid black";  
        document.getElementById("pitch").style.display = "none";
        document.getElementById("name").style.display = "initial";
        document.getElementById("rating").style.display = "initial"; 
        document.getElementsByTagName("img")[0].style.display = "initial"; 
    })
};

// fetchRetry(getRandomMovie()).then(res => console.log(`http://image.tmdb.org/t/p/w185${res.poster_path}`))
// fetchRetry(getRandomMovie()).then(res => console.log(res))

document.getElementsByTagName("button")[0].addEventListener("click", displayDetails);