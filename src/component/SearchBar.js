import React from "react";
class SearchBar extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-row mb-5">
          <div className="col-10">
            <input
              onChange={this.props.searchMovieProp}
              type="text"
              className="form-control"
              placeholder="Seach a movie"
              //value={this.state.searchQuery}
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-md btn-danger"
              style={{ float: "right" }}
            >
              Add Movie
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;

/* //! [***]
         ? State güncellenmişti. şimdi app.js parent componentinde fonksiyona bağladık
           onChange={(e) => this.setState({ searchQuery: e.target.value })}*/
