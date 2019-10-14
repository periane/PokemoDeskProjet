import React, { Component } from "react";
import axios from "axios";
import "../PokemonSearch.css";

class PokemonSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request: "",
      loading: false,
      message: ""
    };
    this.cancel = "";
  }

  handleOnInputChange = event => {
    const request = event.target.value;

    if (!request) {
      this.setState({ request, results: {}, message: "" });
    } else {
      this.setState({ request, loading: true, message: "" }, () => {
        this.searchResults(1, request);
      });
    }
  };

  searchResults = request => {
    const searchUrl = "https://pokeapi.co/";

    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token
      })
      .then(res => {
        const resultNotFoundMsg = !res.data.hits.length
          ? "There are no result , Please try a new search."
          : "";

        this.setState({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false
        });
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Failed to give Pokemon results"
          });
        }
      });
  };

  renderResults = () => {
    const { results } = this.state;

    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map(result => {
            return (
              <a key={result.name} href={result.url} className="result-items">
                <div className="image-wrapper">
                  <img className="image" src={result.url} alt={result.name} />
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const { result } = this.state;

    return (
      <div className="container">
        <h2 className="heading">Pokemon Research</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            value={result}
            name="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" />
        </label>
      </div>
    )
  }
}

export default PokemonSearch;
