import React, { Component, Fragment } from "react";
import "../restaurants/detail.css";
import config from "../../config";
// import RestaurantsDetail from '../restaurants/restaurantsDetail'
import CardDetail from "../restaurants/cardDetail";
import Fave from "./fave";
const axios = require("axios");

export default class Countries extends Component {
  state = {
    restaurants: [],
    faves: [],
    categories: []
  };

  getCountriesByName = countriesName => {
    let { somato_api } = config;
    const headers = {
      "Content-Type": "application/json",
      "user-key": somato_api.api_key
    };
    axios
      .get(somato_api.database + "/search?q=" + countriesName, {
        // axios.get(somato_api.database + '/cities?q=' + countriesName, {
        headers: headers
      })
      .then(response => {
        // console.log("response.data ", response.data)
        this.setState({ restaurants: response.data.restaurants });
      })
      .catch(error => {
        // console.log("getMenu Err", error);
      });
  };

  handleCardDetail = (e, restaurant) => {
    e.preventDefault();
    // console.log("this.props ", this.props);
    // console.log("###################  restaurant ", restaurant);
    this.props.isData(restaurant);
    this.props.history.push(
      `/detail/${restaurant.name}&rest=${restaurant.R.res_id}`
    );
  };

  componentDidMount = () => {
    // console.log("this.props.match.params.query   ===> ", this.props);
    this.getCountriesByName(this.props.match.params.query);
    this.getCategories();
  };

  componentDidUpdate(oldProps, oldState) {
    if (oldProps.match.params.query !== this.props.match.params.query) {
      this.getCountriesByName(this.props.match.params.query);
    }
  }

  faveConllection = faveData => {
    const faves = [...this.state.faves];
    const Index = faves.indexOf(faveData);
    if (Index === -1) {
      faves.push(faveData);
    } else {
      faves.splice(Index, 1);
    }
    this.setState({ faves });
  };

  getCategories = () => {
    let { somato_api } = config;
    const headers = {
      "Content-Type": "application/json",
      "user-key": somato_api.api_key
    };
    axios
      .get(somato_api.database + "/categories", {
        headers: headers
      })
      .then(response => {
        // console.log("response.data ", response.data);
        this.setState({ categories: response.data.categories });
      })
      .catch(error => {
        // console.log("getMenu Err", error);
      });
  };

  handleSearchByCat = (e, catName) => {
    e.preventDefault();
    this.getCountriesByName(catName);
  };

  render() {
    let { restaurants, categories } = this.state;
    // console.log("faves  ", this.state.faves);

    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-9 wrap">
              {restaurants ? (
                restaurants.map((item, i) => (
                  <CardDetail
                    key={i}
                    data={item}
                    isDetail={this.handleCardDetail}
                    isFave={this.faveConllection}
                    grid_col="6"
                  />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="col-3 top-margin">
              <div className="how2 how2-cl4 flex-s-c">
                <h3 className="f1-m-2 cl3 tab01-title">Favorite Restaurants</h3>
              </div>
              <div>
                {this.state.faves ? (
                  this.state.faves.map((item, i) => (
                    <Fave faveList={item} key={i} />
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="how2 how2-cl4 flex-s-c">
                <h3 className="f1-m-2 cl3 tab01-title">Tags</h3>
              </div>
              <div className="blog-tags top-margin">
                <ul>
                  {categories
                    ? categories.map((item, i) => (
                        <li
                          className="published-date show-cursor"
                          key={i}
                          onClick={e =>
                            this.handleSearchByCat(e, item.categories.name)
                          }
                        >
                          {item.categories.name}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
