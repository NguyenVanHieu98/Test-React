import React, { Component } from "react";
import { setStateAsync } from "../../helper";
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import TripadvisorDataService from "../../services/tripadvisorhanoi";
// import MenuAction from "./MenuAction";
// import Slidebar from "./Slidebar";
import "./User.css";
import Footer from "../Layout/Footer";
import PlaceIcon from "../../assets/place_icon.png";
import BookingModal from "./BookingModal";
import { Link } from 'react-router-dom';

class ViewAllHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        this.setStateAsync = setStateAsync.bind(this);
    }

    componentDidMount() {
        this.fetchInitData();
    }

    fetchInitData = async () => {
        const data = await (await TripadvisorDataService.getAll()).data.tripadvisorhanoi;
        console.log(data);
        this.setState({ data });
    }

    convertPlace = (str) => {
        str = str.split(' 100000').join(',');
        return str.split(' 10000').join(',');
    };

    render() {
        const { data } = this.state;
        return (<>
            {data.map((data) =>
                <div className="hotel_container">
                    <div className="title">
                        <Link to={`/detail/${data.name}`}><div className="hotel_name">{data.name}</div></Link>
                        <div className="hotel_place">
                            <img className="icon" src={PlaceIcon} />
                            <span>{this.convertPlace(data.place)}</span>
                        </div>
                        <div className="other_data">{data.comment.length + 10} lượt đánh giá</div>
                        <div className="other_data">Giá tham khảo: Updating...</div>
                    </div>
                    <div style={{ marginLeft: '150px' }}>
                        <img className="hotel_img" src={data.img} />
                    </div>
                </div>
            )}
            <Footer />
        </>
        );
    }
}

export default ViewAllHotel;
