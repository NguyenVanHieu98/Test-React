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

class ViewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            openModal: false,
        };
        this.setStateAsync = setStateAsync.bind(this);
    }

    componentDidMount() {
        this.fetchInitData();
    }

    fetchInitData = async () => {
        let name = window.location.href.split('http://localhost:3000/detail/').join('');
        name = name.replaceAll("%20", " ");
        console.log(name);
        const data = await (await TripadvisorDataService.getDataByName(name)).data.tripadvisorhanoi[0];
        console.log(data);
        this.setState({ data });
    }

    convertComment = (str) => {
        str = str.split('“').join('');
        return str.split('”').join('');
    };

    onBook = () => {
        this.setState({ openModal: true });
    }

    convertPlace = (str) => {
        str = str.split(' 100000').join(',');
        return str.split(' 10000').join(',');
    };

    render() {
        const { data, openModal } = this.state;
        return (<>
            <BookingModal
                handleClose={() => this.setState({ openModal: false })}
                showModal={openModal}
                data={data}
            />
            <div className="hotel_title">
                <h2 className="name">{data.name}</h2>
                <div className="place">
                    <img className="icon_place" src={PlaceIcon} />
                    <span>{data.place && this.convertPlace(data.place)}</span>
                </div>
                <img className="img" src={data.img} />
                <div className="review">
                    <span style={{ padding: '30px' }}>{data.review}</span>
                </div>
            </div>
            <div className="hotel_convenient">
                <h5 style={{ paddingTop: '20px' }}>Các loại tiện nghi:</h5>
                <div className="convenient_container">
                    {data.convenient && data.convenient.map((convenient, i) =>
                        <div className="convenient" key={i}>* {convenient}</div>
                    )}
                </div>
            </div>
            <div className="hotel_roomtype">
                <h5 style={{ paddingTop: '20px' }}>Các loại phòng nổi bật:</h5>
                <div className="convenient_container">
                    {data.roomtype && data.roomtype.map((roomtype, i) =>
                        <div className="roomtype" key={i}>* {roomtype}</div>
                    )}
                </div>
            </div>
            <div className="hotel_comment">
                <h5 style={{ paddingTop: '20px' }}>Top comment:</h5>
                <div className="comment_container">
                    {data.comment && data.comment.map((comment, i) =>
                        <div className="comment" key={i}>+ {this.convertComment(comment)}</div>
                    )}
                </div>
            </div>
            <Button className="choose_hotel" onClick={this.onBook}>
                Đặt phòng
            </Button>
            <Footer />
        </>
        );
    }
}

export default ViewPage;
