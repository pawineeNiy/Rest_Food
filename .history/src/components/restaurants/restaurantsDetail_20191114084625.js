import React, { Component, Fragment } from 'react'
import config from '../../config'
import './detail.css'
import thumb_default from '../image/images.png';
import Carousel from 'react-bootstrap/Carousel'
const axios = require('axios');
const queryString = require('query-string');


export default class RestaurantsDetail extends Component {
    state = {
        restaurantsItems: []
    }

    getDetailByResID = res_id => {
        let { somato_api } = config
        const headers = {
            'Content-Type': 'application/json',
            'user-key': somato_api.api_key
        }
        axios.get(somato_api.database + '/restaurant?res_id=' + res_id, {
            headers: headers
        })
            .then((response) => {
                this.setState({ restaurantsItems: response.data })
            })
            .catch((error) => {
                console.log("getMenu Err", error);
            })
    }

    componentDidMount = () => {
        let { data,
            location
        } = this.props
        const values = queryString.parse(location.pathname)
        let res_id = values.rest
        if (data && data.id) {
            this.setState({ restaurantsItems: data })
        } else {
            this.getDetailByResID(res_id)
        }
    }

    render() {
        const { restaurantsItems } = this.state
        console.log("=================  restaurantsItems ", restaurantsItems)
        let restName = restaurantsItems ? restaurantsItems.name : ''
        let resLocation = restaurantsItems && restaurantsItems.location ?
            <div >
                <i className="fas fa-map-marker-alt" /> &nbsp;
            <span>{restaurantsItems.location.address},
                {restaurantsItems.location.locality},
                {restaurantsItems.location.city}</span>
            </div> : ''

        let timings = restaurantsItems ?
            <div >
                <i className="far fa-clock ico-clock" /> &nbsp;
            <span>{restaurantsItems.timings}</span>
            </div> : ''

        let phone_numbers = restaurantsItems ?
            <div >
                <i className="fa fa-phone ico-clock" aria-hidden="true" /> &nbsp;
            <span>{restaurantsItems.phone_numbers}</span>
            </div> : ''
        let highlights = restaurantsItems ? restaurantsItems.highlights : []
        // let img_thumb_url = restaurantsItems && restaurantsItems.photos ? restaurantsItems.photos[0].photo.thumb_url : thumb_default





        return (
            <Fragment>
                <div className="blog-container">
                    <div className="row">
                        <div className="col-3">
                            <div className="blog-header">

                                <Carousel>
                                    {restaurantsItems && restaurantsItems.photos ? restaurantsItems.photos.map((item, i) =>
                                        <Carousel.Item>
                                            <img className="blog-cover" src={item.photo.thumb_url} />
                                        </Carousel.Item>
                                    ) : <img className="blog-cover" src={thumb_default} />}
                                </Carousel>
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="col-9">

                            <div className="blog-body">
                                <div className="blog-title">
                                    <h1>{restName}</h1>
                                </div>
                                <div className="blog-summary">
                                    {resLocation}
                                    {timings}
                                    {phone_numbers}
                                </div>
                                <div className="blog-tags top-margin">
                                    <ul className="ico-clock">
                                        {highlights ? highlights.map((item, i) => <li className="published-date top-margin-5" key={i}>{item}</li>) : ''}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="blog-footer">
                            {restaurantsItems && restaurantsItems.all_reviews ?
                                restaurantsItems.all_reviews.reviews.map((item, i) =>
                                    <div class="card top-margin">
                                        <div class="card-body">
                                            <h5 class="card-title">{item.review.rating_text}</h5>
                                            <p class="card-text">{item.review.review_text}</p>
                                            <div className="card__clock-info left-layout">
                                                <i className="fas fa-star icon-star" />
                                                <span className="card__time">{item.review.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : ''}

                            <br />
                        </div>
                    </div>


                </div >
            </Fragment >
        )
    }
}



