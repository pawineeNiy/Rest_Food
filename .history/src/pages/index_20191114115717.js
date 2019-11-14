import React, { Component, Fragment } from 'react'
import './index.css';
import Menu from './containerMenu'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Countries from '../components/search/searchCountries'
import RestaurantsDetail from '../components/restaurants/restaurantsDetail'
export default class Home extends Component {
  state = {
    restaurantData:[]
  }

  handleRestaurantsCard = (restaurant) => {
    this.setState({ restaurantData: restaurant })
    // console.log("_____________handleRestaurantsCard __________", restaurant)
  }

  render() {

    return (
      <Fragment>      
        <Router>
          <Route path="/" component={Menu} />         
          <Route exact path="/countries/:query" render={(props) => <Countries {...props} isData={this.handleRestaurantsCard} />} />
          <Route exact path="/search/:query" render={(props) => <Countries {...props} isData={this.handleRestaurantsCard} />} />
          {/* <Route exact path="/detail/:query" component={RestaurantsDetail}  /> */}
          <Route exact path="/detail/:query" render={(props) => <RestaurantsDetail {...props} data={this.state.restaurantData} />} />
        </Router>
      </Fragment>
    )
  }
}