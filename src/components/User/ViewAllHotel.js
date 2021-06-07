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
import { Nav } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../firebase";
import ListBill from './ListBill';
import MyAppService from "../../services/myApp.service";

class ViewAllHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showBill: false
        };
        this.setStateAsync = setStateAsync.bind(this);
    }

    componentDidMount() {
        this.fetchInitData();
    }

    fetchInitData = async () => {
        const data = await (await MyAppService.getAll()).data.myapp;
        console.log(data);
        this.setState({ data });
    }

    convertPlace = (str) => {
        if (str === null) return '';
        str = str.split(' 100000').join(',');
        return str.split(' 10000').join(',');
    };

    handleInputChange = async (e) => {
        e.preventDefault();
        this.props.history.push(`/user/${this.search.value}`);
        let data;
        if (this.search.value === "") {
            data = await (await MyAppService.getAll()).data.myapp;
        } else {
            data = await (await MyAppService.getDataLikeName(this.search.value)).data.myapp;
        }
        this.setState({ data });
    }

    handleShowBill = () => {
        this.setState({
            showBill: true,
        })
    }

    render() {
        const { data, showBill } = this.state;
        const users = firebase.auth().currentUser;
        return (<>
            <div style={{ backgroundColor: 'aqua' }}>
                <ListBill
                    showBill={showBill}
                    handleClose={() => this.setState({ showBill: false })}
                />
                <Nav>
                    <Nav.Item>
                        <Nav.Link style={{ color: "red" }}>Bạn muốn đi đâu:
                            <Form as="select" style={{ "margin-left": "5px", border: "none", "background-color": "white", color: "red" }}>
                                <option>Hà Nội</option>
                                <option>Đà Nẵng</option>
                                <option>Đà Lạt</option>
                                <option>Hồ Chí Minh</option>
                            </Form>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{ color: "red" }}>
                            <input type="text" style={{ "margin-left": "5px", border: "none", "width": "300%", "background-color": "white", color: "red" }} placeholder="Search by name..." ref={input => this.search = input} onChange={this.handleInputChange} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginLeft: '500px' }}>
                        <Nav.Link onClick={this.handleShowBill} style={{ color: "red" }}>
                            Lịch sử
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginLeft: '30px' }}>
                        {users ? (
                            <Nav.Link onClick={() => {
                                auth.signOut();
                            }} style={{ color: "red" }}>
                                Đăng xuất
                            </Nav.Link>
                        ) : (
                                <Nav.Link onClick={signInWithGoogle} style={{ color: "red" }}>
                                    Đăng nhập
                                </Nav.Link>
                            )}
                    </Nav.Item>
                </Nav>
            </div>
            {data.map((data) =>
                <div className="hotel_container">
                    <div className="title">
                        <Link to={`/detail/${data.name}`}><div className="hotel_name">{data.name}</div></Link>
                        <div className="hotel_place">
                            <img className="icon" src={PlaceIcon} />
                            <span>{this.convertPlace(data.place)}</span>
                        </div>
                        <div className="other_data">{data.comment ? data.comment.length : '0' } lượt đánh giá</div>
                        {/* <div className="other_data">Giá tham khảo: Updating...</div> */}
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
