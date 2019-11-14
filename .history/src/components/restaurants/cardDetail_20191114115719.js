import React, { Component, Fragment } from "react";
// import config from '../../config'
import "../../pages/index.css";
import "./card.css";
import thumb_default from "../image/images.png";
// const axios = require('axios');
let Data = [];

export default class CardDetail extends Component {
  state = {
    categoryTitle: {},
    categoryArray: []
  };

  handleCard = (e, restaurant) => {
    e.preventDefault();
    // console.log("this.props ", this.props);
    // console.log("restaurant ", restaurant);
    this.props.isDetail(e, restaurant);
    // this.props.history.push(`/detail/${restaurant.name}`);
  };

  handleClick = (e, restaurant) => {
    this.props.isFave(restaurant);
  };

  // setCategoryStates = (categoryTitle) => {
  //     //This is correct, you're setting state BUT this is not sync

  //     // let a = localStorage.getItem("data");
  //     // if (a === null) {
  //     //     let r = []
  //     //     r.push(categoryTitle)
  //     //     let obj = JSON.stringify(r)
  //     //     localStorage.setItem("data", obj)

  //     // } else {
  //     //     let Data = JSON.parse(a)
  //     //     Data.push(categoryTitle)
  //     //     let obj = JSON.stringify(Data)
  //     //     localStorage.setItem("data", obj)
  //     // }

  //     // console.log("A localStorage  ",a)
  //     this.setState({
  //         categoryTitle: categoryTitle

  //     }, () => {
  //         /*
  //            Add state to the array
  //            This callback will be called once the async state update has succeeded
  //            So accessing state in this variable will be correct.
  //         */
  //         this.pushToCategoryArray()
  //     })
  // }

  // pushToCategoryArray = () => {
  //     //You don't need state, you can simply make these regular JavaScript variables
  //     // this.state.categoryArray.push(
  //     //     this.state.categoryTitle
  //     // )
  //     // this.setState({
  //     //     categoryArray: this.state.categoryTitle
  //     // })
  // }

  render() {
    let {
      data: { restaurant },
      grid_col,
      isDetail
    } = this.props;
    let img_thumb_url =
      restaurant && restaurant.photos
        ? restaurant.photos[0].photo.thumb_url
        : thumb_default;
    let col_cards = grid_col ? grid_col : 4;

    return (
      <Fragment>
        {/* <div className={`col-${col_cards}`}> */}
        <div className="cards">
          <article className="card">
            {/* <div className="card__info-hover">

                                <i className="fas fa-star icon-star" />
                                <span className="card__time">{restaurant.user_rating.aggregate_rating}</span>

                                <div className="card__clock-info">
                                    <i className="far fa-laugh icon-laugh" />
                                    <span className="card__time">{restaurant.user_rating.votes}</span>
                                </div>

                            </div> */}
            <div className="card__img"></div>
            <p
              onClick={e => this.handleCard(e, restaurant)}
              className="card_link"
            >
              <img
                className="card__img--hover card-detail"
                src={img_thumb_url}
              />
            </p>
            <div className="card__info">
              <span className="card__category"> Restaurant</span>
              <h3 className="card__title">{restaurant.name}</h3>
              <span className="card__by">
                cuisines :{" "}
                <a href="#" className="card__author">
                  {restaurant.cuisines}
                </a>
              </span>
              <br />
              <div className="card__clock-info left-layout">
                <i className="fas fa-star icon-star" />
                <span className="card__time">
                  {restaurant.user_rating.aggregate_rating}
                </span>
              </div>
              &nbsp;
              <div className="card__clock-info">
                <i className="far fa-laugh icon-laugh" />
                <span className="card__time">
                  {restaurant.user_rating.votes}
                </span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={e => this.handleClick(e, restaurant)}
              type="submit"
            >
              Favorite 
            </button>
          </article>
        </div>
        {/* </div> */}
      </Fragment>
    );
  }
}
