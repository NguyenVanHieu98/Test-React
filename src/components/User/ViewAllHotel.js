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
import { Link } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../firebase";
import ListBill from './ListBill';
import History from './History';
import MyAppService from "../../services/myApp.service";

class ViewAllHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showBill: false,
            showHistory: false
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

    handleShowHistory = () => {
        this.setState({
            showHistory: true,
        })
    }

    render() {
        const { data, showBill, showHistory } = this.state;
        const users = firebase.auth().currentUser;
        console.log(users)
        return (<>
            <div className="slide-bar">
                {showBill && 
                    <ListBill
                        showBill={showBill}
                        handleClose={() => this.setState({ showBill: false })}
                        user={users}
                    />
                }
                {showHistory &&
                    <History
                        showHistory={showHistory}
                        handleClose={() => this.setState({ showHistory: false })}
                        user={users}
                    />
                }
                <Nav>
                    <Nav.Item>
                        <Nav.Link >Bạn muốn đi đâu:
                            <Form as="select" style={{ "margin-left": "5px", border: "none", "background-color": "white"}}>
                                <option>Hà Nội</option>
                                <option>Đà Nẵng</option>
                                <option>Đà Lạt</option>
                                <option>Hồ Chí Minh</option>
                            </Form>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link >
                            <input type="text" style={{ "margin-left": "5px", border: "none", "width": "300%", "background-color": "white"}} placeholder="Search by name..." ref={input => this.search = input} onChange={this.handleInputChange} />
                        </Nav.Link>
                    </Nav.Item>       
                    {users ? (       
                        <Nav.Item style={{ marginLeft: '420px' }}>
                            <Nav.Link onClick={this.handleShowBill}>
                                Yêu cầu
                            </Nav.Link>
                        </Nav.Item>
                        ): null
                    }
                    {users ? (       
                        <Nav.Item style={{ marginLeft: '20px' }}>
                            <Nav.Link onClick={this.handleShowHistory}>
                                Lịch sử
                            </Nav.Link>
                        </Nav.Item>
                        ): null
                    }
                    <Nav.Item style={{ marginLeft: '20px' }}>
                        {users ? (
                            <Nav.Link onClick={() => {
                                auth.signOut();
                            }}>
                                Đăng xuất
                            </Nav.Link>
                        ) : (
                                <Nav.Link onClick={signInWithGoogle} style={{ marginLeft: '400px' }}>
                                    Đăng nhập
                                </Nav.Link>
                            )}
                    </Nav.Item>
                </Nav>
            </div>
            <div style={{marginBottom: '50px'}}>
                {data.map((data) =>
                    <div className="hotel_container">
                        <div style={{ marginLeft: '150px' }}>
                            <img className="hotel_img" src={data.img} />
                        </div>
                        <div className="title">
                            <Link to={`/detail/${data.name}`}><div className="hotel_name">{data.name}</div></Link>
                            <div className="hotel_place">
                                <img className="icon" src={PlaceIcon} />
                                <span>{this.convertPlace(data.place)}</span>
                            </div>
                            <div className="other_data">{data.comment ? data.comment.length : '0' } lượt đánh giá</div>
                            {/* <div className="other_data">Giá tham khảo: Updating...</div> */}
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
        );
    }
}

export default ViewAllHotel;
