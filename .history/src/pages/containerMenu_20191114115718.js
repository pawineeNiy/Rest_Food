import React, { Component, Fragment } from 'react'
import './index.css';
import config from '../config'
// import Countries from '../components/search/searchCountries'
const axios = require('axios');

export default class Menu extends Component {
    state = {
        categories: [],
        location: "",
        searchText: ''
    }

    handleSearchCountries = (e, countries) => {
        e.preventDefault();
        // console.log("this.props.history ", this.props.history)
        this.props.history.push(`/countries/${countries}`);

    }

    getAddressData = () => {
        axios.get("http://ip-api.com/json")
            .then((response) => {
                // console.log("response.data ", response.data)
                this.setState({ location: response.data })
            })
            .catch((error) => {
                console.log("getMenu Err", error);
            })
    }

    // getCategories = () => {
    //     let { somato_api } = config
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'user-key': somato_api.api_key
    //     }
    //     axios.get(somato_api.database + '/categories', {           
    //         headers: headers
    //     })
    //         .then((response) => {
    //             console.log("response.data ", response.data)
    //             this.setState({ categories: response.data })
    //         })
    //         .catch((error) => {
    //             console.log("getMenu Err", error);
    //         })
    // }

    OnClickSearch = (e) => {
        e.preventDefault();
        // console.log("this.props.history ", this.props.history)
        if (this.state.searchText && this.state.searchText.length > 0) {
            this.props.history.push(`/search/${this.state.searchText}`);
        }

    }

    // OnClickHome = (e) => {
    //     e.preventDefault();
    //     console.log("this.props.history ", this.props.history)
    //     if (this.state.searchText && this.state.searchText.length > 0) {
    //         this.props.history.push(`/search/${this.state.searchText}`);
    //     }

    // }

    handleChange = (event) => {
        this.setState({ searchText: event.target.value });
        // console.log("searchText ", this.state.searchText)
    }

    componentDidMount = () => {
        this.getAddressData()      
    }

    render() {
        let { categories, location } = this.state
        let { menuCategories, countries } = config
        let personLocation = location ?
            <div className="div-location">
                <i className="fas fa-map-marker-alt fa-location" />&nbsp;
                <span>  {location.city}, {location.country} </span>
            </div>
            : ""


        return (
            <Fragment>
                <div className="container-menu-desktop">
                    <div className="topbar">
                        <div className="content-topbar container h-100">
                            <div className="left-topbar">
                                <span className="left-topbar-item flex-wr-s-c">
                                    {personLocation}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-main-nav">
                        <div className="main-nav">
                            <nav className="menu-desktop">

                                <ul className="main-menu">
                                    {/* {menuCategories ? menuCategories.map((item, i) =>
                                        <li className="mega-menu-item" key={i}>
                                            <a>{item}</a>
                                        </li>)
                                        :
                                        <li className="mega-menu-item"></li>
                                    } */}
                                    <li className="main-menu-active">
                                        <a>City
                                        <i className="fas fa-angle-down"></i>
                                        </a>
                                        <ul className="sub-menu">
                                            {countries ? countries.map((item, i) =>
                                                <li key={i}><a onClick={(e) => this.handleSearchCountries(e, item)}>{item}</a></li>)
                                                :
                                                <li></li>
                                            }
                                        </ul>
                                    </li>
                                    <i className="navbar-right b-m1">
                                        {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
                                        <input value={this.state.value} onChange={this.handleChange} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                                    </i>
                                    &nbsp;
                                    <i>
                                        <button className="btn btn-primary b-m2" onClick={(e) => this.OnClickSearch(e)} type="submit">Search</button>
                                    </i>
                                </ul>

                            </nav>
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}