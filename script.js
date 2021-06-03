const lastId = () => fetch("https://api.themoviedb.org/3/movie/latest?api_key=c75c2abecfb9f336fcc2d5c8f83a12fb")
.then(response => response.json())
.then(response => response.id);
const randomId = () => Math.floor(Math.random() * 100000);
const getRandomMovie = () => `https://api.themoviedb.org/3/movie/${randomId()}?api_key=c75c2abecfb9f336fcc2d5c8f83a12fb`;
const lang = "en";

function fetchRetry(url) {
    // Return a fetch request
    return fetch(url).then(res => {
      // check if successful. If so, return the response transformed to json
      if (res.ok) return res.json()
      // else, return a call to fetchRetry
      return fetchRetry(getRandomMovie())
    })
    .then(res => {
        if(res.original_language == lang && res.poster_path != null) return res;
        return fetchRetry(getRandomMovie());
    })
};


// fetchRetry(getRandomMovie()).then(res => console.log(`http://image.tmdb.org/t/p/w185${res.poster_path}`))
// fetchRetry(getRandomMovie()).then(res => console.log(res))

document.getElementsByTagName("button")[0].addEventListener("click", () => fetchRetry(getRandomMovie()).then(res => {
    document.getElementsByTagName("img")[0].src = `http://image.tmdb.org/t/p/w185${res.poster_path}`
    document.getElementsByTagName("div")[0].innerHTML = res.original_title
    document.getElementsByTagName("div")[1].innerHTML = res.vote_average
}));