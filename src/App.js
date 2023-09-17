import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Load from "./Load";
import MoviePage from "./MoviePage";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmQ3ZjhiYzExMTZhMTE2NTA3YWExMjc5NjExM2JlMSIsInN1YiI6IjY0ZmVkMDUyNmEyMjI3MDBmZDFmNmFjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Msv8O-DIkK0ShMSanzX7xy3AD_51QBn1HJ1jI3OLnI0",
  },
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isloading, setIsLoading] = useState(false); //state of Loading

  const popularMovies = async () => {
    setIsLoading(true); //starts the Loading

    try {
      const topresponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        options
      );
      const topdata = await topresponse.json();

      setMovies(topdata.results);
    } finally {
      setIsLoading(false); //stops the Loading
    }
  };

  const searchMovies = async (title) => {
    setIsLoading(true); //starts the Loading

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await response.json();

      setMovies(data.results);
    } finally {
      setIsLoading(false); //stops the Loading
    }
  };
  useEffect(() => {
    popularMovies();
  }, []);

  // Gets the  first 10 movies
  const moviesTopTen = movies.slice(0, 10);

  //Gets first entry of movie in the array
  const displayMovie = movies[0];

  // assigning of genre IDs to names
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const [isHomepageVisible, setIsHomepageVisible] = useState(true);
  const [isMoviePageVisible, setIsMoviePageVisible] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const toggleHomepageVisibility = () => {
    setIsHomepageVisible(!isHomepageVisible);
  };

  const toggleMoviePageVisibility = () => {
    setIsMoviePageVisible(!isMoviePageVisible);
  };

  const handleMovieCardClick = (id) => {
    // accessing the movie id
    setSelectedMovieId(id);
  };

  return (
    <div className="App container">
      <div className={`homepage  ${isHomepageVisible ? "" : "toggle"} `}>
        <section className="header">
          <div className="img-container">
            <img
              className="poster-icon"
              alt={displayMovie?.title}
              src={
                displayMovie?.poster_path == null
                  ? "https://i1.sndcdn.com/avatars-RRIxLADLQ2fDPyrM-T1LosQ-t240x240.jpg"
                  : `https://image.tmdb.org/t/p/w500/${displayMovie?.poster_path}`
              }
            />
          </div>
          <div className="navbar">
            <div className="logo ">
              <img className="logo-icon" alt="" src="/undefined2.png" />
              <b className="sign-in ">MovieBox</b>
            </div>
            <div className="search">
              <input
                placeholder="What do you want to watch?"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onInput={() => searchMovies(searchTerm)}
              />
              <svg
                className="search-icon"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
                  onClick={() => searchMovies(searchTerm)}
                ></path>
              </svg>
            </div>
            <div className="menu">
              <b className="sign-in">Sign in</b>
              <img className="menu-icon" alt="" src="/undefined1.png" />
            </div>
          </div>

          <div className="description-box">
            <b className="description-box-title">{displayMovie?.title}</b>
            <div className="description-rating">
              <div className="imdb">
                <img className="imdb-icon" alt="" src="/undefined3.png" />
                <div className="imdb-rating">86.0 / 100</div>
              </div>
              <div className="rotten-tomatoes">
                <img
                  className="rotten-tomatoes-icon"
                  alt=""
                  src="/undefined4.png"
                />
                <div className="div">97%</div>
              </div>
            </div>
            <div className="description-box-content">
              {displayMovie?.overview}
            </div>
            <button className="button" autoFocus={true} preload="auto">
              <img className="play-icon" alt="" src="/undefined5.png" />
              <b className="btn-text">Watch trailer</b>
            </button>
          </div>
          <div className="pagination-box">
            <div className="pagination">
              <b className="b">1</b>
              <b className="b">2</b>
              <b className="b2">3</b>
              <b className="b">4</b>
              <b className="b">5</b>
            </div>
            <div className="pagination-box-child" />
          </div>
        </section>
        <section className="featured-movie">
          <div className="featured-header">
            <p className="featured-title">Featured Movie</p>
            <div className="see-more">
              <div className="see-more-text">See more</div>
              <img className="see-more-icon" alt="" src="/undefined6.png" />
            </div>
          </div>

          {isloading ? (
            <Load /> // Render a loader component when isLoading is true
          ) : moviesTopTen?.length > 0 ? (
            <div className="movie-list">
              {moviesTopTen.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genreMap={genreMap}
                  toggleHomepage={toggleHomepageVisibility}
                  toggleMoviePage={toggleMoviePageVisibility}
                  onMovieCardClick={handleMovieCardClick}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </section>

        <footer className="footer">
          <div className="social">
            <img className="social-icon" alt="" src="/undefined24.png" />
            <img className="social-icon" alt="" src="/undefined25.png" />
            <img className="social-icon" alt="" src="/undefined26.png" />
            <img className="social-icon" alt="" src="/undefined27.png" />
          </div>
          <div className="links">
            <b className="link">Conditions of Use</b>
            <b className="link">{`Privacy & Policy`}</b>
            <b className="link">Press Room</b>
          </div>
          <p className="copyright">© 2023 MovieBox by David Nnadozie</p>
        </footer>
      </div>

      <MoviePage
        moviess={movies}
        visible={isMoviePageVisible}
        toggleHomepage={toggleHomepageVisibility}
        toggleMoviePage={toggleMoviePageVisibility}
        selectedMovieId={selectedMovieId}
        setSelectedMovieId={setSelectedMovieId}
      />
    </div>
  );
};

export default App;
