import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    //movies obje olarak değil prop olarak yazılmalı
    //filmler ve searchQuery is properties
    filmler: [],
    searchQuery: "",
  };

  //todo======================[ FETCH ILE ]
  // async componentDidMount() {
  //   const baseURL = "http://localhost:3002/filmler";
  //const response = fetch(baseURL);
  //fetch asycn olarak bize network sorguları yapar ve promise döner
  //fonksiyonu async hale getirmeliyiz
  //   const response = await fetch(baseURL);
  //   console.log(response);
  //   const data = await response.json();
  //   console.log(data);
  //   this.setState({ filmler: data });
  // }
  //todo=======================[ AXIOS ILE ] http istekleri yapmak için promise tabanlı kütüphane
  async componentDidMount() {
    const response = await axios.get("http://localhost:3001/filmler");
    console.log(response);
    this.setState({ filmler: response.data });
  }
  /*
  todo===========================[ DELETE ]
  deleteMovie = (movie) => {
    const newMovieList = this.state.filmler.filter((m) => m.id !== movie.id);
     *1.Yöntem genelde state durumu önceden boş ise kullanılır. fakat bizim öncesinde state dolu
    this.setState({
      filmler: newMovieList,
    });

    *Parametre olarak var olan state durumunu al güncelle
    this.setState((state) => ({
      filmler: newMovieList,
    }));
  };*/

  //todo==========================[ FETCH API - DELETE ]
  /*
  deleteMovie = async (movie) => {
    const baseURL = `http://localhost:3002/filmler/${movie.id}`;
    await fetch(baseURL, {
      method: "DELETE",
    });

    const newMovieList = this.state.filmler.filter((m) => m.id !== movie.id);

    this.setState((state) => ({
      filmler: newMovieList,
    }));
  };*/
  //todo==========================[ AXIOS API - DELETE ]
  deleteMovie = async (movie) => {
    axios.delete(`http://localhost:3001/filmler/${movie.id}`);

    const newMovieList = this.state.filmler.filter((m) => m.id !== movie.id);

    this.setState((state) => ({
      filmler: newMovieList,
    }));
  };

  //*==========================[ SEARCH ]
  searchMovie = (event) => {
    //console.log(event.target.value);
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    let filteredMovies = this.state.filmler.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLowerCase()) !== -1
      );
    });
    /*
    let filteredMovies = this.state.movies.filter((movie) => {
      return movie.name.indexOf(this.state.searchQuery) !== -1;
    });*/

    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>

                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>

            <Route path="/add" component={AddMovie} />
          </Switch>
        </div>
      </Router>
    );
  }
}

/*const App = () => {
  return <h1>My Movies</h1>;
};*/

export default App;
