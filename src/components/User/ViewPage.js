import React, { Component } from "react";
import { setStateAsync } from "../../helper";
import { Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import TripadvisorDataService from "../../services/tripadvisor";
// import MenuAction from "./MenuAction";
// import Slidebar from "./Slidebar";
import "./User.css";
import Footer from "../Layout/Footer";
import PlaceIcon from "../../assets/place_icon.png";
import BookingModal from "./BookingModal";
import MyAppService from "../../services/myApp.service";

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
        const data = await (await MyAppService.getDataByName(name)).data.myapp[0];
        console.log(data);
        this.setState({ data });
    }

    convertComment = (str) => {
        if (str === null) return '';
        // console.log(str.endsWith("booking.com"));
        // console.log(str.endsWith("tripadvisor.com.vn"));
        str = str.split('“').join('');
        str = str.split('booking.com').join('');
        str = str.split('tripadvisor.com.vn').join('');
        return str.split('”').join('');
    };

    onBook = () => {
        this.setState({ openModal: true });
    }

    convertPlace = (str) => {
        if (str === null) return '';
        str = str.split(' 100000').join(',');
        return str.split(' 10000').join(',');
    }

    isString = (str) => {
        if (!str) return false;
        console.log(str,str.indexOf("a") )
        str = str.split('booking.com').join('');
        str = str.split('tripadvisor.com.vn').join('');
        if (str.indexOf("a") > 0 ) return true;
        else return false;
    }

    webName = (str) => {
        if (str.indexOf("booking.com") > 0 ) return 'Booking.com';
        return 'Tripadvisor.com.vn'
    }

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
                {data.place &&
                    <div className="place" style = {{ paddingBottom: '20px'}}>
                        <img className="icon_place" src={PlaceIcon} />
                        <span>{data.place && this.convertPlace(data.place)}</span>
                    </div>
                }
                {data.img && 
                    <img className="img" src={data.img} />
                }
                <div className="review" style={{paddingTop: '20px'}}>
                    <span style={{ padding: '30px' }}>{data.review}</span>
                </div>
            </div>
            {data.convenient &&
                <div className="hotel_convenient">
                    <h2 className="name" style={{ paddingTop: '50px', paddingBottom: '50px', fontFamily: '"Old Standard TT", sans-serif'}}>Tiện nghi khách sạn</h2>
                    <div className="convenient_container">
                        {data.convenient && data.convenient.map((convenient, i) =>
                            <div className="col-lg-3 room_type_form">
                                <div className="roomtype" key={i}>{convenient}</div>
                            </div>                    
                            )}
                    </div>
                </div>
            }
            {data.roomtype &&
                <div className="hotel_roomtype">
                    <h2 className="name" style={{ paddingTop: '50px', paddingBottom: '50px', fontFamily: '"Old Standard TT", sans-serif'}}>Loại phòng phổ biến</h2>
                    <div className="convenient_container">
                        {data.roomtype.map((roomtype, i) =>
                            <div className="col-lg-3 room_type_form">
                                <div className="roomtype" key={i}>{roomtype}</div>
                            </div>
                        )}
                    </div>
                </div>
            }
            {data.comment &&
                <div className="hotel_comment">
                    <h2 className="name" style={{ paddingTop: '50px', paddingBottom: '50px', fontFamily: '"Old Standard TT", sans-serif'}}>Khách hàng nhận xét</h2>
                    <div className="comment_container">
                        {data.comment.map((comment, i) =>
                            this.isString(comment) ? (
                                <div className="col-lg-3 comment_form">
                                    <div className="webName">{this.webName(comment)}</div>
                                    <div key={i} className="comment" id="style-scroll">{this.convertComment(comment)}</div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            }
            <Button className="choose_hotel" onClick={this.onBook}>
                Đặt phòng
            </Button>
            <Footer />
        </>
        );
    }
}

export default ViewPage;
