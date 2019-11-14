import React, { Component, Fragment } from 'react'
import '../restaurants/detail.css'
import thumb_default from '../image/images.png';
export default class Fave extends Component {
    state = {
        favesItem: []
    }

    render() {
        let { faveList } = this.props
        console.log("faveList ---> ", faveList)
        let img_thumb_url = faveList && faveList.photos ? faveList.photos[0].photo.thumb_url : thumb_default
        return (
            <Fragment>
                <div className="how2 card-fave">
                    <div className="row">
                        <div className="col-4">
                            <img src={img_thumb_url} className="card-img-top" />
                        </div>
                        {/* <div className="col-8"> */}
                        {/* <div className="card-body"> */}
                        <p className="card-text">
                            {faveList.name.length > 15 ?
                                faveList.name.slice(0, 10) + '...'
                                : faveList.name}</p>
                        {/* </div> */}
                        {/* </div> */}
                    </div>



                </div>


            </Fragment >
        )
    }
}